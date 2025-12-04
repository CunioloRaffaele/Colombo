import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import '../../../../data/services/auth_service.dart';
import '../../../../data/services/vehicle_service.dart';
import '../../auth/view/login.dart';

class CarUiModel {
  final String model;
  final String manufacturer;
  final String year;
  final ImageProvider? image;

  CarUiModel({
    required this.model,
    this.manufacturer = '',
    this.year = '',
    this.image,
  });
}

class SettingsViewModel extends ChangeNotifier {
  final VehicleService _vehicleService = VehicleService();
  final AuthService _authService = AuthService();

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
          final carDetails = await _vehicleService.getCarDetails(car.vin);
          if (carDetails != null) {
            final rawManufacturer = carDetails.info.manufacturer ?? '';
            final assetPath = _getCarAssetPath(rawManufacturer);
            _cars.add(
              CarUiModel(
                model: "",
                manufacturer: rawManufacturer,
                year: carDetails.modelYear?.toString() ?? 'Anno Sconosciuto',
                image: AssetImage(assetPath),
              ),
            );
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
    } else {
      fileName = 'car_placeholder';
    }
    return 'lib/ui/assets/icon/$fileName.png';
  }

  void selectCar(int index) {
    _selectedCarIndex = index;
    notifyListeners();
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
    try {
      userDto = await _authService.getUserInfo();
      vehicles = await _vehicleService.getUserCars();
    } catch (e) {
      NotificationOverlay.show(
        "Errore durante il recupero delle info utente: $e",
        const Color.fromARGB(255, 200, 50, 50),
      );
      debugPrint("Errore durante il recupero delle info utente: $e");
    }
    if (context.mounted) {
      await showDialog<bool>(
        context: context,
        builder: (context) => AlertDialog(
          title: const Text('Informazioni account'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Nome: ${userDto.nome}'),
              Text('Cognome: ${userDto.cognome}'),
              Text('Email: ${userDto.email}'),
              Text('Residenza: ${userDto.residenza}'),
              Text('Veicoli registrati: ${vehicles.length}'),
              Text('Rilevazioni effettuate: '),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(false),
              child: const Text('Chiudi'),
            ),
          ],
        ),
      );
    }
  }
}
