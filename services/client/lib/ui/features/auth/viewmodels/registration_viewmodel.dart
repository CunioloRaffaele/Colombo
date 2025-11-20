import '../../../../data/services/auth_service.dart';

class RegistrationViewModel {
  final AuthService _authService = AuthService();

  Future<String?> register({
    required String nome,
    required String cognome,
    required String email,
    required String password,
    required String birthDate,
    required bool termsAccepted,
    required bool privacyAccepted,
  }) async {
    if (nome.isEmpty ||
        cognome.isEmpty ||
        email.isEmpty ||
        password.isEmpty ||
        birthDate.isEmpty) {
      return 'Compila tutti i campi.';
    }

    if (!termsAccepted || !privacyAccepted) {
      return 'Devi accettare termini e privacy.';
    }

    try {
      await _authService.register(
        nameSurname: '$nome $cognome',
        email: email,
        password: password,
        birthDate: DateTime.parse(birthDate),
      );
      return null; // No errors
    } catch (e) {
      return e.toString(); // Return the error message
    }
  }
}
