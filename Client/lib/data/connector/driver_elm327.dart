import 'package:flutter/services.dart';

class Elm327Driver {
  // https://en.wikipedia.org/wiki/OBD-II_PIDs#Service_01
  static const MethodChannel _channel = MethodChannel('bluetooth_channel');

  Future<bool> isBluetoothEnabled() async {
    return await _channel.invokeMethod<bool>('isBluetoothEnabled') ?? false;
  }

  Future<List<Map<String, String>>> getPairedDevices() async {
    final List<dynamic>? devices = await _channel.invokeMethod<List<dynamic>>('getPairedDevices');
    if (devices == null) return [];
    return devices.map((device) {
      // The map from the platform side is Map<dynamic, dynamic>
      return Map<String, String>.from(device);
    }).toList();
  }

  Future<bool> connect(String address) async {
    return await _channel.invokeMethod<bool>('connectToSerial', {'address': address}) ?? false;
  }

  Future<void> disconnect() async {
    await _channel.invokeMethod('disconnect');
  }

  Future<bool> isConnected() async {
    return await _channel.invokeMethod<bool>('isConnected') ?? false;
  }

  Future<String> sendCommand(String command) async {
    if (!await isConnected()) throw Exception("ELM327 driver: not connected to any device");
    return await _channel.invokeMethod<String>('sendSerialCommand', {'command': command}) ?? '';
  }

  // RPM: response "41 0C XX YY" => ((XX*256)+YY)/4
  Future<int> rpm() async {
    final response = await sendCommand('01 0C');
    final parts = response.split(' ');
    if (parts.length >= 4) {
      final xx = int.parse(parts[2], radix: 16);
      final yy = int.parse(parts[3], radix: 16);
      return ((xx * 256) + yy) ~/ 4;
    }
    throw Exception('Invalid RPM response: $response');
  }

  // Speed: response "41 0D XX" => XX
  Future<int> speed() async {
    final response = await sendCommand('01 0D');
    final parts = response.split(' ');
    if (parts.length >= 3) {
      return int.parse(parts[2], radix: 16);
    }
    throw Exception('Invalid speed response: $response');
  }

  // Throttle Position: response "41 11 XX" => (XX*100)/255
  Future<double> throttlePosition() async {
    /*await sendCommand('AT Z');
    await sendCommand('AT E0');
    await sendCommand('AT L0');
    await sendCommand('AT S0');
    await sendCommand('AT SP 0');*/
    final response = await sendCommand('01 11');
    if (response.contains('SEARCHING') || response.contains('UNABLE TO CONNECT') || response.startsWith('Error:')) {
      throw Exception('ELM327 error: $response');
    }
    final parts = response.split(' ');
    if (parts.length >= 3) {
      final xx = int.parse(parts[2], radix: 16);
      return (xx * 100) / 255;
    }
    throw Exception('Invalid throttle position response: $response');
  }

  // Coolant Temp: response "41 05 XX" => XX - 40
  Future<int> coolantTemp() async {
    final response = await sendCommand('01 05');
    final parts = response.split(' ');
    if (parts.length >= 3) {
      return int.parse(parts[2], radix: 16) - 40;
    }
    throw Exception('Invalid coolant temp response: $response');
  }

  Future<double> fuelRate() async {
    final response = await sendCommand('01 5E');
    final parts = response.split(' ');
    if (parts.length >= 4 && parts[0] == '41' && parts[1] == '5E') {
      final xx = int.parse(parts[2], radix: 16);
      final yy = int.parse(parts[3], radix: 16);
      return ((xx * 256) + yy) / 20.0;
    }
    throw Exception('Invalid fuel rate response: $response');
  }

  Future<double> odometer() async {
    final response = await sendCommand('01 A6');
    final parts = response.split(' ');
    if (parts.length >= 6 && parts[0] == '41' && parts[1] == 'A6') {
      final xx1 = int.parse(parts[2], radix: 16);
      final xx2 = int.parse(parts[3], radix: 16);
      final xx3 = int.parse(parts[4], radix: 16);
      final xx4 = int.parse(parts[5], radix: 16);
      return ((xx1 << 24) + (xx2 << 16) + (xx3 << 8) + xx4) / 10.0;
    }
    throw Exception('Invalid odometer response: $response');
  }

  Future<double> engineExhaustFlow() async {
    final response = await sendCommand('01 5F');
    final parts = response.split(' ');
    if (parts.length >= 4 && parts[0] == '41' && parts[1] == '5F') {
      final xx = int.parse(parts[2], radix: 16);
      final yy = int.parse(parts[3], radix: 16);
      return ((xx * 256) + yy) / 100.0;
    }
    throw Exception('Invalid engine exhaust flow response: $response');
  }

  Future <double> fuelTankLevel() async {
    final response = await sendCommand('01 2F');
    final parts = response.split(' ');
    if (parts.length >= 3 && parts[0] == '41' && parts[1] == '2F') {
      final xx = int.parse(parts[2], radix: 16);
      return (xx * 100) / 255.0;
    }
    throw Exception('Invalid fuel tank level response: $response');
  }

  Future<String> elmVersion() async => await sendCommand('AT Z');
}