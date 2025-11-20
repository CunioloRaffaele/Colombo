import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import '../models/login_request_dto.dart';
import '../models/registration_request_dto.dart';
import '../../core/api/api_client.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class AuthService {
  final _storage = const FlutterSecureStorage();
  final _api = ApiClient(); // singleton

  Future<void> init() async {
    final token = await _storage.read(key: 'jwt_token');
    if (await isLoggedIn()) {
      _api.setAuthToken(token);
      return;
    }
    return;
  }

  Future<void> _saveToken(String token) async {
    await _storage.write(key: 'jwt_token', value: token);
    _api.setAuthToken(token);
  }

  Future<void> _deleteToken() async {
    await _storage.delete(key: 'jwt_token');
    _api.setAuthToken(null);
  }

  Future<bool> register({
    required String nameSurname,
    required String email,
    required String password,
    required DateTime birthDate,
    //required String municipality,
  }) async {
    final req = RegistrationRequestDto(
      nome: nameSurname,
      email: email,
      password: password,
      data_nascita: birthDate,
      //municipality: municipality,
    );
    try {
      await _api.post<Map<String, dynamic>>('auth/user', body: req.toJson());
      return true;
    } catch (e) {
      throw Exception('Errore durante la registrazione: $e');
    }
  }

  Future<bool> login({required String email, required String password}) async {
    final req = LoginRequestDto(email: email, password: password);
    try {
      final data = await _api.post<Map<String, dynamic>>(
        'auth/login/user',
        body: req.toJson(),
      );
      final token = data['token'] as String?;
      if (token != null) {
        await _saveToken(token);
        return true;
      }
      return false;
    } catch (e) {
      throw Exception('Errore durante il login: $e');
    }
  }

  Future<void> logout() => _deleteToken();

  Future<bool> isLoggedIn() async {
    final t = await _storage.read(key: 'jwt_token');
    if (t == null || t.isEmpty) {
      return false;
    }
    if (JwtDecoder.isExpired(t)) {
      await _deleteToken();
      return false;
    }
    return true;
  }

  Future<String?> getToken() => _storage.read(key: 'jwt_token');
}
