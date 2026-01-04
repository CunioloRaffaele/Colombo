// This is a generated file - do not edit.
//
// Generated from api/v1/data_point.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

class DriveDataPoint extends $pb.GeneratedMessage {
  factory DriveDataPoint({
    $core.int? timestampUnix,
    $core.Iterable<$core.MapEntry<$core.String, $core.bool>>? availableVitals,
    $core.int? rpm,
    $core.int? speed,
    $core.double? throttlePosition,
    $core.int? coolantTemp,
    $core.double? fuelRate,
    $core.double? odometer,
    $core.double? engineExhaustFlow,
    $core.double? fuelTankLevel,
    $core.double? latitude,
    $core.double? longitude,
  }) {
    final result = create();
    if (timestampUnix != null) result.timestampUnix = timestampUnix;
    if (availableVitals != null)
      result.availableVitals.addEntries(availableVitals);
    if (rpm != null) result.rpm = rpm;
    if (speed != null) result.speed = speed;
    if (throttlePosition != null) result.throttlePosition = throttlePosition;
    if (coolantTemp != null) result.coolantTemp = coolantTemp;
    if (fuelRate != null) result.fuelRate = fuelRate;
    if (odometer != null) result.odometer = odometer;
    if (engineExhaustFlow != null) result.engineExhaustFlow = engineExhaustFlow;
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
    ..aI(1, _omitFieldNames ? '' : 'timestampUnix')
    ..m<$core.String, $core.bool>(2, _omitFieldNames ? '' : 'availableVitals',
        entryClassName: 'DriveDataPoint.AvailableVitalsEntry',
        keyFieldType: $pb.PbFieldType.OS,
        valueFieldType: $pb.PbFieldType.OB,
        packageName: const $pb.PackageName('api.v1'))
    ..aI(3, _omitFieldNames ? '' : 'rpm')
    ..aI(4, _omitFieldNames ? '' : 'speed')
    ..aD(5, _omitFieldNames ? '' : 'throttlePosition')
    ..aI(6, _omitFieldNames ? '' : 'coolantTemp')
    ..aD(7, _omitFieldNames ? '' : 'fuelRate')
    ..aD(8, _omitFieldNames ? '' : 'odometer')
    ..aD(9, _omitFieldNames ? '' : 'engineExhaustFlow')
    ..aD(10, _omitFieldNames ? '' : 'fuelTankLevel')
    ..aD(11, _omitFieldNames ? '' : 'latitude')
    ..aD(12, _omitFieldNames ? '' : 'longitude')
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
  $core.int get timestampUnix => $_getIZ(0);
  @$pb.TagNumber(1)
  set timestampUnix($core.int value) => $_setSignedInt32(0, value);
  @$pb.TagNumber(1)
  $core.bool hasTimestampUnix() => $_has(0);
  @$pb.TagNumber(1)
  void clearTimestampUnix() => $_clearField(1);

  @$pb.TagNumber(2)
  $pb.PbMap<$core.String, $core.bool> get availableVitals => $_getMap(1);

  @$pb.TagNumber(3)
  $core.int get rpm => $_getIZ(2);
  @$pb.TagNumber(3)
  set rpm($core.int value) => $_setSignedInt32(2, value);
  @$pb.TagNumber(3)
  $core.bool hasRpm() => $_has(2);
  @$pb.TagNumber(3)
  void clearRpm() => $_clearField(3);

  @$pb.TagNumber(4)
  $core.int get speed => $_getIZ(3);
  @$pb.TagNumber(4)
  set speed($core.int value) => $_setSignedInt32(3, value);
  @$pb.TagNumber(4)
  $core.bool hasSpeed() => $_has(3);
  @$pb.TagNumber(4)
  void clearSpeed() => $_clearField(4);

  @$pb.TagNumber(5)
  $core.double get throttlePosition => $_getN(4);
  @$pb.TagNumber(5)
  set throttlePosition($core.double value) => $_setDouble(4, value);
  @$pb.TagNumber(5)
  $core.bool hasThrottlePosition() => $_has(4);
  @$pb.TagNumber(5)
  void clearThrottlePosition() => $_clearField(5);

  @$pb.TagNumber(6)
  $core.int get coolantTemp => $_getIZ(5);
  @$pb.TagNumber(6)
  set coolantTemp($core.int value) => $_setSignedInt32(5, value);
  @$pb.TagNumber(6)
  $core.bool hasCoolantTemp() => $_has(5);
  @$pb.TagNumber(6)
  void clearCoolantTemp() => $_clearField(6);

  @$pb.TagNumber(7)
  $core.double get fuelRate => $_getN(6);
  @$pb.TagNumber(7)
  set fuelRate($core.double value) => $_setDouble(6, value);
  @$pb.TagNumber(7)
  $core.bool hasFuelRate() => $_has(6);
  @$pb.TagNumber(7)
  void clearFuelRate() => $_clearField(7);

  @$pb.TagNumber(8)
  $core.double get odometer => $_getN(7);
  @$pb.TagNumber(8)
  set odometer($core.double value) => $_setDouble(7, value);
  @$pb.TagNumber(8)
  $core.bool hasOdometer() => $_has(7);
  @$pb.TagNumber(8)
  void clearOdometer() => $_clearField(8);

  @$pb.TagNumber(9)
  $core.double get engineExhaustFlow => $_getN(8);
  @$pb.TagNumber(9)
  set engineExhaustFlow($core.double value) => $_setDouble(8, value);
  @$pb.TagNumber(9)
  $core.bool hasEngineExhaustFlow() => $_has(8);
  @$pb.TagNumber(9)
  void clearEngineExhaustFlow() => $_clearField(9);

  @$pb.TagNumber(10)
  $core.double get fuelTankLevel => $_getN(9);
  @$pb.TagNumber(10)
  set fuelTankLevel($core.double value) => $_setDouble(9, value);
  @$pb.TagNumber(10)
  $core.bool hasFuelTankLevel() => $_has(9);
  @$pb.TagNumber(10)
  void clearFuelTankLevel() => $_clearField(10);

  @$pb.TagNumber(11)
  $core.double get latitude => $_getN(10);
  @$pb.TagNumber(11)
  set latitude($core.double value) => $_setDouble(10, value);
  @$pb.TagNumber(11)
  $core.bool hasLatitude() => $_has(10);
  @$pb.TagNumber(11)
  void clearLatitude() => $_clearField(11);

  @$pb.TagNumber(12)
  $core.double get longitude => $_getN(11);
  @$pb.TagNumber(12)
  set longitude($core.double value) => $_setDouble(11, value);
  @$pb.TagNumber(12)
  $core.bool hasLongitude() => $_has(11);
  @$pb.TagNumber(12)
  void clearLongitude() => $_clearField(12);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
