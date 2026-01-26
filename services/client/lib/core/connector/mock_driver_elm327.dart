import 'dart:async';
import 'dart:math';
import 'driver_elm327.dart';

class MockElm327Driver implements Elm327Driver {
  bool _isConnected = false;
  final Random _random = Random();
  double _time = 0.0;
  double _odometer = 100000.0;

  @override
  Future<bool> isBluetoothEnabled() async {
    return true;
  }

  @override
  Future<List<Map<String, String>>> getPairedDevices() async {
    // Return a fake OBDII device
    return [
      {'name': 'OBDII Simulator', 'address': '00:00:00:00:00:00'},
    ];
  }

  @override
  Future<bool> connect(String address) async {
    await Future.delayed(
      const Duration(seconds: 1),
    ); // Simulate connection delay
    _isConnected = true;
    return true;
  }

  @override
  Future<void> disconnect() async {
    _isConnected = false;
  }

  @override
  Future<bool> isConnected() async {
    return _isConnected;
  }

  @override
  Future<String> sendCommand(String command) async {
    return "41 00 00"; // Generic mock response
  }

  @override
  Future<Map<String, bool>> availableSensors() async {
    // Simulate all sensors being available
    return {
      'rpm': true,
      'speed': true,
      'throttlePosition': true,
      'coolantTemp': true,
      'fuelRate': true,
      'odometer': true,
      'engineExhaustFlow': true,
      'fuelTankLevel': true,
    };
  }

  // --- Simulated Sensor Values ---

  @override
  Future<int> rpm() async {
    _time += 0.1;
    // Simulate RPM oscillating between 1000 and 3000
    double val = 2000 + 1000 * sin(_time);
    return val.round();
  }

  @override
  Future<int> speed() async {
    // Simulate speed oscillating between 30 and 90 km/h
    double val = 60 + 30 * sin(_time * 0.5);
    return val.round();
  }

  @override
  Future<double> throttlePosition() async {
    return 15.0 + _random.nextDouble() * 20.0;
  }

  @override
  Future<int> coolantTemp() async {
    // Warm engine around 90C
    return 88 + _random.nextInt(5);
  }

  @override
  Future<double> fuelRate() async {
    // L/h proportional to synthetic RPM
    return (await rpm()) / 600.0;
  }

  @override
  Future<double> odometer() async {
    // Increment odometer based on speed
    int speedKmh = await speed();
    _odometer += (speedKmh / 3600.0) * 0.1; // per 0.1s interval
    return _odometer;
  }

  @override
  Future<double> engineExhaustFlow() async {
    return 100.0 + _random.nextDouble() * 50.0;
  }

  @override
  Future<double> fuelTankLevel() async {
    return 75.0; // 75% fuel
  }

  @override
  Future<String> vin() async {
    return "00000000000000000"; // Mock VIN
  }

  @override
  Future<String> elmVersion() async {
    return "ELM327 Mock";
  }
}
