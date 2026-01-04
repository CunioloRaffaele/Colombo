// This is a generated file - do not edit.
//
// Generated from common/types.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports
// ignore_for_file: unused_import

import 'dart:convert' as $convert;
import 'dart:core' as $core;
import 'dart:typed_data' as $typed_data;

@$core.Deprecated('Use telemetryReadingDescriptor instead')
const TelemetryReading$json = {
  '1': 'TelemetryReading',
  '2': [
    {
      '1': 'timestamp',
      '3': 1,
      '4': 1,
      '5': 11,
      '6': '.google.protobuf.Timestamp',
      '10': 'timestamp'
    },
    {'1': 'latitude', '3': 2, '4': 1, '5': 1, '10': 'latitude'},
    {'1': 'longitude', '3': 3, '4': 1, '5': 1, '10': 'longitude'},
    {'1': 'rpm', '3': 4, '4': 1, '5': 5, '10': 'rpm'},
    {'1': 'speed', '3': 5, '4': 1, '5': 5, '10': 'speed'},
    {
      '1': 'throttle_position',
      '3': 6,
      '4': 1,
      '5': 2,
      '10': 'throttlePosition'
    },
    {'1': 'coolant_temp', '3': 7, '4': 1, '5': 5, '10': 'coolantTemp'},
    {'1': 'fuel_rate', '3': 8, '4': 1, '5': 2, '10': 'fuelRate'},
    {'1': 'odometer', '3': 9, '4': 1, '5': 1, '10': 'odometer'},
    {
      '1': 'engine_exhaust_flow',
      '3': 10,
      '4': 1,
      '5': 2,
      '10': 'engineExhaustFlow'
    },
    {'1': 'fuel_tank_level', '3': 11, '4': 1, '5': 2, '10': 'fuelTankLevel'},
  ],
};

/// Descriptor for `TelemetryReading`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List telemetryReadingDescriptor = $convert.base64Decode(
    'ChBUZWxlbWV0cnlSZWFkaW5nEjgKCXRpbWVzdGFtcBgBIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi'
    '5UaW1lc3RhbXBSCXRpbWVzdGFtcBIaCghsYXRpdHVkZRgCIAEoAVIIbGF0aXR1ZGUSHAoJbG9u'
    'Z2l0dWRlGAMgASgBUglsb25naXR1ZGUSEAoDcnBtGAQgASgFUgNycG0SFAoFc3BlZWQYBSABKA'
    'VSBXNwZWVkEisKEXRocm90dGxlX3Bvc2l0aW9uGAYgASgCUhB0aHJvdHRsZVBvc2l0aW9uEiEK'
    'DGNvb2xhbnRfdGVtcBgHIAEoBVILY29vbGFudFRlbXASGwoJZnVlbF9yYXRlGAggASgCUghmdW'
    'VsUmF0ZRIaCghvZG9tZXRlchgJIAEoAVIIb2RvbWV0ZXISLgoTZW5naW5lX2V4aGF1c3RfZmxv'
    'dxgKIAEoAlIRZW5naW5lRXhoYXVzdEZsb3cSJgoPZnVlbF90YW5rX2xldmVsGAsgASgCUg1mdW'
    'VsVGFua0xldmVs');

@$core.Deprecated('Use telemetryBatchRequestDescriptor instead')
const TelemetryBatchRequest$json = {
  '1': 'TelemetryBatchRequest',
  '2': [
    {'1': 'session_id', '3': 1, '4': 1, '5': 5, '10': 'sessionId'},
    {
      '1': 'readings',
      '3': 2,
      '4': 3,
      '5': 11,
      '6': '.colombo.common.TelemetryReading',
      '10': 'readings'
    },
  ],
};

/// Descriptor for `TelemetryBatchRequest`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List telemetryBatchRequestDescriptor = $convert.base64Decode(
    'ChVUZWxlbWV0cnlCYXRjaFJlcXVlc3QSHQoKc2Vzc2lvbl9pZBgBIAEoBVIJc2Vzc2lvbklkEj'
    'wKCHJlYWRpbmdzGAIgAygLMiAuY29sb21iby5jb21tb24uVGVsZW1ldHJ5UmVhZGluZ1IIcmVh'
    'ZGluZ3M=');

@$core.Deprecated('Use telemetryResponseDescriptor instead')
const TelemetryResponse$json = {
  '1': 'TelemetryResponse',
  '2': [
    {'1': 'success', '3': 1, '4': 1, '5': 8, '10': 'success'},
    {'1': 'message', '3': 2, '4': 1, '5': 9, '10': 'message'},
    {
      '1': 'readings_processed',
      '3': 3,
      '4': 1,
      '5': 5,
      '10': 'readingsProcessed'
    },
  ],
};

/// Descriptor for `TelemetryResponse`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List telemetryResponseDescriptor = $convert.base64Decode(
    'ChFUZWxlbWV0cnlSZXNwb25zZRIYCgdzdWNjZXNzGAEgASgIUgdzdWNjZXNzEhgKB21lc3NhZ2'
    'UYAiABKAlSB21lc3NhZ2USLQoScmVhZGluZ3NfcHJvY2Vzc2VkGAMgASgFUhFyZWFkaW5nc1By'
    'b2Nlc3NlZA==');
