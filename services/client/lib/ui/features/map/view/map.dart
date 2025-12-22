import 'package:colombo/ui/features/map/viewmodels/map_viewmodel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> with TickerProviderStateMixin {
  late MapViewModel _viewModel;

  @override
  void initState() {
    super.initState();
    _viewModel = MapViewModel();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _viewModel.onPageLoaded(context, this);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: ListenableBuilder(
        listenable: _viewModel,
        builder: (context, child) {
          if (_viewModel.isCheckingRegistration) {
            return const Center(child: CircularProgressIndicator());
          }

          if (!_viewModel.isMunicipalityRegistered) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(
                    Icons.location_off,
                    size: 64,
                    color: Colors.white54,
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Comune non registrato',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Padding(
                    padding: EdgeInsets.symmetric(horizontal: 32),
                    child: const Text(
                      textAlign: TextAlign.center,
                      'Il tuo comune di residenza non è registrato alla piattaforma Colombo. Non potrai quindi godere delle funzionalità legate alla tua area geografica.',
                      style: TextStyle(color: Colors.white54),
                    ),
                  ),
                ],
              ),
            );
          }

          return Stack(
            children: [
              FlutterMap(
                mapController: _viewModel.mapController,
                options: const MapOptions(
                  initialCenter: LatLng(41.8719, 12.5674), // Center of Italy
                  initialZoom: 5.0,
                ),
                children: [
                  TileLayer(
                    urlTemplate:
                        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    subdomains: const ['a', 'b', 'c'],
                    userAgentPackageName: 'com.colombo.app',
                  ),
                  PolygonLayer(polygons: _viewModel.polygons),
                  MarkerLayer(markers: _viewModel.markers),
                ],
              ),

              Positioned(
                bottom: 100,
                left: 20,
                right: 20,
                child: LiquidGlassLayer(
                  child: Row(
                    children: [
                      Expanded(
                        child: LiquidStretch(
                          stretch: 0.5,
                          interactionScale: 0.90,
                          child: LiquidGlass(
                            shape: LiquidRoundedSuperellipse(borderRadius: 20),
                            child: Container(
                              padding: const EdgeInsets.symmetric(
                                horizontal: 12,
                                vertical: 4,
                              ),
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.3),
                                borderRadius: BorderRadius.circular(20),
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.1),
                                ),
                              ),
                              child: TextField(
                                controller: _viewModel.searchController,
                                style: const TextStyle(
                                  color: Colors.white54,
                                  fontSize: 16,
                                ),
                                decoration: const InputDecoration(
                                  prefixIcon: Icon(
                                    Icons.location_city,
                                    color: Colors.white70,
                                  ),
                                  hintText: 'Cerca comune...',
                                  hintStyle: TextStyle(color: Colors.white54),
                                  border: InputBorder.none,
                                  isDense: true,
                                  contentPadding: EdgeInsets.symmetric(
                                    vertical: 12,
                                  ),
                                ),
                                onSubmitted: (_) => _viewModel
                                    .searchMunicipality(context, this),
                              ),
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      LiquidStretch(
                        stretch: 0.5,
                        interactionScale: 0.90,
                        child: LiquidGlass(
                          shape: LiquidRoundedSuperellipse(borderRadius: 20),
                          child: Container(
                            decoration: BoxDecoration(
                              color: Colors.black.withOpacity(0.3),
                              borderRadius: BorderRadius.circular(20),
                              border: Border.all(
                                color: Colors.white.withOpacity(0.1),
                              ),
                            ),
                            child: IconButton(
                              onPressed: () =>
                                  _viewModel.searchMunicipality(context, this),
                              icon: const Icon(
                                Icons.search,
                                color: Colors.white,
                              ),
                              padding: const EdgeInsets.all(16),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          );
        },
      ),
    );
  }
}
