import '../../core/api/api_client.dart';
import '../models/cars_dto.dart';
import '../../core/constants/api_constants.dart';

class VehicleService {
  final _api = ApiClient();

  Future<List<CarDto>> getUserCars() async {
    print("Fetching user cars");
    try {
      final responseJson = await _api.get<Map<String, dynamic>>(
        ApiConstants.retriveCarListEndpoint,
      );
      final responseDto = CarResponseDto.fromJson(responseJson);
      return responseDto.cars;
    } catch (e) {
      print("Errore fetch auto: $e");
      return [];
    }
  }

  Future<CarDetailsResultDto?> getCarDetails(String vin) async {
    print("Fetching details for car VIN: $vin");
    try {
      final responseJson = await _api.get<Map<String, dynamic>>(
        ApiConstants.carDetailsEndpoint(vin),
      );
      final responseDto = CarDetailsResponseDto.fromJson(responseJson);
      return responseDto.result;
    } catch (e) {
      print("Errore fetch dettagli auto ($vin): $e");
      return null;
    }
  }
}
