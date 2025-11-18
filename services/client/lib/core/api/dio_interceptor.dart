import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import '../../ui/widgets/loading_overlay.dart'; // ValueNotifier
import '../../ui/widgets/notification_overlay.dart';

class LoadingInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    // Check if the loader is not disabled for this request
    if (options.extra['disableLoader'] != true) {
      // Increment the count of active requests.
      loadingRequestCount.value++;
    }
    super.onRequest(options, handler);
  }

  @override
  void onResponse(Response response, ResponseInterceptorHandler handler) {
    if (response.requestOptions.extra['disableLoader'] != true) {
      // Decrement the count when the request succeeds.
      if (loadingRequestCount.value > 0) {
        loadingRequestCount.value--;
      }
    }
    super.onResponse(response, handler);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    if (err.requestOptions.extra['disableLoader'] != true) {
      // Decrement the count when the request fails.
      if (loadingRequestCount.value > 0) {
        loadingRequestCount.value--;
      }
      NotificationOverlay.show('Errore durante la richiesta al server.', Colors.redAccent);
    }
    super.onError(err, handler);
  }
}
