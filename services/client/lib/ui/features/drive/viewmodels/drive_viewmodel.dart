import 'dart:async';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:just_audio/just_audio.dart';
import '../../../../data/services/drive_sessions_service.dart';
import '../../../../data/global_drive_state.dart';

// --- MOCK MODELS ---
/*class DriveState {
  final bool isConnected;
  final int speed;
  final double ecoscore;
  final bool isInZone;
  final String? zoneName;

  DriveState({
    this.isConnected = false,
    this.speed = 0,
    this.ecoscore = 100.0,
    this.isInZone = false,
    this.zoneName,
  });
}

// Mock Service
class MockDriveService {
  final _controller = StreamController<DriveState>.broadcast();
  Stream<DriveState> get stream => _controller.stream;
  Timer? _timer;

  void start() {
    _timer = Timer.periodic(const Duration(seconds: 2), (timer) {
      final randomScore = 60.0 + Random().nextInt(40);
      final speed = Random().nextInt(120);
      _controller.add(
        DriveState(
          isConnected: true,
          speed: speed,
          ecoscore: randomScore.toDouble(),
          isInZone: speed > 100,
          zoneName: "ZTL Centro",
        ),
      );
    });
  }

  void stop() => _timer?.cancel();
}*/

class DriveViewModel extends ChangeNotifier {
  // Service
  // final _service = MockDriveService(); // In a real app, inject this
  final _driveSessionService = DriveSessionService();
  StreamSubscription<DriveState>? _serviceSubscription;

  // Audio
  final _audioPlayer = AudioPlayer();
  bool _wasInZone = false;

  // State
  DriveState _currentState = DriveState();
  DriveState get currentState => _currentState;

  bool _isFocusMode = false;
  bool get isFocusMode => _isFocusMode;

  bool _isSoundMuted = false;
  bool get isSoundMuted => _isSoundMuted;

  bool _isSessionActive = false;
  bool get isSessionActive => _isSessionActive;

  bool _isBluetoothConnected = false;
  bool get isBluetoothConnected => _isBluetoothConnected;
  String _bluetoothAddress = "";
  String get bluetoothAddress => _bluetoothAddress;

  // Timers
  Timer? _inactivityTimer;

  DriveViewModel() {
    _init();
  }

  void _init() {
    //_driveSessionService.startMonitoring("00:1D:A5:68:98:8B");
    _serviceSubscription = _driveSessionService.stream.listen((newState) {
      _currentState = newState;
      _checkZoneEntrySound(newState.isInZone);
      notifyListeners();
    });
    resetInactivityTimer();
  }

  @override
  void dispose() {
    _driveSessionService.stopMonitoring();
    _serviceSubscription?.cancel();
    _inactivityTimer?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  // --- Session Management ---

  Future<void> toggleSession() async {
    if (_isBluetoothConnected == false) {
      NotificationOverlay.show(
        'Per avviare la sessione, connettiti prima al dispositivo ELM327.',
        Colors.red,
      );
      return;
    }
    if (!_isSessionActive) {
      try {
        await _driveSessionService.startMonitoring(_bluetoothAddress);
      } catch (e) {
        debugPrint("Errore avvio sessione: $e");
        NotificationOverlay.show(
          'Errore durante l\'avvio della sessione: $e',
          Colors.red,
        );
        _isSessionActive = false;
        return;
      }
    } else {
      try {
        _driveSessionService.stopMonitoring();
      } catch (e) {
        debugPrint("Errore chiusura sessione: $e");
        NotificationOverlay.show(
          'Errore durante la chiusura della sessione: $e',
          Colors.red,
        );
        return;
      }
    }
    _isSessionActive = !_isSessionActive;
    _startSessionSound();
    resetInactivityTimer();
    notifyListeners();
  }

  void togglePipeConnection(BuildContext context) async {
    try {
      final devices = await _driveSessionService.scanBluetoothDevices();
      final selectedAddress = await _showDeviceSelectionDialog(
        context,
        devices,
      );
      debugPrint("Selected Bluetooth Address: $selectedAddress");
      // If cancelled, just return. State remains untouched, no notify needed.
      if (selectedAddress.isEmpty) return;
      // Now it's safe to update state
      _bluetoothAddress = selectedAddress;
      _isBluetoothConnected = true;
      notifyListeners();
    } catch (e) {
      debugPrint("Error scanning Bluetooth devices: $e");
      NotificationOverlay.show(
        'Errore durante la scansione dei dispositivi Bluetooth: $e',
        Colors.red,
      );
      // Notify in case we want to show/
    }
    notifyListeners();
  }

  // --- Inactivity / Focus Mode ---

  void resetInactivityTimer() {
    _inactivityTimer?.cancel();
    if (_isFocusMode) {
      _isFocusMode = false;
      notifyListeners();
    }

    // Only activate Focus Mode if session is active
    if (!_isSessionActive) return;

    // Activate Focus Mode (black screen) after 10 seconds of inactivity
    _inactivityTimer = Timer(const Duration(seconds: 10), () {
      _isFocusMode = true;
      notifyListeners();
    });
  }

  // --- Audio Logic ---

  Future<void> _checkZoneEntrySound(bool isInZone) async {
    if (!_wasInZone && isInZone) {
      try {
        await _audioPlayer.setAsset(
          'lib/ui/assets/audio/notification_session_initialization.wav',
        );
        if (!isSoundMuted) {
          _audioPlayer.play();
        }
      } catch (e) {
        debugPrint("Error loading zone sound: $e");
      }
    }
    _wasInZone = isInZone;
  }

  Future<void> _startSessionSound() async {
    try {
      if (_isSessionActive) {
        await _audioPlayer.setAsset(
          'lib/ui/assets/audio/notification_enter_zone.wav',
        );
      } else {
        await _audioPlayer.setAsset(
          'lib/ui/assets/audio/notification_session_end.wav',
        );
      }
      if (!isSoundMuted) {
        _audioPlayer.play();
      }
    } catch (e) {
      debugPrint("Error loading session sound: $e");
    }
  }

  void toggleSoundMute() {
    _isSoundMuted = !_isSoundMuted;
    if (_isSoundMuted) {
      _audioPlayer.stop();
      _audioPlayer.setVolume(0.0);
    } else {
      _audioPlayer.setVolume(1.0);
    }
    notifyListeners();
  }
}

// --- Bluetooth Device Selection Dialog ---
Future<String> _showDeviceSelectionDialog(
  BuildContext context,
  List<Map<String, String>> devices,
) async {
  final selectedAddress = await showDialog<String>(
    context: context,
    builder: (BuildContext context) {
      return AlertDialog(
        title: const Text('Seleziona un dispositivo'),
        content: SizedBox(
          width: double.maxFinite,
          child: ListView.builder(
            shrinkWrap: true,
            itemCount: devices.length,
            itemBuilder: (context, index) {
              final device = devices[index];
              return ListTile(
                title: Text(device['name'] ?? 'Unknown Device'),
                subtitle: Text(device['address'] ?? 'No address'),
                onTap: () {
                  Navigator.of(context).pop(device['address']);
                },
              );
            },
          ),
        ),
      );
    },
  );
  return selectedAddress ?? "";
}
