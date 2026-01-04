// This is a generated file - do not edit.
//
// Generated from common/types.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:core' as $core;

import 'package:protobuf/protobuf.dart' as $pb;
import 'package:protobuf/well_known_types/google/protobuf/timestamp.pb.dart'
    as $0;

export 'package:protobuf/protobuf.dart' show GeneratedMessageGenericExtensions;

/// Rappresenta una singola lettura istantanea dai sensori
class TelemetryReading extends $pb.GeneratedMessage {
  factory TelemetryReading({
    $0.Timestamp? timestamp,
    $core.double? latitude,
    $core.double? longitude,
    $core.int? rpm,
    $core.int? speed,
    $core.double? throttlePosition,
    $core.int? coolantTemp,
    $core.double? fuelRate,
    $core.double? odometer,
    $core.double? engineExhaustFlow,
    $core.double? fuelTankLevel,
  }) {
    final result = create();
    if (timestamp != null) result.timestamp = timestamp;
    if (latitude != null) result.latitude = latitude;
    if (longitude != null) result.longitude = longitude;
    if (rpm != null) result.rpm = rpm;
    if (speed != null) result.speed = speed;
    if (throttlePosition != null) result.throttlePosition = throttlePosition;
    if (coolantTemp != null) result.coolantTemp = coolantTemp;
    if (fuelRate != null) result.fuelRate = fuelRate;
    if (odometer != null) result.odometer = odometer;
    if (engineExhaustFlow != null) result.engineExhaustFlow = engineExhaustFlow;
    if (fuelTankLevel != null) result.fuelTankLevel = fuelTankLevel;
    return result;
  }

  TelemetryReading._();

  factory TelemetryReading.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromBuffer(data, registry);
  factory TelemetryReading.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'TelemetryReading',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'colombo.common'),
      createEmptyInstance: create)
    ..aOM<$0.Timestamp>(1, _omitFieldNames ? '' : 'timestamp',
        subBuilder: $0.Timestamp.create)
    ..aD(2, _omitFieldNames ? '' : 'latitude')
    ..aD(3, _omitFieldNames ? '' : 'longitude')
    ..aI(4, _omitFieldNames ? '' : 'rpm')
    ..aI(5, _omitFieldNames ? '' : 'speed')
    ..aD(6, _omitFieldNames ? '' : 'throttlePosition',
        fieldType: $pb.PbFieldType.OF)
    ..aI(7, _omitFieldNames ? '' : 'coolantTemp')
    ..aD(8, _omitFieldNames ? '' : 'fuelRate', fieldType: $pb.PbFieldType.OF)
    ..aD(9, _omitFieldNames ? '' : 'odometer')
    ..aD(10, _omitFieldNames ? '' : 'engineExhaustFlow',
        fieldType: $pb.PbFieldType.OF)
    ..aD(11, _omitFieldNames ? '' : 'fuelTankLevel',
        fieldType: $pb.PbFieldType.OF)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryReading clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryReading copyWith(void Function(TelemetryReading) updates) =>
      super.copyWith((message) => updates(message as TelemetryReading))
          as TelemetryReading;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static TelemetryReading create() => TelemetryReading._();
  @$core.override
  TelemetryReading createEmptyInstance() => create();
  @$core.pragma('dart2js:noInline')
  static TelemetryReading getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<TelemetryReading>(create);
  static TelemetryReading? _defaultInstance;

  /// Metadati temporali e spaziali
  @$pb.TagNumber(1)
  $0.Timestamp get timestamp => $_getN(0);
  @$pb.TagNumber(1)
  set timestamp($0.Timestamp value) => $_setField(1, value);
  @$pb.TagNumber(1)
  $core.bool hasTimestamp() => $_has(0);
  @$pb.TagNumber(1)
  void clearTimestamp() => $_clearField(1);
  @$pb.TagNumber(1)
  $0.Timestamp ensureTimestamp() => $_ensure(0);

  @$pb.TagNumber(2)
  $core.double get latitude => $_getN(1);
  @$pb.TagNumber(2)
  set latitude($core.double value) => $_setDouble(1, value);
  @$pb.TagNumber(2)
  $core.bool hasLatitude() => $_has(1);
  @$pb.TagNumber(2)
  void clearLatitude() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.double get longitude => $_getN(2);
  @$pb.TagNumber(3)
  set longitude($core.double value) => $_setDouble(2, value);
  @$pb.TagNumber(3)
  $core.bool hasLongitude() => $_has(2);
  @$pb.TagNumber(3)
  void clearLongitude() => $_clearField(3);

  /// Da driver.rpm() -> int
  @$pb.TagNumber(4)
  $core.int get rpm => $_getIZ(3);
  @$pb.TagNumber(4)
  set rpm($core.int value) => $_setSignedInt32(3, value);
  @$pb.TagNumber(4)
  $core.bool hasRpm() => $_has(3);
  @$pb.TagNumber(4)
  void clearRpm() => $_clearField(4);

  /// Da driver.speed() -> int
  @$pb.TagNumber(5)
  $core.int get speed => $_getIZ(4);
  @$pb.TagNumber(5)
  set speed($core.int value) => $_setSignedInt32(4, value);
  @$pb.TagNumber(5)
  $core.bool hasSpeed() => $_has(4);
  @$pb.TagNumber(5)
  void clearSpeed() => $_clearField(5);

  /// Da driver.throttlePosition() -> double (0-100%)
  @$pb.TagNumber(6)
  $core.double get throttlePosition => $_getN(5);
  @$pb.TagNumber(6)
  set throttlePosition($core.double value) => $_setFloat(5, value);
  @$pb.TagNumber(6)
  $core.bool hasThrottlePosition() => $_has(5);
  @$pb.TagNumber(6)
  void clearThrottlePosition() => $_clearField(6);

  /// Da driver.coolantTemp() -> int
  @$pb.TagNumber(7)
  $core.int get coolantTemp => $_getIZ(6);
  @$pb.TagNumber(7)
  set coolantTemp($core.int value) => $_setSignedInt32(6, value);
  @$pb.TagNumber(7)
  $core.bool hasCoolantTemp() => $_has(6);
  @$pb.TagNumber(7)
  void clearCoolantTemp() => $_clearField(7);

  /// Da driver.fuelRate() -> double (L/h)
  @$pb.TagNumber(8)
  $core.double get fuelRate => $_getN(7);
  @$pb.TagNumber(8)
  set fuelRate($core.double value) => $_setFloat(7, value);
  @$pb.TagNumber(8)
  $core.bool hasFuelRate() => $_has(7);
  @$pb.TagNumber(8)
  void clearFuelRate() => $_clearField(8);

  /// Da driver.odometer() -> double (km)
  @$pb.TagNumber(9)
  $core.double get odometer => $_getN(8);
  @$pb.TagNumber(9)
  set odometer($core.double value) => $_setDouble(8, value);
  @$pb.TagNumber(9)
  $core.bool hasOdometer() => $_has(8);
  @$pb.TagNumber(9)
  void clearOdometer() => $_clearField(9);

  /// Da driver.engineExhaustFlow() -> double (g/s)
  @$pb.TagNumber(10)
  $core.double get engineExhaustFlow => $_getN(9);
  @$pb.TagNumber(10)
  set engineExhaustFlow($core.double value) => $_setFloat(9, value);
  @$pb.TagNumber(10)
  $core.bool hasEngineExhaustFlow() => $_has(9);
  @$pb.TagNumber(10)
  void clearEngineExhaustFlow() => $_clearField(10);

  /// Da driver.fuelTankLevel() -> double (0-100%)
  @$pb.TagNumber(11)
  $core.double get fuelTankLevel => $_getN(10);
  @$pb.TagNumber(11)
  set fuelTankLevel($core.double value) => $_setFloat(10, value);
  @$pb.TagNumber(11)
  $core.bool hasFuelTankLevel() => $_has(10);
  @$pb.TagNumber(11)
  void clearFuelTankLevel() => $_clearField(11);
}

/// Messaggio per inviare un blocco di letture (Batch)
class TelemetryBatchRequest extends $pb.GeneratedMessage {
  factory TelemetryBatchRequest({
    $core.int? sessionId,
    $core.Iterable<TelemetryReading>? readings,
  }) {
    final result = create();
    if (sessionId != null) result.sessionId = sessionId;
    if (readings != null) result.readings.addAll(readings);
    return result;
  }

  TelemetryBatchRequest._();

  factory TelemetryBatchRequest.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromBuffer(data, registry);
  factory TelemetryBatchRequest.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'TelemetryBatchRequest',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'colombo.common'),
      createEmptyInstance: create)
    ..aI(1, _omitFieldNames ? '' : 'sessionId')
    ..pPM<TelemetryReading>(2, _omitFieldNames ? '' : 'readings',
        subBuilder: TelemetryReading.create)
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryBatchRequest clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryBatchRequest copyWith(
          void Function(TelemetryBatchRequest) updates) =>
      super.copyWith((message) => updates(message as TelemetryBatchRequest))
          as TelemetryBatchRequest;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static TelemetryBatchRequest create() => TelemetryBatchRequest._();
  @$core.override
  TelemetryBatchRequest createEmptyInstance() => create();
  @$core.pragma('dart2js:noInline')
  static TelemetryBatchRequest getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<TelemetryBatchRequest>(create);
  static TelemetryBatchRequest? _defaultInstance;

  /// L'ID della sessione potrebbe essere passato nell'URL REST,
  /// ma averlo qui può essere utile per ridondanza o gRPC puro.
  @$pb.TagNumber(1)
  $core.int get sessionId => $_getIZ(0);
  @$pb.TagNumber(1)
  set sessionId($core.int value) => $_setSignedInt32(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSessionId() => $_has(0);
  @$pb.TagNumber(1)
  void clearSessionId() => $_clearField(1);

  @$pb.TagNumber(2)
  $pb.PbList<TelemetryReading> get readings => $_getList(1);
}

/// Risposta del server dopo il salvataggio
class TelemetryResponse extends $pb.GeneratedMessage {
  factory TelemetryResponse({
    $core.bool? success,
    $core.String? message,
    $core.int? readingsProcessed,
  }) {
    final result = create();
    if (success != null) result.success = success;
    if (message != null) result.message = message;
    if (readingsProcessed != null) result.readingsProcessed = readingsProcessed;
    return result;
  }

  TelemetryResponse._();

  factory TelemetryResponse.fromBuffer($core.List<$core.int> data,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromBuffer(data, registry);
  factory TelemetryResponse.fromJson($core.String json,
          [$pb.ExtensionRegistry registry = $pb.ExtensionRegistry.EMPTY]) =>
      create()..mergeFromJson(json, registry);

  static final $pb.BuilderInfo _i = $pb.BuilderInfo(
      _omitMessageNames ? '' : 'TelemetryResponse',
      package: const $pb.PackageName(_omitMessageNames ? '' : 'colombo.common'),
      createEmptyInstance: create)
    ..aOB(1, _omitFieldNames ? '' : 'success')
    ..aOS(2, _omitFieldNames ? '' : 'message')
    ..aI(3, _omitFieldNames ? '' : 'readingsProcessed')
    ..hasRequiredFields = false;

  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryResponse clone() => deepCopy();
  @$core.Deprecated('See https://github.com/google/protobuf.dart/issues/998.')
  TelemetryResponse copyWith(void Function(TelemetryResponse) updates) =>
      super.copyWith((message) => updates(message as TelemetryResponse))
          as TelemetryResponse;

  @$core.override
  $pb.BuilderInfo get info_ => _i;

  @$core.pragma('dart2js:noInline')
  static TelemetryResponse create() => TelemetryResponse._();
  @$core.override
  TelemetryResponse createEmptyInstance() => create();
  @$core.pragma('dart2js:noInline')
  static TelemetryResponse getDefault() => _defaultInstance ??=
      $pb.GeneratedMessage.$_defaultFor<TelemetryResponse>(create);
  static TelemetryResponse? _defaultInstance;

  @$pb.TagNumber(1)
  $core.bool get success => $_getBF(0);
  @$pb.TagNumber(1)
  set success($core.bool value) => $_setBool(0, value);
  @$pb.TagNumber(1)
  $core.bool hasSuccess() => $_has(0);
  @$pb.TagNumber(1)
  void clearSuccess() => $_clearField(1);

  @$pb.TagNumber(2)
  $core.String get message => $_getSZ(1);
  @$pb.TagNumber(2)
  set message($core.String value) => $_setString(1, value);
  @$pb.TagNumber(2)
  $core.bool hasMessage() => $_has(1);
  @$pb.TagNumber(2)
  void clearMessage() => $_clearField(2);

  @$pb.TagNumber(3)
  $core.int get readingsProcessed => $_getIZ(2);
  @$pb.TagNumber(3)
  set readingsProcessed($core.int value) => $_setSignedInt32(2, value);
  @$pb.TagNumber(3)
  $core.bool hasReadingsProcessed() => $_has(2);
  @$pb.TagNumber(3)
  void clearReadingsProcessed() => $_clearField(3);
}

const $core.bool _omitFieldNames =
    $core.bool.fromEnvironment('protobuf.omit_field_names');
const $core.bool _omitMessageNames =
    $core.bool.fromEnvironment('protobuf.omit_message_names');
