import 'package:colombo/ui/features/auth/view/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'ui/features/error_page.dart';
import 'data/services/auth_service.dart';
import 'data/services/health_service.dart';
import 'ui/features/main_layout.dart';
import 'package:colombo/ui/widgets/loading_overlay.dart';

final navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );

  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

  bool online = false;
  for (int i = 0; i < 5; i++) {
    try {
      online = await HealthService().isBackendOnline();
      if (online) {
        break;
      }
    } catch (e) {
      debugPrint("Tentativo connessione $i fallito: $e");
    }
    if (i < 4) await Future.delayed(const Duration(seconds: 1));
  }
  final loggedIn = await AuthService().isLoggedIn();
  await AuthService()
      .init(); // This is needed and initializes the token in ApiClient
  // All Dio requests will have the token after this call
  runApp(MyApp(initialOnline: online, initialLoggedIn: loggedIn));
}

class MyApp extends StatelessWidget {
  final bool initialOnline;
  final bool initialLoggedIn;
  const MyApp({
    super.key,
    required this.initialOnline,
    required this.initialLoggedIn,
  });
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      navigatorKey: navigatorKey,
      title: 'Green Drive',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
      ),
      // Use the LoadingOverlay to wrap the entire app
      builder: (context, child) {
        return LoadingOverlay(child: child ?? const SizedBox.shrink());
      },
      home: !initialOnline
          ? const ServerErrorPage()
          : (initialLoggedIn ? const MainLayout() : const LoginPage()),
    );
  }
}
