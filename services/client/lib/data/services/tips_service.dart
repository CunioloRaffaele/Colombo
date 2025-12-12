import '../../core/api/api_client.dart';
import '../../data/models/eco_tips_dto.dart';
import '../../core/constants/api_constants.dart';

class TipsService {
  final _api = ApiClient();

  Future<List<String>> getEcoTips() async {
    try {
      final responseJson = await _api.get<Map<String, dynamic>>(
        DocumentsApiConstants.ecoTipsList,
      );
      final responseDto = EcoTipsDto.fromJson(responseJson);
      return responseDto.tips;
    } catch (e) {
      print("Errore fetch eco tips: $e");
      throw Exception('Failed to load eco tips');
    }
  }
}
