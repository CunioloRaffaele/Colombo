import 'dart:async';
import 'package:colombo/data/services/municipality_service.dart';
import 'package:flutter/foundation.dart';
import '../../core/connector/driver_elm327.dart';
//import '../../core/api/api_client.dart';
import '../global_drive_state.dart';
import '../models/drive_data_point_dto.dart';
import 'location_service.dart';
import 'ecoscore_service.dart';

class DriveSessionService {
  static final DriveSessionService _instance =
      DriveSessionService._internal(); // singleton
  factory DriveSessionService() => _instance;
  DriveSessionService._internal();

  final Elm327Driver _driver = Elm327Driver();
  //final ApiClient _api = ApiClient();

  // Stream for drive state updates to the ui
  final _controller = StreamController<DriveState>.broadcast();
  Stream<DriveState> get stream => _controller.stream;

  DriveState _currentState = DriveState();
  DriveState get currentState => _currentState;
  bool _isRunning = false;

  // Data buffer for batch sending to the server
  final List<DriveDataPoint> _dataBuffer = [];
  static const int _batchSize = 400; // Send data to server every 400 points

  Future<List<Map<String, String>>> scanBluetoothDevices() async {
    debugPrint("DEBUG: scanBluetoothDevices chiamato");

    bool bluetoothStatus = await _driver.isBluetoothEnabled();

    if (!bluetoothStatus) {
      throw Exception("Bluetooth non è abilitato.");
    }

    try {
      final devices = await _driver.getPairedDevices();
      return devices;
    } catch (e) {
      debugPrint("DEBUG: Errore durante la scansione Bluetooth: $e");
      rethrow;
    }
  }

  Future<void> startMonitoring(String macAddress) async {
    debugPrint("DEBUG: startMonitoring chiamato con $macAddress");
    if (_isRunning) {
      debugPrint("DEBUG: Il servizio è già in esecuzione. Ignoro la chiamata.");
      return;
    }

    debugPrint("DEBUG: Avvio servizio...");
    _isRunning = true;

    bool connected = await _driver.connect(macAddress);
    if (!connected) {
      throw Exception("Impossibile connettersi al dispositivo OBD-II.");
    }

    _isRunning = true;
    _currentState = _currentState.copyWith(isPipeConnected: true);

    // Check for supported PIDs
    final supportedPids = await _driver.availableSensors();
    _currentState = _currentState.copyWith(supportedPids: supportedPids);

    _controller.add(_currentState);

    _sensorLoop();
  }

  void stopMonitoring() async {
    _isRunning = false;
    //_driver.disconnect();

    // Send any remaining data before stopping
    if (_dataBuffer.isNotEmpty) {
      await _flushBuffer();
      _currentState = _currentState.copyWith(
        lastUpdated: DateTime.now(),
        positionInBuffer: _dataBuffer.length,
      );
    }

    _currentState = _currentState.copyWith(isPipeConnected: false);
    _controller.add(_currentState);
  }

  Future<void> _sensorLoop() async {
    debugPrint("DEBUG: Avvio loop sensori...");
    while (_isRunning) {
      // debugPrint("DEBUG: Ciclo sensori...");
      final stopwatch = Stopwatch()..start();

      try {
        // 1. Read sensors OBD-II if available
        final sensorActions = <String, Future<void> Function()>{
          'rpm': () async =>
              _currentState = _currentState.copyWith(rpm: await _driver.rpm()),
          'speed': () async => _currentState = _currentState.copyWith(
            speed: await _driver.speed(),
          ),
          'throttlePosition': () async => _currentState = _currentState
              .copyWith(throttlePosition: await _driver.throttlePosition()),
          'coolantTemp': () async => _currentState = _currentState.copyWith(
            coolantTemp: await _driver.coolantTemp(),
          ),
          'fuelRate': () async => _currentState = _currentState.copyWith(
            fuelRate: await _driver.fuelRate(),
          ),
          'odometer': () async => _currentState = _currentState.copyWith(
            odometer: await _driver.odometer(),
          ),
          'engineExhaustFlow': () async => _currentState = _currentState
              .copyWith(engineExhaustFlow: await _driver.engineExhaustFlow()),
          'fuelTankLevel': () async => _currentState = _currentState.copyWith(
            fuelTankLevel: await _driver.fuelTankLevel(),
          ),
        };

        for (final entry in sensorActions.entries) {
          final sensorName = entry.key;
          final action = entry.value;
          if (_currentState.supportedPids[sensorName] == true) {
            try {
              await action();
            } catch (e) {
              debugPrint("Errore lettura $sensorName: $e");
            }
          }
        }

        // 2. Get location
        final pos = await determinePosition();
        var serverStateOfPosition = await MunicipalityService.isPointInZone(
          pos.latitude,
          pos.longitude,
        );
        _currentState = _currentState.copyWith(
          position: pos,
          isInZone: serverStateOfPosition.contains,
          zoneName: serverStateOfPosition.contains
              ? serverStateOfPosition.comune
              : null,
        );

        // 3. Get local ecoscore
        VitalStats.adjustWeights(_currentState.supportedPids);
        double totalScore = 0.0;
        List<double> componentScores = [];

        EcoscoreService.variables.forEach((key, variable) {
          double? value;
          switch (key) {
            case 'rpm':
              value = _currentState.rpm.toDouble();
              break;
            case 'speed':
              value = _currentState.speed.toDouble();
              break;
            case 'throttlePosition':
              value = _currentState.throttlePosition.toDouble();
              break;
            case 'coolantTemp':
              value = _currentState.coolantTemp.toDouble();
              break;
            case 'fuelRate':
              value = _currentState.fuelRate.toDouble();
              break;
            case 'engineExhaustFlow':
              value = _currentState.engineExhaustFlow.toDouble();
              break;
            case 'odometer':
              value = _currentState.odometer.toDouble();
              break;
            case 'fuelTankLevel':
              value = _currentState.fuelTankLevel.toDouble();
              break;
            case 'acceleration':
              value = _currentState.acceleration;
              break;
          }

          var pValue = 0.0;
          if (value != null) {
            switch (key) {
              case 'rpm':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'speed':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'throttlePosition':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'coolantTemp':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'fuelRate':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'engineExhaustFlow':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'odometer':
                pValue = VitalStats.twoTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
              case 'fuelTankLevel':
                pValue = VitalStats.rightTailedZTestPValue(
                  value,
                  variable.mu,
                  variable.sigma,
                );
                break;
            }

            final weightedScore = VitalStats.getWeightedScore(
              pValue,
              variable.weight,
            );
            componentScores.add(weightedScore);
          }
        });

        //Final score
        totalScore = VitalStats.getInstantScore(componentScores);
        _currentState = _currentState.copyWith(ecoscore: totalScore);

        // 4. Update ui
        _controller.add(_currentState);

        // 5. Add to buffer
        _currentState = _currentState.copyWith(
          positionInBuffer: _dataBuffer.length,
        );
        final dataPoint = DriveDataPoint.fromState(_currentState);
        _dataBuffer.add(dataPoint);

        debugPrint(_currentState.toString());

        // 6. Send to server (Batch)
        if (_dataBuffer.length >= _batchSize) {
          _currentState = _currentState.copyWith(lastUpdated: DateTime.now());
          // Don't await here to keep the loop responsive (fire and forget)
          _flushBuffer();
        }
      } catch (e) {
        debugPrint("Errore loop: $e");
      }

      stopwatch.stop();
      final waitTime = const Duration(milliseconds: 1500) - stopwatch.elapsed;
      if (waitTime > Duration.zero) await Future.delayed(waitTime);
    }
  }

  // Funzione per inviare i dati al server
  Future<void> _flushBuffer() async {
    // Copia locale del buffer da inviare
    final List<DriveDataPoint> batchToSend = List.from(_dataBuffer);
    // Svuota subito il buffer principale per accogliere nuovi dati
    _dataBuffer.clear();

    if (batchToSend.isEmpty) return;

    try {
      debugPrint("Invio ${batchToSend.length} punti al server...");

      debugPrint("Upload completato!");
    } catch (e) {
      debugPrint("Errore upload dati: $e");
    }
  }
}
