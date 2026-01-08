import 'package:colombo/core/constants/api_constants.dart';
import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:colombo/data/models/drive_data_point_dto.dart';
import 'package:colombo/core/api/api_client.dart';
import 'package:colombo/data/proto/api/v1/data_point.pb.dart' as proto;

class TelemetryApi {
  // Ottiene l'istanza singleton di Dio configurata
  final Dio _dio = ApiClient().dio;

  /// Invia un batch di punti dati serializzati come Protobuf
  Future<void> uploadSessionData(
    List<DriveDataPoint> points,
    int sessionId,
  ) async {
    if (points.isEmpty) return;

    // 1. Converti i DTO in Proto
    final protoArray = proto.DriveDataPointArray();
    for (var p in points) {
      protoArray.dataPoints.add(_mapToProto(p));
    }

    // 2. Serializza in binario
    final Uint8List bodyBytes = protoArray.writeToBuffer();

    // 3. Invia come octet-stream
    try {
      await _dio.post(
        ApiConstants.sendTelemetryDataEndpoint(sessionId),
        data: bodyBytes,
        options: Options(
          contentType: 'application/octet-stream',
          headers: {'Content-Length': bodyBytes.length.toString()},
        ),
      );

      debugPrint('TelemetryApi: Uploaded ${points.length} points.');
    } catch (e) {
      debugPrint('TelemetryApi Error: $e');
      rethrow;
    }
  }

  // Helper mapping function
  proto.DriveDataPoint _mapToProto(DriveDataPoint dto) {
    final p = proto.DriveDataPoint()
      // CONVERTITO IN SECONDI (int32 non supporta millisecondi)
      ..timestampUnix = dto.timestampUnix ~/ 1000
      ..rpm = dto.rpm
      ..speed = dto.speed
      ..throttlePosition = dto.throttlePosition
      ..coolantTemp = dto.coolantTemp
      ..fuelRate = dto.fuelRate
      ..odometer = dto.odometer
      ..engineExhaustFlow = dto.engineExhaustFlow
      ..fuelTankLevel = dto.fuelTankLevel
      ..latitude = dto.latitude
      ..longitude = dto.longitude;

    p.availableVitals.addAll({
      'rpm': dto.rpmAvailable,
      'speed': dto.speedAvailable,
      'throttlePosition': dto.throttlePositionAvailable,
      'coolantTemp': dto.coolantTempAvailable,
      'fuelRate': dto.fuelRateAvailable,
      'odometer': dto.odometerAvailable,
      'engineExhaustFlow': dto.engineExhaustFlowAvailable,
      'fuelTankLevel': dto.fuelTankLevelAvailable,
    });

    return p;
  }
}
