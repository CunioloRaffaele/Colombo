class ApiConstants {
  static const String baseUrl = 'https://greendrive.duckdns.org/api/v1/';

  static const String loginEndpoint = 'auth/login/user';
  static const String registerEndpoint = 'auth/user';
  static const String deleteAccountEndpoint = 'auth/user';
  static const String userInfoEndpoint = 'auth/user';
  static const String searchMunicipalitiesEndpoint = 'auth/comuni/search';
  static const String retriveCarListEndpoint = 'vehicles/cars';
  static String carDetailsEndpoint(String vin) => 'vehicles/car/details/$vin';

  static const int timeoutSeconds = 10;
}

class DocumentsApiConstants {
  static const String termsOfServiceUrl =
      'https://raw.githubusercontent.com/CunioloRaffaele/Colombo/refs/heads/main/docs/TERMS_AND_CONDITIONS.md';
  static const String privacyPolicyUrl =
      'https://raw.githubusercontent.com/CunioloRaffaele/Colombo/refs/heads/main/docs/PRIVACY_POLICY.md';
}
