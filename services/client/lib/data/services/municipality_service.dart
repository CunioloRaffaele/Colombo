import 'package:colombo/core/constants/api_constants.dart';

import '../../core/api/api_client.dart';

class MunicipalityService {
  // Search for municipalities matching the query
  static Future<int> searchComuni(String query) async {
    final api = ApiClient();
    try {
      final data = await api.get<Map<String, dynamic>>(
        ApiConstants.searchMunicipalitiesEndpoint,
        query: {'query': query},
      );

      if (data.containsKey('response') && data['response'] is List) {
        final list = data['response'] as List<dynamic>;
        if (list.isNotEmpty) {
          return list[0]['id'] as int;
        }
      }

      return 0;
    } catch (e) {
      throw ('Errore durante la ricerca dei comuni: $e');
    }
  }
}
