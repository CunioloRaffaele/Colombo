import 'package:flutter/services.dart';

class Elm327Driver {
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
    if (!await isConnected()) throw Exception("Not connected to any device");
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

  Future<String> elmVersion() async => await sendCommand('AT Z');
}