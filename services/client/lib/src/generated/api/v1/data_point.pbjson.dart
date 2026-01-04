// This is a generated file - do not edit.
//
// Generated from api/v1/data_point.proto.

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

@$core.Deprecated('Use driveDataPointDescriptor instead')
const DriveDataPoint$json = {
  '1': 'DriveDataPoint',
  '2': [
    {'1': 'timestamp_unix', '3': 1, '4': 1, '5': 5, '10': 'timestampUnix'},
    {
      '1': 'available_vitals',
      '3': 2,
      '4': 3,
      '5': 11,
      '6': '.api.v1.DriveDataPoint.AvailableVitalsEntry',
      '10': 'availableVitals'
    },
    {'1': 'rpm', '3': 3, '4': 1, '5': 5, '10': 'rpm'},
    {'1': 'speed', '3': 4, '4': 1, '5': 5, '10': 'speed'},
    {
      '1': 'throttle_position',
      '3': 5,
      '4': 1,
      '5': 1,
      '10': 'throttlePosition'
    },
    {'1': 'coolant_temp', '3': 6, '4': 1, '5': 5, '10': 'coolantTemp'},
    {'1': 'fuel_rate', '3': 7, '4': 1, '5': 1, '10': 'fuelRate'},
    {'1': 'odometer', '3': 8, '4': 1, '5': 1, '10': 'odometer'},
    {
      '1': 'engine_exhaust_flow',
      '3': 9,
      '4': 1,
      '5': 1,
      '10': 'engineExhaustFlow'
    },
    {'1': 'fuel_tank_level', '3': 10, '4': 1, '5': 1, '10': 'fuelTankLevel'},
    {'1': 'latitude', '3': 11, '4': 1, '5': 1, '10': 'latitude'},
    {'1': 'longitude', '3': 12, '4': 1, '5': 1, '10': 'longitude'},
  ],
  '3': [DriveDataPoint_AvailableVitalsEntry$json],
};

@$core.Deprecated('Use driveDataPointDescriptor instead')
const DriveDataPoint_AvailableVitalsEntry$json = {
  '1': 'AvailableVitalsEntry',
  '2': [
    {'1': 'key', '3': 1, '4': 1, '5': 9, '10': 'key'},
    {'1': 'value', '3': 2, '4': 1, '5': 8, '10': 'value'},
  ],
  '7': {'7': true},
};

/// Descriptor for `DriveDataPoint`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List driveDataPointDescriptor = $convert.base64Decode(
    'Cg5Ecml2ZURhdGFQb2ludBIlCg50aW1lc3RhbXBfdW5peBgBIAEoBVINdGltZXN0YW1wVW5peB'
    'JWChBhdmFpbGFibGVfdml0YWxzGAIgAygLMisuYXBpLnYxLkRyaXZlRGF0YVBvaW50LkF2YWls'
    'YWJsZVZpdGFsc0VudHJ5Ug9hdmFpbGFibGVWaXRhbHMSEAoDcnBtGAMgASgFUgNycG0SFAoFc3'
    'BlZWQYBCABKAVSBXNwZWVkEisKEXRocm90dGxlX3Bvc2l0aW9uGAUgASgBUhB0aHJvdHRsZVBv'
    'c2l0aW9uEiEKDGNvb2xhbnRfdGVtcBgGIAEoBVILY29vbGFudFRlbXASGwoJZnVlbF9yYXRlGA'
    'cgASgBUghmdWVsUmF0ZRIaCghvZG9tZXRlchgIIAEoAVIIb2RvbWV0ZXISLgoTZW5naW5lX2V4'
    'aGF1c3RfZmxvdxgJIAEoAVIRZW5naW5lRXhoYXVzdEZsb3cSJgoPZnVlbF90YW5rX2xldmVsGA'
    'ogASgBUg1mdWVsVGFua0xldmVsEhoKCGxhdGl0dWRlGAsgASgBUghsYXRpdHVkZRIcCglsb25n'
    'aXR1ZGUYDCABKAFSCWxvbmdpdHVkZRpCChRBdmFpbGFibGVWaXRhbHNFbnRyeRIQCgNrZXkYAS'
    'ABKAlSA2tleRIUCgV2YWx1ZRgCIAEoCFIFdmFsdWU6AjgB');
