import '../../core/api/api_client.dart';
import '../../core/constants/api_constants.dart';

class TelemetryService {
  final _api = ApiClient();

  Future<int> startTelemetrySession(String vin) async {
    print("Starting telemetry session for VIN: $vin");
    try {
      final responseJson = await _api.post<Map<String, dynamic>>(
        ApiConstants.startSessionEndpoint(vin),
      );
      return responseJson['sessionId'] as int;
    } catch (e) {
      throw Exception("Errore fetch user sessions counter: $e");
    }
  }

  Future<bool> endTelemetrySession(int sessionId, double km) async {
    print("Ending telemetry session for session ID: $sessionId");
    try {
      await _api.post<void>(
        ApiConstants.endSessionEndpoint(sessionId),
        body: {"km": km},
      );
      return true;
    } catch (e) {
      throw Exception("Errore ending telemetry session: $e");
    }
  }
}
