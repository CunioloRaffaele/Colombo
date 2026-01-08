import 'package:geolocator/geolocator.dart';

// Keep the drive state final in order to handle object mutation from the ViewModel
// when updating the state based on OBD-II data and geofencing info.

// Each update will create a new DriveState instance with updated values.

class DriveState {
  // ELM 327 state
  final bool isPipeConnected;
  final Map<String, bool> supportedPids;
  final String vin;
  final int rpm;
  final int speed;
  final double throttlePosition;
  final int coolantTemp;
  final double fuelRate;
  final double initialOdometer;
  final double odometer;
  final double engineExhaustFlow;
  final double fuelTankLevel;
  final double acceleration;
  // Eco statistics
  final double ecoscore; // Locally computed ecoscore
  // Geofencing state
  final bool isInZone;
  final String? zoneName;
  final Position? position;
  // State (generic)
  final bool? isSomethingBroken;
  final DateTime? lastUpdated;
  final int positionInBuffer;
  final int sessionId;

  DriveState({
    this.isPipeConnected = false,
    this.supportedPids = const {},
    this.vin = '',
    this.rpm = 0,
    this.speed = 0,
    this.throttlePosition = 0.0,
    this.coolantTemp = 0,
    this.fuelRate = 0.0,
    this.initialOdometer = 0.0,
    this.odometer = 0.0,
    this.engineExhaustFlow = 0.0,
    this.fuelTankLevel = 0.0,
    this.acceleration = 0.0,
    this.ecoscore = 0.0,
    this.isInZone = false,
    this.zoneName,
    this.position,
    this.isSomethingBroken,
    this.lastUpdated,
    this.positionInBuffer = 0,
    this.sessionId = 0,
  });

  // CopyWith method to create a new instance with optional updated values
  DriveState copyWith({
    bool? isPipeConnected,
    Map<String, bool>? supportedPids,
    String? vin,
    int? rpm,
    int? speed,
    double? throttlePosition,
    int? coolantTemp,
    double? fuelRate,
    double? initialOdometer,
    double? odometer,
    double? engineExhaustFlow,
    double? fuelTankLevel,
    double? ecoscore,
    bool? isInZone,
    String? zoneName,
    Position? position,
    bool? isSomethingBroken,
    DateTime? lastUpdated,
    int? positionInBuffer,
    int? sessionId,
  }) {
    return DriveState(
      isPipeConnected: isPipeConnected ?? this.isPipeConnected,
      supportedPids: supportedPids ?? this.supportedPids,
      vin: vin ?? this.vin,
      rpm: rpm ?? this.rpm,
      speed: speed ?? this.speed,
      throttlePosition: throttlePosition ?? this.throttlePosition,
      coolantTemp: coolantTemp ?? this.coolantTemp,
      fuelRate: fuelRate ?? this.fuelRate,
      initialOdometer: initialOdometer ?? this.initialOdometer,
      odometer: odometer ?? this.odometer,
      engineExhaustFlow: engineExhaustFlow ?? this.engineExhaustFlow,
      fuelTankLevel: fuelTankLevel ?? this.fuelTankLevel,
      ecoscore: ecoscore ?? this.ecoscore,
      isInZone: isInZone ?? this.isInZone,
      zoneName: zoneName ?? this.zoneName,
      position: position ?? this.position,
      isSomethingBroken: isSomethingBroken ?? this.isSomethingBroken,
      lastUpdated: lastUpdated ?? this.lastUpdated,
      positionInBuffer: positionInBuffer ?? this.positionInBuffer,
      sessionId: sessionId ?? this.sessionId,
    );
  }
}
