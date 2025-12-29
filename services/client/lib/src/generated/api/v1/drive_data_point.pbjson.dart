// This is a generated file - do not edit.
//
// Generated from api/v1/drive_data_point.proto.

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
    {'1': 'timestamp_unix', '3': 1, '4': 1, '5': 3, '10': 'timestampUnix'},
    {'1': 'rpm_available', '3': 2, '4': 1, '5': 8, '10': 'rpmAvailable'},
    {'1': 'rpm', '3': 3, '4': 1, '5': 5, '10': 'rpm'},
    {'1': 'speed_available', '3': 4, '4': 1, '5': 8, '10': 'speedAvailable'},
    {'1': 'speed', '3': 5, '4': 1, '5': 5, '10': 'speed'},
    {
      '1': 'throttle_position_available',
      '3': 6,
      '4': 1,
      '5': 8,
      '10': 'throttlePositionAvailable'
    },
    {
      '1': 'throttle_position',
      '3': 7,
      '4': 1,
      '5': 1,
      '10': 'throttlePosition'
    },
    {
      '1': 'coolant_temp_available',
      '3': 8,
      '4': 1,
      '5': 8,
      '10': 'coolantTempAvailable'
    },
    {'1': 'coolant_temp', '3': 9, '4': 1, '5': 5, '10': 'coolantTemp'},
    {
      '1': 'fuel_rate_available',
      '3': 10,
      '4': 1,
      '5': 8,
      '10': 'fuelRateAvailable'
    },
    {'1': 'fuel_rate', '3': 11, '4': 1, '5': 1, '10': 'fuelRate'},
    {
      '1': 'odometer_available',
      '3': 12,
      '4': 1,
      '5': 8,
      '10': 'odometerAvailable'
    },
    {'1': 'odometer', '3': 13, '4': 1, '5': 1, '10': 'odometer'},
    {
      '1': 'engine_exhaust_flow_available',
      '3': 14,
      '4': 1,
      '5': 8,
      '10': 'engineExhaustFlowAvailable'
    },
    {
      '1': 'engine_exhaust_flow',
      '3': 15,
      '4': 1,
      '5': 1,
      '10': 'engineExhaustFlow'
    },
    {
      '1': 'fuel_tank_level_available',
      '3': 16,
      '4': 1,
      '5': 8,
      '10': 'fuelTankLevelAvailable'
    },
    {'1': 'fuel_tank_level', '3': 17, '4': 1, '5': 1, '10': 'fuelTankLevel'},
    {'1': 'latitude', '3': 18, '4': 1, '5': 1, '10': 'latitude'},
    {'1': 'longitude', '3': 19, '4': 1, '5': 1, '10': 'longitude'},
  ],
};

/// Descriptor for `DriveDataPoint`. Decode as a `google.protobuf.DescriptorProto`.
final $typed_data.Uint8List driveDataPointDescriptor = $convert.base64Decode(
    'Cg5Ecml2ZURhdGFQb2ludBIlCg50aW1lc3RhbXBfdW5peBgBIAEoA1INdGltZXN0YW1wVW5peB'
    'IjCg1ycG1fYXZhaWxhYmxlGAIgASgIUgxycG1BdmFpbGFibGUSEAoDcnBtGAMgASgFUgNycG0S'
    'JwoPc3BlZWRfYXZhaWxhYmxlGAQgASgIUg5zcGVlZEF2YWlsYWJsZRIUCgVzcGVlZBgFIAEoBV'
    'IFc3BlZWQSPgobdGhyb3R0bGVfcG9zaXRpb25fYXZhaWxhYmxlGAYgASgIUhl0aHJvdHRsZVBv'
    'c2l0aW9uQXZhaWxhYmxlEisKEXRocm90dGxlX3Bvc2l0aW9uGAcgASgBUhB0aHJvdHRsZVBvc2'
    'l0aW9uEjQKFmNvb2xhbnRfdGVtcF9hdmFpbGFibGUYCCABKAhSFGNvb2xhbnRUZW1wQXZhaWxh'
    'YmxlEiEKDGNvb2xhbnRfdGVtcBgJIAEoBVILY29vbGFudFRlbXASLgoTZnVlbF9yYXRlX2F2YW'
    'lsYWJsZRgKIAEoCFIRZnVlbFJhdGVBdmFpbGFibGUSGwoJZnVlbF9yYXRlGAsgASgBUghmdWVs'
    'UmF0ZRItChJvZG9tZXRlcl9hdmFpbGFibGUYDCABKAhSEW9kb21ldGVyQXZhaWxhYmxlEhoKCG'
    '9kb21ldGVyGA0gASgBUghvZG9tZXRlchJBCh1lbmdpbmVfZXhoYXVzdF9mbG93X2F2YWlsYWJs'
    'ZRgOIAEoCFIaZW5naW5lRXhoYXVzdEZsb3dBdmFpbGFibGUSLgoTZW5naW5lX2V4aGF1c3RfZm'
    'xvdxgPIAEoAVIRZW5naW5lRXhoYXVzdEZsb3cSOQoZZnVlbF90YW5rX2xldmVsX2F2YWlsYWJs'
    'ZRgQIAEoCFIWZnVlbFRhbmtMZXZlbEF2YWlsYWJsZRImCg9mdWVsX3RhbmtfbGV2ZWwYESABKA'
    'FSDWZ1ZWxUYW5rTGV2ZWwSGgoIbGF0aXR1ZGUYEiABKAFSCGxhdGl0dWRlEhwKCWxvbmdpdHVk'
    'ZRgTIAEoAVIJbG9uZ2l0dWRl');
