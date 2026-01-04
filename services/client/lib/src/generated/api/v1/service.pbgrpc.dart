// This is a generated file - do not edit.
//
// Generated from api/v1/service.proto.

// @dart = 3.3

// ignore_for_file: annotate_overrides, camel_case_types, comment_references
// ignore_for_file: constant_identifier_names
// ignore_for_file: curly_braces_in_flow_control_structures
// ignore_for_file: deprecated_member_use_from_same_package, library_prefixes
// ignore_for_file: non_constant_identifier_names, prefer_relative_imports

import 'dart:async' as $async;
import 'dart:core' as $core;

import 'package:grpc/service_api.dart' as $grpc;
import 'package:protobuf/protobuf.dart' as $pb;

import '../../common/types.pb.dart' as $0;

export 'service.pb.dart';

@$pb.GrpcServiceName('colombo.api.v1.TelemetryService')
class TelemetryServiceClient extends $grpc.Client {
  /// The hostname for this service.
  static const $core.String defaultHost = '';

  /// OAuth scopes needed for the client.
  static const $core.List<$core.String> oauthScopes = [
    '',
  ];

  TelemetryServiceClient(super.channel, {super.options, super.interceptors});

  /// Invia un batch di rilevazioni telemetriche.
  /// REST Mapping: POST /telemetry/sessions/{id}/readings
  /// Body: TelemetryBatchRequest (serializzato in protobuf)
  $grpc.ResponseFuture<$0.TelemetryResponse> sendReadings(
    $0.TelemetryBatchRequest request, {
    $grpc.CallOptions? options,
  }) {
    return $createUnaryCall(_$sendReadings, request, options: options);
  }

  // method descriptors

  static final _$sendReadings =
      $grpc.ClientMethod<$0.TelemetryBatchRequest, $0.TelemetryResponse>(
          '/colombo.api.v1.TelemetryService/SendReadings',
          ($0.TelemetryBatchRequest value) => value.writeToBuffer(),
          $0.TelemetryResponse.fromBuffer);
}

@$pb.GrpcServiceName('colombo.api.v1.TelemetryService')
abstract class TelemetryServiceBase extends $grpc.Service {
  $core.String get $name => 'colombo.api.v1.TelemetryService';

  TelemetryServiceBase() {
    $addMethod(
        $grpc.ServiceMethod<$0.TelemetryBatchRequest, $0.TelemetryResponse>(
            'SendReadings',
            sendReadings_Pre,
            false,
            false,
            ($core.List<$core.int> value) =>
                $0.TelemetryBatchRequest.fromBuffer(value),
            ($0.TelemetryResponse value) => value.writeToBuffer()));
  }

  $async.Future<$0.TelemetryResponse> sendReadings_Pre($grpc.ServiceCall $call,
      $async.Future<$0.TelemetryBatchRequest> $request) async {
    return sendReadings($call, await $request);
  }

  $async.Future<$0.TelemetryResponse> sendReadings(
      $grpc.ServiceCall call, $0.TelemetryBatchRequest request);
}
