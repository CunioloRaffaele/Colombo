import '../../core/api/api_client.dart';

class HealthService {
  final _api = ApiClient();

  Future<bool> isBackendOnline() async {
    try {
      // if the ping is successful, the backend is online
      final response = await _api.get('ping');
      print('Backend is online: ${response.toString()}');
      return true;
    } catch (_) {
      return false;
    }
  }
}