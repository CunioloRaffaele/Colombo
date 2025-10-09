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
    return await _channel.invokeMethod<bool>('connect', {'address': address}) ?? false;
  }

  Future<void> disconnect() async {
    await _channel.invokeMethod('disconnect');
  }

  Future<bool> isConnected() async {
    return await _channel.invokeMethod<bool>('isConnected') ?? false;
  }
}