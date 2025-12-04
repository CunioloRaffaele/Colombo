import 'package:dio/dio.dart';
import '../../../core/constants/api_constants.dart';
import 'dio_interceptor.dart';

class ApiException implements Exception {
  final String message;
  final int? status;
  final dynamic data;
  ApiException(this.message, {this.status, this.data});
  @override
  String toString() => 'Errore dal server: ($status) $data';
}

class ApiClient {
  // Singleton pattern
  // Here we create a single shared instance of ApiClient that can be used throughout the app
  // When ApiClient() is called, it always returns the same instance (_instance)
  static final ApiClient _instance = ApiClient._internal();
  factory ApiClient() => _instance;

  late final Dio dio;

  ApiClient._internal() {
    dio = Dio(
      BaseOptions(
        baseUrl: ApiConstants.baseUrl,
        connectTimeout: Duration(seconds: ApiConstants.timeoutSeconds),
        receiveTimeout: Duration(seconds: ApiConstants.timeoutSeconds),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      ),
    );

    dio.interceptors.add(LoadingInterceptor()); // show loading overlay

    dio.interceptors.add(
      LogInterceptor(
        request: true,
        requestBody: true,
        responseHeader: false,
        responseBody: true,
        error: true,
      ),
    );

    dio.interceptors.add(
      InterceptorsWrapper(
        onError: (e, handler) {
          final status = e.response?.statusCode;
          final data = e.response?.data;
          final msg = e.response?.data is Map
              ? (e.response?.data['message']?.toString() ?? e.message)
              : e.message;
          handler.reject(
            DioException(
              requestOptions: e.requestOptions,
              response: e.response,
              type: e.type,
              error: ApiException(
                msg ?? 'Errore di rete',
                status: status,
                data: data,
              ),
            ),
          );
        },
      ),
    );
  }

  void setAuthToken(String? token) {
    if (token == null || token.isEmpty) {
      dio.options.headers.remove('Authorization');
    } else {
      dio.options.headers['Authorization'] = 'Bearer $token';
    }
  }

  Future<T> get<T>(String path, {Map<String, dynamic>? query}) async {
    try {
      final r = await dio.get(path, queryParameters: query);
      return r.data as T;
    } on DioException catch (e) {
      throw (e.error is ApiException)
          ? e.error as ApiException
          : ApiException(
              e.message ?? 'Errore',
              status: e.response?.statusCode,
              data: e.response?.data,
            );
    }
  }

  Future<T> post<T>(String path, {dynamic body}) async {
    try {
      final r = await dio.post(path, data: body);
      return r.data as T;
    } on DioException catch (e) {
      throw (e.error is ApiException)
          ? e.error as ApiException
          : ApiException(
              e.message ?? 'Errore',
              status: e.response?.statusCode,
              data: e.response?.data,
            );
    }
  }

  Future<T> put<T>(String path, {dynamic body}) async {
    try {
      final r = await dio.put(path, data: body);
      return r.data as T;
    } on DioException catch (e) {
      throw (e.error is ApiException)
          ? e.error as ApiException
          : ApiException(
              e.message ?? 'Errore',
              status: e.response?.statusCode,
              data: e.response?.data,
            );
    }
  }

  Future<T> delete<T>(String path) async {
    try {
      final r = await dio.delete(path);
      return r.data as T;
    } on DioException catch (e) {
      throw (e.error is ApiException)
          ? e.error as ApiException
          : ApiException(
              e.message ?? 'Errore',
              status: e.response?.statusCode,
              data: e.response?.data,
            );
    }
  }
}
