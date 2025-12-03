import '../../../../data/services/auth_service.dart';
import '../../../../data/services/municipality_service.dart';

class RegistrationViewModel {
  final AuthService _authService = AuthService();

  Future<int> searchComuni(String query) async {
    if (query.length < 3) return 0; // No less then 3 characters
    try {
      return await MunicipalityService.searchComuni(query);
    } catch (e) {
      return 0;
    }
  }

  Future<String?> register({
    required String nome,
    required String cognome,
    required String email,
    required String password,
    required int residenzaId,
    required bool termsAccepted,
    required bool privacyAccepted,
  }) async {
    if (nome.isEmpty || cognome.isEmpty || email.isEmpty || password.isEmpty) {
      return 'Compila tutti i campi di testo.';
    }

    if (residenzaId == 0) {
      return 'Seleziona un comune valido.';
    }

    if (!termsAccepted || !privacyAccepted) {
      return 'Devi accettare termini e privacy.';
    }

    try {
      // Aggiorna la chiamata al servizio con i nuovi parametri
      await _authService.register(
        nome: nome,
        cognome: cognome,
        email: email,
        password: password,
        municipality: residenzaId,
      );
      return null; // No errors
    } catch (e) {
      return e.toString(); // Return the error message
    }
  }
}
