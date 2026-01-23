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

      // Clean the response: remove "SEARCHING..." and extra spaces
      String cleaned = response
          .replaceAll('SEARCHING...', '')
          .replaceAll(RegExp(r'\s+'), ' ')
          .trim();

      final List<String> hexBytes = [];
      final tokens = cleaned.split(' ');

      for (var token in tokens) {
        if (token.isEmpty) continue;
        // handle tokens with colon (e.g., "0:41", "1:4A", etc.)
        // take only the part after the colon
        if (token.contains(':')) {
          token = token.split(':').last;
        }
        if (RegExp(r'^[0-9A-Fa-f]{2}$').hasMatch(token)) {
          hexBytes.add(token);
        }
      }

      // look for the positive response signature: "41 XX" (41 = 01 + 40, XX = pid base)
      // the second byte must match the base we requested
      final expectedPidHex = base
          .toRadixString(16)
          .padLeft(2, '0')
          .toUpperCase();

      int startIndex = -1;
      for (int i = 0; i < hexBytes.length - 1; i++) {
        if (hexBytes[i] == '41' && hexBytes[i + 1] == expectedPidHex) {
          startIndex = i;
          break;
        }
      }

      // if not found, skip
      if (startIndex == -1) continue;

      // The data starts after "41 XX"
      // 4 bytes of bitmask
      int dataIdx = startIndex + 2;

      // Sanity check (enough bytes for 4 bytes of bitmask)
      if (hexBytes.length - dataIdx < 4) continue;

      // Parse the 4 bytes of bitmask
      for (int i = 0; i < 4; i++) {
        final byteHex = hexBytes[dataIdx + i];
        final byteVal = int.tryParse(byteHex, radix: 16) ?? 0;

        for (int bit = 0; bit < 8; bit++) {
          // bit 7 is the first PID of the block, bit 0 is the last
          final isSet = ((byteVal >> (7 - bit)) & 0x01) == 1;
          if (isSet) {
            // base + (byte index * 8) + bit index + 1
            // Example: for base 0x00, the first bit of the first byte is PID 0x01
            final pidNumber = base + (i * 8) + bit + 1;
            supported.add(pidNumber);
          }
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

    // Fallback
    if (pids.isEmpty) {
      return {
        'rpm': true,
        'speed': true,
        'throttlePosition': true,
        'coolantTemp': true,
        'fuelRate': true,
        'odometer': true, // Spesso falso sulle auto vecchie, ma proviamo
        'engineExhaustFlow': true,
        'fuelTankLevel': true,
      };
    }

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

  /// Helper: Parse response for Mode 01 commands.
  /// Looks for "41 <PID>" pattern and returns the data bytes following it.
  /// This robust parsing handles echoes and extra whitespace/newlines.
  List<int> _parseMode01Values(String response, String pidHex) {
    // 1. Clean the response
    String cleaned = response
        .replaceAll('SEARCHING...', '')
        .replaceAll(
          RegExp(r'[\r\n>]+'),
          ' ',
        ) // Treat newlines/prompts as spaces
        .replaceAll(RegExp(r'\s+'), ' ')
        .trim();

    final List<String> hexTokens = [];
    final parts = cleaned.split(' ');

    for (var token in parts) {
      if (token.isEmpty) continue;
      // Handle CAN formatting like "0:41", "1:0C" etc.
      if (token.contains(':')) {
        token = token.split(':').last;
      }
      // Check if it's a valid hex byte
      if (RegExp(r'^[0-9A-Fa-f]{2}$').hasMatch(token)) {
        hexTokens.add(token.toUpperCase());
      }
    }

    final targetPid = pidHex.toUpperCase();

    // 2. Find "41 <PID>"
    for (int i = 0; i < hexTokens.length - 1; i++) {
      if (hexTokens[i] == '41' && hexTokens[i + 1] == targetPid) {
        // Return everything after the PID
        return hexTokens
            .sublist(i + 2)
            .map((h) => int.parse(h, radix: 16))
            .toList();
      }
    }

    throw Exception(
      'Invalid response for 01 $pidHex (header "41 $pidHex" not found): $response',
    );
  }

  // RPM: response "41 0C XX YY" => ((XX*256)+YY)/4
  Future<int> rpm() async {
    final response = await sendCommand('01 0C');
    final bytes = _parseMode01Values(response, '0C');
    if (bytes.length >= 2) {
      return ((bytes[0] * 256) + bytes[1]) ~/ 4;
    }
    throw Exception('Invalid RPM response: $response');
  }

  // Speed: response "41 0D XX" => XX
  Future<int> speed() async {
    final response = await sendCommand('01 0D');
    final bytes = _parseMode01Values(response, '0D');
    if (bytes.isNotEmpty) {
      return bytes[0];
    }
    throw Exception('Invalid speed response: $response');
  }

  // Throttle Position: response "41 11 XX" => (XX*100)/255
  Future<double> throttlePosition() async {
    final response = await sendCommand('01 11');
    final bytes = _parseMode01Values(response, '11');
    if (bytes.isNotEmpty) {
      return (bytes[0] * 100) / 255;
    }
    throw Exception('Invalid throttle position response: $response');
  }

  // Coolant Temp: response "41 05 XX" => XX - 40
  Future<int> coolantTemp() async {
    final response = await sendCommand('01 05');
    final bytes = _parseMode01Values(response, '05');
    if (bytes.isNotEmpty) {
      return bytes[0] - 40;
    }
    throw Exception('Invalid coolant temp response: $response');
  }

  // Fuel Rate: response "41 5E XX YY" => ((XX*256)+YY)/20
  Future<double> fuelRate() async {
    final response = await sendCommand('01 5E');
    final bytes = _parseMode01Values(response, '5E');
    if (bytes.length >= 2) {
      return ((bytes[0] * 256) + bytes[1]) / 20.0;
    }
    throw Exception('Invalid fuel rate response: $response');
  }

  // Odometer: response "41 A6 XX1 XX2 XX3 XX4" => ((XX1<<24)+(XX2<<16)+(XX3<<8)+XX4)/10.0
  Future<double> odometer() async {
    final response = await sendCommand('01 A6');
    final bytes = _parseMode01Values(response, 'A6');
    if (bytes.length >= 4) {
      final xx1 = bytes[0];
      final xx2 = bytes[1];
      final xx3 = bytes[2];
      final xx4 = bytes[3];
      return ((xx1 << 24) + (xx2 << 16) + (xx3 << 8) + xx4) / 10.0;
    }
    throw Exception('Invalid odometer response: $response');
  }

  // Engine Exhaust Flow: response "41 5F XX YY" => ((XX*256)+YY)/100.0
  Future<double> engineExhaustFlow() async {
    final response = await sendCommand('01 5F');
    final bytes = _parseMode01Values(response, '5F');
    if (bytes.length >= 2) {
      return ((bytes[0] * 256) + bytes[1]) / 100.0;
    }
    throw Exception('Invalid engine exhaust flow response: $response');
  }

  // Fuel Tank Level: response "41 2F XX" => (XX*100)/255.0
  Future<double> fuelTankLevel() async {
    final response = await sendCommand('01 2F');
    final bytes = _parseMode01Values(response, '2F');
    if (bytes.isNotEmpty) {
      return (bytes[0] * 100) / 255.0;
    }
    throw Exception('Invalid fuel tank level response: $response');
  }

  // VIN: response "09 02 XX ... " => ASCII string
  Future<String> vin() async {
    try {
      final response = await sendCommand('09 02');

      // 1. Gestione errore esplicito (Negative Response)
      if (response.contains('7F 09')) {
        return "00000000000000000";
      }

      // 2. Logica di Riordino Frame CAN (Fondamentale per risposte multilinea)
      // Suddividiamo per righe
      final lines = response
          .replaceAll('SEARCHING...', '')
          .split(RegExp(r'[\r\n]+'));

      final Map<int, String> frames = {};
      final List<String> unindexed = [];

      for (var line in lines) {
        line = line.trim();
        if (line.isEmpty) continue;

        // Cerca pattern "0: ..." o "1:..."
        final match = RegExp(r'^(\d+)\s*:(.*)').firstMatch(line);
        if (match != null) {
          final index = int.parse(match.group(1)!);
          frames[index] = match.group(2)!;
        } else {
          unindexed.add(line);
        }
      }

      // Ricostruiamo lo stream nell'ordine corretto
      String cleanStream = "";
      if (frames.isNotEmpty) {
        final sortedKeys = frames.keys.toList()..sort();
        cleanStream = sortedKeys.map((k) => frames[k]!).join(' ');
      } else {
        cleanStream = unindexed.join(' ');
      }

      // 3. Estrazione Byte Hex
      final List<String> hexBytes = [];
      final tokens = cleanStream.split(RegExp(r'\s+'));
      for (var token in tokens) {
        if (RegExp(r'^[0-9A-Fa-f]{2}$').hasMatch(token)) {
          hexBytes.add(token);
        }
      }

      // 4. Tentativo Standard: Cerca header "49 02"
      int startIndex = -1;
      for (int i = 0; i < hexBytes.length - 1; i++) {
        if (hexBytes[i] == '49' && hexBytes[i + 1] == '02') {
          startIndex = i;
          break;
        }
      }

      if (startIndex != -1) {
        int dataIdx = startIndex + 2;
        // Salta eventuale byte conteggio/padding (solitamente 01)
        if (dataIdx < hexBytes.length && hexBytes[dataIdx] == '01') {
          if ((hexBytes.length - (dataIdx + 1)) >= 17) {
            dataIdx++;
          }
        }

        if (hexBytes.length - dataIdx >= 17) {
          final vinHex = hexBytes.sublist(dataIdx, dataIdx + 17);
          return vinHex
              .map((h) => String.fromCharCode(int.parse(h, radix: 16)))
              .join();
        }
      }

      // 5. Tentativo Fallback: Se header corrotto, cerca qualsiasi sequenza valida di 17 caratteri
      // Decodifica interi stream hex in ASCII e cerca un pattern VIN
      final fullAscii = hexBytes
          .map((h) => int.tryParse(h, radix: 16) ?? 0)
          .map((c) => String.fromCharCode(c))
          .join();

      // Regex VIN lasco (lettere e numeri, 17 char)
      final fallbackMatch = RegExp(
        r'[A-HJ-NPR-Z0-9]{17}',
      ).firstMatch(fullAscii);
      if (fallbackMatch != null) {
        return fallbackMatch.group(0)!;
      }

      // Se arriviamo qui, non siamo riusciti a leggere
      print("VIN Parsing failed on response: $response");
      return "00000000000000000";
    } catch (e) {
      // 6. Catch-all: previene crash dell'app qualunque cosa succeda
      print("VIN Exception: $e");
      return "00000000000000000";
    }
  }

  // ELM327 Version: response "AT Z" => version string
  Future<String> elmVersion() async => await sendCommand('AT Z');
}

//https://blog.perquin.com/prj/obdii/
