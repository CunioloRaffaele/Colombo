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
      throw Exception("Errore fetch user sessions counter: $e");
    }
  }

  Future<GlobalEcoStatsDto> getUserGlobalEcoStats() async {
    print("Fetching user global eco stats");
    try {
      final responseJson = await _api.get<Map<String, dynamic>>(
        ApiConstants.userGlobalEcoStatsEndpoint,
      );
      final responseDto = GlobalEcoStatsDto.fromJson(responseJson);
      return responseDto;
    } catch (e) {
      throw Exception("Errore fetch user global eco stats: $e");
    }
  }

  Future<MonthlyEcoStatsDto> getUserMonthlyEcoStats(int year, int month) async {
    print("Fetching user monthly eco stats for $month/$year");
    try {
      final endpoint = ApiConstants.userMonthlyEcoStatsEndpoint(year, month);
      final responseJson = await _api.get<Map<String, dynamic>>(endpoint);
      final responseDto = MonthlyEcoStatsDto.fromJson(responseJson);
      return responseDto;
    } catch (e) {
      throw Exception("Errore fetch user monthly eco stats: $e");
    }
  }

  Future<SessionDetailsDto> getSessionDetails(int sessionId) async {
    print("Fetching session details for session $sessionId");
    try {
      final endpoint = ApiConstants.sessionDetailsEndpoint(sessionId);
      final responseJson = await _api.get<Map<String, dynamic>>(endpoint);
      final responseDto = SessionDetailsDto.fromJson(responseJson);
      return responseDto;
    } catch (e) {
      throw Exception("Errore fetch session details: $e");
    }
  }

  Future<SessionSummaryDto> getSessionSummary(int sessionId) async {
    print("Fetching session summary for session $sessionId");
    try {
      final endpoint = ApiConstants.sessionSummaryEndpoint(sessionId);
      final responseJson = await _api.get<Map<String, dynamic>>(endpoint);
      final responseDto = SessionSummaryDto.fromJson(responseJson);
      return responseDto;
    } catch (e) {
      throw Exception("Errore fetch session summary: $e");
    }
  }
}
