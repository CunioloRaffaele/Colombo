import 'package:colombo/data/services/auth_service.dart';
import 'package:colombo/data/services/municipality_service.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import '../../../../data/models/zone_dto.dart';

class MapViewModel extends ChangeNotifier {
  final MapController mapController = MapController();
  final TextEditingController searchController = TextEditingController();

  final AuthService _authService = AuthService();

  List<Polygon> _polygons = [];
  List<Polygon> get polygons => _polygons;

  List<Marker> _markers = [];
  List<Marker> get markers => _markers;

  // Store zone data for hit testing
  List<({ZoneDto zone, List<LatLng> points})> _zonesData = [];

  ZoneDto? _selectedZone;
  ZoneDto? get selectedZone => _selectedZone;

  bool _isMunicipalityRegistered = false;
  bool get isMunicipalityRegistered => _isMunicipalityRegistered;

  bool _isCheckingRegistration = true;
  bool get isCheckingRegistration => _isCheckingRegistration;

  // Create a function that runs when the page is loaded
  Future<void> onPageLoaded(BuildContext context, TickerProvider vsync) async {
    _isCheckingRegistration = true;
    notifyListeners();
    var userDto;
    try {
      // Verifica se utente è in comune registrato
      userDto = await _authService.getUserInfo();
      _isMunicipalityRegistered =
          await MunicipalityService.isMunicipalityRegistered(
            userDto.residenza.toString(),
          );
    } catch (e) {
      _isMunicipalityRegistered = false;
    } finally {
      _isCheckingRegistration = false;
      notifyListeners();
    }
    if (_isMunicipalityRegistered) {
      var municipalityName = await MunicipalityService.getMunicipalityName(
        userDto.residenza.toString(),
      );
      await _drawZonesForMunicipality(context, vsync, municipalityName);
    }
  }

  Future<void> searchMunicipality(
    BuildContext context,
    TickerProvider vsync,
  ) async {
    final query = searchController.text.trim();
    if (query.isEmpty) return;
    await _drawZonesForMunicipality(context, vsync, query);
  }

  Future<void> _drawZonesForMunicipality(
    BuildContext context,
    TickerProvider vsync,
    String query,
  ) async {
    try {
      // Ottieni ISTAT da nome
      final istat = await MunicipalityService.searchComuni(query);
      if (istat == 0) {
        _showError(context, 'Nessun comune trovato con questo nome');
        return;
      }
      // Ottieni zone e disegna poligoni
      final zones = await MunicipalityService.getZones(istat);
      if (zones.isEmpty) {
        _showError(context, 'Nessuna zona trovata per questo comune');
        _polygons = [];
        _markers = [];
        _zonesData = [];
        _selectedZone = null;
        notifyListeners();
        return;
      }

      _polygons = [];
      _markers = [];
      _zonesData = [];
      _selectedZone = null;

      for (var z in zones) {
        final coordinates = z.geometry['coordinates'] as List;
        // GeoJSON Polygon coordinates are usually [[[lng, lat], ...]]
        // We assume simple polygon for now
        final points = (coordinates[0] as List).map((coord) {
          return LatLng(
            (coord[1] as num).toDouble(),
            (coord[0] as num).toDouble(),
          );
        }).toList();

        _zonesData.add((zone: z, points: points));

        Color color;
        IconData icon;

        switch (z.tipologia.toLowerCase()) {
          case 'centro storico':
            color = Colors.amber.withOpacity(0.3);
            icon = Icons.school;
            break;
          case 'commerciale':
            color = Colors.blue.withOpacity(0.3);
            icon = Icons.store;
            break;
          case 'industriale':
            color = Colors.grey.withOpacity(0.3);
            icon = Icons.factory;
            break;
          case 'residenziale':
            color = Colors.green.withOpacity(0.3);
            icon = Icons.home;
            break;
          case 'generica':
          default:
            color = Colors.teal.withOpacity(0.3);
            icon = Icons.map;
            break;
        }

        _polygons.add(
          Polygon(
            points: points,
            color: color,
            borderColor: color.withOpacity(1),
            borderStrokeWidth: 2,
          ),
        );

        if (points.isNotEmpty) {
          final center = _calculatePolygonCenter(points);
          _markers.add(
            Marker(
              point: center,
              width: 30,
              height: 30,
              child: Icon(
                icon,
                color: const Color.fromARGB(255, 0, 0, 0),
                size: 20,
              ),
            ),
          );
        }
      }

      // Calcola centro e zoom
      if (_polygons.isNotEmpty && _polygons.first.points.isNotEmpty) {
        final center = _calculatePolygonCenter(_polygons.first.points);
        _animatedMapMove(center, 13.0, vsync);
      }

      notifyListeners();
    } catch (e) {
      _showError(context, e.toString());
    } finally {}
  }

  void onMapTap(TapPosition tapPosition, LatLng point) {
    ZoneDto? foundZone;

    for (var data in _zonesData) {
      if (_isPointInPolygon(point, data.points)) {
        foundZone = data.zone;
        break;
      }
    }

    if (_selectedZone != foundZone) {
      _selectedZone = foundZone;
      notifyListeners();
    }
  }

  bool _isPointInPolygon(LatLng point, List<LatLng> polygon) {
    bool isInside = false;
    int i, j = polygon.length - 1;
    for (i = 0; i < polygon.length; i++) {
      if (((polygon[i].latitude > point.latitude) !=
              (polygon[j].latitude > point.latitude)) &&
          (point.longitude <
              (polygon[j].longitude - polygon[i].longitude) *
                      (point.latitude - polygon[i].latitude) /
                      (polygon[j].latitude - polygon[i].latitude) +
                  polygon[i].longitude)) {
        isInside = !isInside;
      }
      j = i;
    }
    return isInside;
  }

  LatLng _calculatePolygonCenter(List<LatLng> points) {
    double latSum = 0;
    double lngSum = 0;
    for (var point in points) {
      latSum += point.latitude;
      lngSum += point.longitude;
    }
    return LatLng(latSum / points.length, lngSum / points.length);
  }

  void _animatedMapMove(
    LatLng destLocation,
    double destZoom,
    TickerProvider vsync,
  ) {
    final latTween = Tween<double>(
      begin: mapController.camera.center.latitude,
      end: destLocation.latitude,
    );
    final lngTween = Tween<double>(
      begin: mapController.camera.center.longitude,
      end: destLocation.longitude,
    );
    final zoomTween = Tween<double>(
      begin: mapController.camera.zoom,
      end: destZoom,
    );

    final controller = AnimationController(
      duration: const Duration(milliseconds: 2000),
      vsync: vsync,
    );
    final Animation<double> animation = CurvedAnimation(
      parent: controller,
      curve: Curves.fastOutSlowIn,
    );

    controller.addListener(() {
      mapController.move(
        LatLng(latTween.evaluate(animation), lngTween.evaluate(animation)),
        zoomTween.evaluate(animation),
      );
    });

    animation.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        controller.dispose();
      } else if (status == AnimationStatus.dismissed) {
        controller.dispose();
      }
    });

    controller.forward();
  }

  void _showError(BuildContext context, String message) {
    NotificationOverlay.show(message, Colors.redAccent);
  }
}
