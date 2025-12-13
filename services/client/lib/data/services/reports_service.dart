import '../../core/api/api_client.dart';
import '../models/reports_dto.dart';
import '../../core/constants/api_constants.dart';

class ReportsService {
  final _api = ApiClient();

  Future<SessionsCounterDto> getUserSessionsCounter() async {
    print("Fetching user sessions counter");
    try {
      final responseJson = await _api.get<Map<String, dynamic>>(
        ApiConstants.userSessionsCounterEndpoint,
      );
      final responseDto = SessionsCounterDto.fromJson(responseJson);
      return responseDto;
    } catch (e) {
      print("Errore fetch user sessions counter: $e");
      return SessionsCounterDto(numeroSessioni: 0);
    }
  }
}
