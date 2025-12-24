import 'package:json_annotation/json_annotation.dart';
import '../global_drive_state.dart';

part 'drive_data_point_dto.g.dart';

@JsonSerializable()
class DriveDataPoint {
  final int timestampUnix;
  final bool rpmAvailable;
  final int rpm;
  final bool speedAvailable;
  final int speed;
  final bool throttlePositionAvailable;
  final double throttlePosition;
  final bool coolantTempAvailable;
  final int coolantTemp;
  final bool fuelRateAvailable;
  final double fuelRate;
  final bool odometerAvailable;
  final double odometer;
  final bool engineExhaustFlowAvailable;
  final double engineExhaustFlow;
  final bool fuelTankLevelAvailable;
  final double fuelTankLevel;
  final double latitude;
  final double longitude;

  DriveDataPoint({
    required this.timestampUnix,
    required this.rpmAvailable,
    required this.rpm,
    required this.speedAvailable,
    required this.speed,
    required this.throttlePositionAvailable,
    required this.throttlePosition,
    required this.coolantTempAvailable,
    required this.coolantTemp,
    required this.fuelRateAvailable,
    required this.fuelRate,
    required this.odometerAvailable,
    required this.odometer,
    required this.engineExhaustFlowAvailable,
    required this.engineExhaustFlow,
    required this.fuelTankLevelAvailable,
    required this.fuelTankLevel,
    required this.latitude,
    required this.longitude,
  });
  factory DriveDataPoint.fromJson(Map<String, dynamic> json) =>
      _$DriveDataPointFromJson(json);
  Map<String, dynamic> toJson() => _$DriveDataPointToJson(this);

  // factory method to create DriveDataPoint from DriveState
  factory DriveDataPoint.fromState(DriveState state) {
    return DriveDataPoint(
      timestampUnix: DateTime.now().millisecondsSinceEpoch,
      rpmAvailable: state.supportedPids['rpm'] ?? false,
      rpm: state.rpm,
      speedAvailable: state.supportedPids['speed'] ?? false,
      speed: state.speed,
      throttlePositionAvailable:
          state.supportedPids['throttlePosition'] ?? false,
      throttlePosition: state.throttlePosition,
      coolantTempAvailable: state.supportedPids['coolantTemp'] ?? false,
      coolantTemp: state.coolantTemp,
      fuelRateAvailable: state.supportedPids['fuelRate'] ?? false,
      fuelRate: state.fuelRate,
      odometerAvailable: state.supportedPids['odometer'] ?? false,
      odometer: state.odometer,
      engineExhaustFlowAvailable:
          state.supportedPids['engineExhaustFlow'] ?? false,
      engineExhaustFlow: state.engineExhaustFlow,
      fuelTankLevelAvailable: state.supportedPids['fuelTankLevel'] ?? false,
      fuelTankLevel: state.fuelTankLevel,
      latitude: state.position?.latitude ?? 0.0,
      longitude: state.position?.longitude ?? 0.0,
    );
  }
}
