import 'package:colombo/ui/features/auth/view/login.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import 'ui/features/sensors_debug.dart';
import 'ui/features/auth/view/login.dart';
import 'ui/features/error_page.dart';
import 'data/services/auth_service.dart';
import 'data/services/health_service.dart';
import 'ui/features/home.dart';
import 'package:colombo/ui/widgets/loading_overlay.dart'; // Importa il nuovo widget

final navigatorKey = GlobalKey<NavigatorState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      systemNavigationBarColor: Colors.transparent,
      systemNavigationBarDividerColor: Colors.transparent,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  SystemChrome.setEnabledSystemUIMode(SystemUiMode.edgeToEdge);

  final online = await HealthService().isBackendOnline();
  final loggedIn = await AuthService().isLoggedIn();
  await AuthService().init();
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
          : (initialLoggedIn ? const HomeScreen() : const LoginPage()),
    );
  }
}
