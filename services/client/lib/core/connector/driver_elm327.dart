import 'dart:async';
import 'package:flutter/services.dart';

class Elm327Driver {
  // https://en.wikipedia.org/wiki/OBD-II_PIDs#Service_01
  static const MethodChannel _channel = MethodChannel('bluetooth_channel');

  // MUTEX
  Future<void>? _commandLock;

  // Cache of supported PIDs discovered via 01 00 / 01 20 / ... probes.
  Set<int>? _supportedPidsCache;

  // Commands to discover supported PID bitfields; each adds 32 PIDs starting at base.
  // Command 00 returns PIDs 01-20, 20 returns 21-40, etc. up to A0.
  static const List<(String, int)> _pidDiscovery = [
    ('01 00', 0x00),
    ('01 20', 0x20),
    ('01 40', 0x40),
    ('01 60', 0x60),
    ('01 80', 0x80),
    ('01 A0', 0xA0),
  ];

  Future<bool> isBluetoothEnabled() async {
    return await _channel.invokeMethod<bool>('isBluetoothEnabled') ?? false;
  }

  Future<List<Map<String, String>>> getPairedDevices() async {
    final List<dynamic>? devices = await _channel.invokeMethod<List<dynamic>>(
      'getPairedDevices',
    );
    if (devices == null) return [];
    return devices.map((device) {
      // The map from the platform side is Map<dynamic, dynamic>
      return Map<String, String>.from(device);
    }).toList();
  }

  Future<bool> connect(String address) async {
    return _synchronized(() async {
      return await _channel.invokeMethod<bool>('connectToSerial', {
            'address': address,
          }) ??
          false;
    });
  }

  Future<void> disconnect() async {
    await _channel.invokeMethod('disconnect');
    _supportedPidsCache = null;
  }

  Future<bool> isConnected() async {
    return await _channel.invokeMethod<bool>('isConnected') ?? false;
  }

  // Send a command to the ELM327.
  Future<String> sendCommand(String command) async {
    return _synchronized(() async {
      if (!await isConnected()) {
        throw Exception("ELM327 driver: not connected to any device");
      }
      return await _channel.invokeMethod<String>('sendSerialCommand', {
            'command': command,
          }) ??
          '';
    });
  }

  /// Mutex (Lock)
  /// Executes the given [action] in a synchronized manner, ensuring that
  /// only one action can run at a time.
  Future<T> _synchronized<T>(Future<T> Function() action) async {
    // 1. get the previous lock (if any)
    final previousLock = _commandLock;

    // 2. Create a new completer for our turn
    final completer = Completer<void>();

    // 3. Update the global lock: the next one will have to wait for us
    _commandLock = completer.future;

    try {
      // 4. If there was someone before us, wait for them to finish
      if (previousLock != null) {
        await previousLock;
      }

      // 5. Now it's our turn
      return await action();
    } finally {
      // 6. Signal that we have finished (even in case of error)
      completer.complete();
    }
  }

  // Returns the set of supported PID numbers (Mode 01) discovered from the ECU.
  Future<Set<int>> _supportedPids() async {
    if (_supportedPidsCache != null) return _supportedPidsCache!;

    final supported = <int>{};
    for (final (cmd, base) in _pidDiscovery) {
      final response = await sendCommand(cmd);
      final parts = response.split(' ').where((p) => p.isNotEmpty).toList();
      // Expected: 41 <start> XX XX XX XX
      if (parts.length < 6 || parts[0] != '41') {
        continue; // Skip malformed responses
      }

      for (int i = 0; i < 32; i++) {
        final byteIdx = 2 + (i ~/ 8);
        final bitPos = 7 - (i % 8);
        final byteVal = int.tryParse(parts[byteIdx], radix: 16) ?? 0;
        final isSet = ((byteVal >> bitPos) & 0x01) == 1;
        if (isSet) {
          supported.add(base + i + 1); // Bits map to PID base+1..base+32
        }
      }
    }

    _supportedPidsCache = supported;
    return supported;
  }

  // Returns a map of available sensors based on supported PIDs.
  // The keys are sensor names, and the values indicate availability.
  // You can call this method multiple times as the supported PIDs are cached.
  Future<Map<String, bool>> availableSensors() async {
    final pids = await _supportedPids();
    return {
      'rpm': pids.contains(0x0C),
      'speed': pids.contains(0x0D),
      'throttlePosition': pids.contains(0x11),
      'coolantTemp': pids.contains(0x05),
      'fuelRate': pids.contains(0x5E),
      'odometer': pids.contains(0xA6),
      'engineExhaustFlow': pids.contains(0x5F),
      'fuelTankLevel': pids.contains(0x2F),
    };
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
    final response = await sendCommand('01 11');
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

  // Fuel Rate: response "41 5E XX YY" => ((XX*256)+YY)/20
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

  // Odometer: response "41 A6 XX1 XX2 XX3 XX4" => ((XX1<<24)+(XX2<<16)+(XX3<<8)+XX4)/10.0
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

  // Engine Exhaust Flow: response "41 5F XX YY" => ((XX*256)+YY)/100.0
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
  
  // Fuel Tank Level: response "41 2F XX" => (XX*100)/255.0
  Future<double> fuelTankLevel() async {
    final response = await sendCommand('01 2F');
    final parts = response.split(' ');
    if (parts.length >= 3 && parts[0] == '41' && parts[1] == '2F') {
      final xx = int.parse(parts[2], radix: 16);
      return (xx * 100) / 255.0;
    }
    throw Exception('Invalid fuel tank level response: $response');
  }

  // ELM327 Version: response "AT Z" => version string
  Future<String> elmVersion() async => await sendCommand('AT Z');
}
