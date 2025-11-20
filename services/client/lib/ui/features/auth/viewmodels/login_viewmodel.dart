import '../../../../data/services/auth_service.dart';

class LoginViewModel {
  final AuthService _authService = AuthService();

  Future<String?> login({
    required String email,
    required String password,
  }) async {
    if (email.isEmpty || password.isEmpty) {
      return 'Compila tutti i campi.';
    }

    try {
      await _authService.login(email: email, password: password);
      return null; // No errors
    } catch (e) {
      return e.toString(); // Return the error message
    }
  }
}
