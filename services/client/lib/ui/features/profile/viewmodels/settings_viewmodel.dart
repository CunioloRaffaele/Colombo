import 'package:colombo/core/constants/api_constants.dart';
import 'package:colombo/data/services/reports_service.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../data/services/auth_service.dart';
import '../../../../data/services/vehicle_service.dart';
import '../../../../data/services/municipality_service.dart';
import '../../auth/view/login.dart';
import '../view/user_info.dart';
import 'package:colombo/ui/features/profile/view/car_info.dart';

class CarUiModel {
  final String vin;
  final String model;
  final String manufacturer;
  final String year;
  final double co2Emissions;
  final double pmEmissions;
  final ImageProvider? image;
  final String heroTag;

  CarUiModel({
    required this.vin,
    required this.model,
    this.manufacturer = '',
    this.year = '',
    required this.co2Emissions,
    required this.pmEmissions,
    this.image,
    String? heroTag,
  }) : heroTag = heroTag ?? vin;
}

class SettingsViewModel extends ChangeNotifier {
  final VehicleService _vehicleService = VehicleService();
  final AuthService _authService = AuthService();
  final ReportsService _reportsService = ReportsService();

  // State variables
  String _userName = "Unknown";
  List<CarUiModel> _cars = [];
  int _selectedCarIndex = 0;

  // Getters
  String get userName => _userName;
  List<CarUiModel> get cars => _cars;
  int get selectedCarIndex => _selectedCarIndex;

  Future<void> loadData() async {
    try {
      // 1. Get User info
      final userDto = await _authService.getUserInfo();
      _userName = userDto.nome;

      // Empty current car list (otherwise duplicates on reload)
      _cars = [];

      // 2. Get User Cars
      final carList = await _vehicleService.getUserCars();

      if (carList.isEmpty) {
        _cars = [];
      } else {
        for (var car in carList) {
          if (car.vin == '00000000000000000') {
            // Card placeholder for no vin car
            _cars.add(
              CarUiModel(
                vin: '',
                model: '-',
                manufacturer: '-',
                year: '-',
                co2Emissions: 0.0,
                pmEmissions: 0.0,
                image: const AssetImage(
                  'lib/ui/assets/icon/car_placeholder.png',
                ),
              ),
            );
          } else {
            final carDetails = await _vehicleService.getCarDetails(car.vin);
            if (carDetails != null) {
              final rawManufacturer = carDetails.info.manufacturer ?? '';
              final assetPath = _getCarAssetPath(rawManufacturer);
              _cars.add(
                CarUiModel(
                  vin: car.vin,
                  model: '',
                  manufacturer: rawManufacturer,
                  year: carDetails.modelYear?.toString() ?? 'Anno sconosciuto',
                  co2Emissions: carDetails.co2Perkm,
                  pmEmissions: carDetails.pmPerkm,
                  image: AssetImage(assetPath),
                ),
              );
            }
          }
        }
      }
      // Update ui
      notifyListeners();
    } catch (e) {
      NotificationOverlay.show(
        "Errore caricamento settings $e",
        const Color.fromARGB(255, 200, 50, 50),
      );
      debugPrint("Errore caricamento settings: $e");
    }
  }

  String _getCarAssetPath(String manufacturer) {
    final cleanName = manufacturer.toLowerCase().trim();
    String fileName;
    if (cleanName.contains('volkswagen')) {
      fileName = 'VOLKSWAGEN';
    } else if (cleanName.contains('audi')) {
      fileName = 'AUDI';
    } else if (cleanName.contains('bmw')) {
      fileName = 'BMW';
    } else if (cleanName.contains('mercedes')) {
      fileName = 'MERCEDES';
    } else if (cleanName.contains('fiat')) {
      fileName = 'FIAT';
    } else if (cleanName.contains('seat')) {
      fileName = 'SEAT';
    } else if (cleanName.contains('ford')) {
      fileName = 'FORD';
    } else if (cleanName.contains('renault')) {
      fileName = 'RENAULT';
    } else if (cleanName.contains('peugeot')) {
      fileName = 'PEUGEOT';
    } else if (cleanName.contains('toyota')) {
      fileName = 'TOYOTA';
    } else if (cleanName.contains('mg')) {
      fileName = 'MG';
    } else if (cleanName.contains('Citroën')) {
      fileName = 'CITROEN';
    } else {
      fileName = 'car_placeholder';
    }
    return 'lib/ui/assets/icon/$fileName.png';
  }

  void selectCar(int index) {
    _selectedCarIndex = index;
    notifyListeners();
  }

  void openCarInfo(BuildContext context, int index) {
    if (index < 0 || index >= _cars.length) return;
    final car = _cars[index];
    Navigator.of(context).push(
      CupertinoPageRoute(
        builder: (_) => CarInfoPage(
          heroTag: car.heroTag,
          vin: car.vin,
          manufacturer: car.manufacturer,
          model: car.model,
          year: car.year,
          image: car.image,
          co2Emissions: car.co2Emissions,
          pmEmissions: car.pmEmissions,
        ),
      ),
    );
  }

  Future<void> logout(BuildContext context) async {
    await _authService.logout();
    if (context.mounted) {
      Navigator.pushAndRemoveUntil(
        context,
        CupertinoPageRoute(builder: (context) => const LoginPage()),
        (route) => false,
      );
    }
  }

  Future<void> deleteAccount(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Conferma cancellazione account'),
        content: const Text(
          'Sei sicuro di voler cancellare il tuo account? Questa operazione è irreversibile e comporterà la perdita di tutti i tuoi dati.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(context).pop(false),
            child: const Text('Annulla'),
          ),
          TextButton(
            onPressed: () => Navigator.of(context).pop(true),
            child: const Text('Cancella', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
    if (confirmed == true) {
      try {
        await _authService.deleteAccount();
        if (context.mounted) {
          Navigator.pushAndRemoveUntil(
            context,
            CupertinoPageRoute(builder: (context) => const LoginPage()),
            (route) => false,
          );
        }
      } catch (e) {
        NotificationOverlay.show(
          "Errore durante la cancellazione dell'account: $e",
          const Color.fromARGB(255, 200, 50, 50),
        );
        debugPrint("Errore durante la cancellazione dell'account: $e");
      }
    }
  }

  Future<void> userInfo(BuildContext context) async {
    var userDto;
    var vehicles;
    var sessionsDto;
    var municipalityName;
    bool isMunicipalityRegistered = false;
    try {
      userDto = await _authService.getUserInfo();
      vehicles = await _vehicleService.getUserCars();
      sessionsDto = await _reportsService.getUserSessionsCounter();
      municipalityName = await MunicipalityService.getMunicipalityName(
        userDto.residenza.toString(),
      );
      isMunicipalityRegistered =
          await MunicipalityService.isMunicipalityRegistered(
            userDto.residenza.toString(),
          );
    } catch (e) {
      NotificationOverlay.show(
        "Errore durante il recupero delle info utente: $e",
        const Color.fromARGB(255, 200, 50, 50),
      );
      debugPrint("Errore durante il recupero delle info utente: $e");
    }
    if (context.mounted) {
      Navigator.push(
        context,
        CupertinoPageRoute(
          builder: (_) => UserInfoPage(
            nome: userDto.nome,
            cognome: userDto.cognome,
            email: userDto.email,
            codiceIstat: userDto.residenza.toString(),
            comune: municipalityName ?? 'Comune non trovato',
            comuneRegistrato: isMunicipalityRegistered,
            veicoliRegistrati: vehicles.length,
            sessioniGuida: sessionsDto.numeroSessioni,
            serverInfo: ApiConstants.baseUrl
                .toString()
                .split('//')
                .last
                .split('/')
                .first,
          ),
        ),
      );
    }
  }
}
