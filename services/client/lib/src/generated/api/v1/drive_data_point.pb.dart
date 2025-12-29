// This is a generated file - do not edit.
//
// Generated from api/v1/drive_data_point.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:fixnum/fixnum.dart' as $fixnum;
import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class DriveDataPoint extends $pb.GeneratedMessage {
  factory DriveDataPoint({
    $fixnum.Int64? timestampUnix,
    $core.bool? rpmAvailable,
    $core.int? rpm,
    $core.bool? speedAvailable,
    $core.int? speed,
    $core.bool? throttlePositionAvailable,
    $core.double? throttlePosition,
    $core.bool? coolantTempAvailable,
    $core.int? coolantTemp,
    $core.bool? fuelRateAvailable,
    $core.double? fuelRate,
    $core.bool? odometerAvailable,
    $core.double? odometer,
    $core.bool? engineExhaustFlowAvailable,
    $core.double? engineExhaustFlow,
    $core.bool? fuelTankLevelAvailable,
    $core.double? fuelTankLevel,
    $core.double? latitude,
    $core.double? longitude,
  }) {
    final result = create();
    if (timestampUnix != null) result.timestampUnix = timestampUnix;
    if (rpmAvailable != null) result.rpmAvailable = rpmAvailable;
    if (rpm != null) result.rpm = rpm;
    if (speedAvailable != null) result.speedAvailable = speedAvailable;
    if (speed != null) result.speed = speed;
    if (throttlePositionAvailable != null)
      result.throttlePositionAvailable = throttlePositionAvailable;
    if (throttlePosition != null) result.throttlePosition = throttlePosition;
    if (coolantTempAvailable != null)
      result.coolantTempAvailable = coolantTempAvailable;
    if (coolantTemp != null) result.coolantTemp = coolantTemp;
    if (fuelRateAvailable != null) result.fuelRateAvailable = fuelRateAvailable;
    if (fuelRate != null) result.fuelRate = fuelRate;
    if (odometerAvailable != null) result.odometerAvailable = odometerAvailable;
    if (odometer != null) result.odometer = odometer;
    if (engineExhaustFlowAvailable != null)
      result.engineExhaustFlowAvailable = engineExhaustFlowAvailable;
    if (engineExhaustFlow != null) result.engineExhaustFlow = engineExhaustFlow;
    if (fuelTankLevelAvailable != null)
      result.fuelTankLevelAvailable = fuelTankLevelAvailable;
    if (fuelTankLevel != null) result.fuelTankLevel = fuelTankLevel;
    if (latitude != null) result.latitude = latitude;
    if (longitude != null) result.longitude = longitude;
    return result;
  }

  DriveDataPoint._();

  factory DriveDataPoint.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromBuffer(data, registry);
  factory DriveDataPoint.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'DriveDataPoint',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'api.v1'),
      createEmptyInstance: create)
    ..aInt64(1, _omitFieldNames ? '' : 'timestampUnix')
    ..aOB(2, _omitFieldNames ? '' : 'rpmAvailable')
    ..aI(3, _omitFieldNames ? '' : 'rpm')
    ..aOB(4, _omitFieldNames ? '' : 'speedAvailable')
    ..aI(5, _omitFieldNames ? '' : 'speed')
    ..aOB(6, _omitFieldNames ? '' : 'throttlePositionAvailable')
    ..aD(7, _omitFieldNames ? '' : 'throttlePosition')
    ..aOB(8, _omitFieldNames ? '' : 'coolantTempAvailable')
    ..aI(9, _omitFieldNames ? '' : 'coolantTemp')
    ..aOB(10, _omitFieldNames ? '' : 'fuelRateAvailable')
    ..aD(11, _omitFieldNames ? '' : 'fuelRate')
    ..aOB(12, _omitFieldNames ? '' : 'odometerAvailable')
    ..aD(13, _omitFieldNames ? '' : 'odometer')
    ..aOB(14, _omitFieldNames ? '' : 'engineExhaustFlowAvailable')
    ..aD(15, _omitFieldNames ? '' : 'engineExhaustFlow')
    ..aOB(16, _omitFieldNames ? '' : 'fuelTankLevelAvailable')
    ..aD(17, _omitFieldNames ? '' : 'fuelTankLevel')
    ..aD(18, _omitFieldNames ? '' : 'latitude')
    ..aD(19, _omitFieldNames ? '' : 'longitude')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DriveDataPoint clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  DriveDataPoint copyWith(void Function(DriveDataPoint) updates) =>
      super.copyWith((message) => updates(message as DriveDataPoint))
          as DriveDataPoint;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static DriveDataPoint create() => DriveDataPoint._();
  @$core.override
  DriveDataPoint createEmptyInstance() => create();
  @$core.pragma('dart2js:noInline')
  static DriveDataPoint getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<DriveDataPoint>(create);
  static DriveDataPoint? _defaultInstance;

  @$pb.TagNumber(1)
  $fixnum.Int64 get timestampUnix => $_getI64(0);
  @$pb.TagNumber(1)
  set timestampUnix($fixnum.Int64 value) => $_setInt64(0, value);
  @$pb.TagNumber(1)
  $core.bool hasTimestampUnix() => $_has(0);
  @$pb.TagNumber(1)
  void clearTimestampUnix() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.bool get rpmAvailable => $_getBF(1);
  @$pb.TagNumber(2)
  set rpmAvailable($core.bool value) => $_setBool(1, value);
  @$pb.TagNumber(2)
  $core.bool hasRpmAvailable() => $_has(1);
  @$pb.TagNumber(2)
  void clearRpmAvailable() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.int get rpm => $_getIZ(2);
  @$pb.TagNumber(3)
  set rpm($core.int value) => $_setSignedInt32(2, value);
  @$pb.TagNumber(3)
  $core.bool hasRpm() => $_has(2);
  @$pb.TagNumber(3)
  void clearRpm() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.bool get speedAvailable => $_getBF(3);
  @$pb.TagNumber(4)
  set speedAvailable($core.bool value) => $_setBool(3, value);
  @$pb.TagNumber(4)
  $core.bool hasSpeedAvailable() => $_has(3);
  @$pb.TagNumber(4)
  void clearSpeedAvailable() => $_clearField(4);

  @$pb.TagNumber(5)
  $core.int get speed => $_getIZ(4);
  @$pb.TagNumber(5)
  set speed($core.int value) => $_setSignedInt32(4, value);
  @$pb.TagNumber(5)
  $core.bool hasSpeed() => $_has(4);
  @$pb.TagNumber(5)
  void clearSpeed() => $_clearField(5);

  @$pb.TagNumber(6)
  $core.bool get throttlePositionAvailable => $_getBF(5);
  @$pb.TagNumber(6)
  set throttlePositionAvailable($core.bool value) => $_setBool(5, value);
  @$pb.TagNumber(6)
  $core.bool hasThrottlePositionAvailable() => $_has(5);
  @$pb.TagNumber(6)
  void clearThrottlePositionAvailable() => $_clearField(6);

  @$pb.TagNumber(7)
  $core.double get throttlePosition => $_getN(6);
  @$pb.TagNumber(7)
  set throttlePosition($core.double value) => $_setDouble(6, value);
  @$pb.TagNumber(7)
  $core.bool hasThrottlePosition() => $_has(6);
  @$pb.TagNumber(7)
  void clearThrottlePosition() => $_clearField(7);

  @$pb.TagNumber(8)
  $core.bool get coolantTempAvailable => $_getBF(7);
  @$pb.TagNumber(8)
  set coolantTempAvailable($core.bool value) => $_setBool(7, value);
  @$pb.TagNumber(8)
  $core.bool hasCoolantTempAvailable() => $_has(7);
  @$pb.TagNumber(8)
  void clearCoolantTempAvailable() => $_clearField(8);

  @$pb.TagNumber(9)
  $core.int get coolantTemp => $_getIZ(8);
  @$pb.TagNumber(9)
  set coolantTemp($core.int value) => $_setSignedInt32(8, value);
  @$pb.TagNumber(9)
  $core.bool hasCoolantTemp() => $_has(8);
  @$pb.TagNumber(9)
  void clearCoolantTemp() => $_clearField(9);

  @$pb.TagNumber(10)
  $core.bool get fuelRateAvailable => $_getBF(9);
  @$pb.TagNumber(10)
  set fuelRateAvailable($core.bool value) => $_setBool(9, value);
  @$pb.TagNumber(10)
  $core.bool hasFuelRateAvailable() => $_has(9);
  @$pb.TagNumber(10)
  void clearFuelRateAvailable() => $_clearField(10);

  @$pb.TagNumber(11)
  $core.double get fuelRate => $_getN(10);
  @$pb.TagNumber(11)
  set fuelRate($core.double value) => $_setDouble(10, value);
  @$pb.TagNumber(11)
  $core.bool hasFuelRate() => $_has(10);
  @$pb.TagNumber(11)
  void clearFuelRate() => $_clearField(11);

  @$pb.TagNumber(12)
  $core.bool get odometerAvailable => $_getBF(11);
  @$pb.TagNumber(12)
  set odometerAvailable($core.bool value) => $_setBool(11, value);
  @$pb.TagNumber(12)
  $core.bool hasOdometerAvailable() => $_has(11);
  @$pb.TagNumber(12)
  void clearOdometerAvailable() => $_clearField(12);

  @$pb.TagNumber(13)
  $core.double get odometer => $_getN(12);
  @$pb.TagNumber(13)
  set odometer($core.double value) => $_setDouble(12, value);
  @$pb.TagNumber(13)
  $core.bool hasOdometer() => $_has(12);
  @$pb.TagNumber(13)
  void clearOdometer() => $_clearField(13);

  @$pb.TagNumber(14)
  $core.bool get engineExhaustFlowAvailable => $_getBF(13);
  @$pb.TagNumber(14)
  set engineExhaustFlowAvailable($core.bool value) => $_setBool(13, value);
  @$pb.TagNumber(14)
  $core.bool hasEngineExhaustFlowAvailable() => $_has(13);
  @$pb.TagNumber(14)
  void clearEngineExhaustFlowAvailable() => $_clearField(14);

  @$pb.TagNumber(15)
  $core.double get engineExhaustFlow => $_getN(14);
  @$pb.TagNumber(15)
  set engineExhaustFlow($core.double value) => $_setDouble(14, value);
  @$pb.TagNumber(15)
  $core.bool hasEngineExhaustFlow() => $_has(14);
  @$pb.TagNumber(15)
  void clearEngineExhaustFlow() => $_clearField(15);

  @$pb.TagNumber(16)
  $core.bool get fuelTankLevelAvailable => $_getBF(15);
  @$pb.TagNumber(16)
  set fuelTankLevelAvailable($core.bool value) => $_setBool(15, value);
  @$pb.TagNumber(16)
  $core.bool hasFuelTankLevelAvailable() => $_has(15);
  @$pb.TagNumber(16)
  void clearFuelTankLevelAvailable() => $_clearField(16);

  @$pb.TagNumber(17)
  $core.double get fuelTankLevel => $_getN(16);
  @$pb.TagNumber(17)
  set fuelTankLevel($core.double value) => $_setDouble(16, value);
  @$pb.TagNumber(17)
  $core.bool hasFuelTankLevel() => $_has(16);
  @$pb.TagNumber(17)
  void clearFuelTankLevel() => $_clearField(17);

  @$pb.TagNumber(18)
  $core.double get latitude => $_getN(17);
  @$pb.TagNumber(18)
  set latitude($core.double value) => $_setDouble(17, value);
  @$pb.TagNumber(18)
  $core.bool hasLatitude() => $_has(17);
  @$pb.TagNumber(18)
  void clearLatitude() => $_clearField(18);

  @$pb.TagNumber(19)
  $core.double get longitude => $_getN(18);
  @$pb.TagNumber(19)
  set longitude($core.double value) => $_setDouble(18, value);
  @$pb.TagNumber(19)
  $core.bool hasLongitude() => $_has(18);
  @$pb.TagNumber(19)
  void clearLongitude() => $_clearField(19);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
