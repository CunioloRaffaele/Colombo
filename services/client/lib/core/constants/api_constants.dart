class ApiConstants {
  static const String baseUrl = 'https://greendrive.duckdns.org/api/v1/';

  static const String loginEndpoint = 'auth/login/user';
  static const String registerEndpoint = 'auth/user';
  static const String deleteAccountEndpoint = 'auth/user';
  static const String userInfoEndpoint = 'auth/user';

  static const String searchMunicipalitiesEndpoint = 'auth/comuni/search';
  static String getMunicipalityNameEndpoint(String istat) =>
      'auth/comune/$istat';
  static String getMunicipalityPoligonsEndpoint(int istat) =>
      'zones/map/$istat';

  static const String retriveCarListEndpoint = 'vehicles/cars';
  static String carDetailsEndpoint(String vin) => 'vehicles/car/details/$vin';

  static const String userSessionsCounterEndpoint = 'reports/user/sessions';
  static const String userGlobalEcoStatsEndpoint = 'reports/user/summary';
  static String userMonthlyEcoStatsEndpoint(int year, int month) =>
      'reports/user/sessions/$month/$year';

  static const int timeoutSeconds = 10;
}

class DocumentsApiConstants {
  static const String termsOfServiceUrl =
      'https://raw.githubusercontent.com/CunioloRaffaele/Colombo/refs/heads/main/docs/TERMS_AND_CONDITIONS.md';
  static const String privacyPolicyUrl =
      'https://raw.githubusercontent.com/CunioloRaffaele/Colombo/refs/heads/main/docs/PRIVACY_POLICY.md';
  static const String ecoTipsList =
      'https://cdn.jsdelivr.net/gh/CunioloRaffaele/Colombo@main/db/ecoTips.json'; //Used jsDelivr for raw JSON files because GitHub raw URLs have auth issues
}
