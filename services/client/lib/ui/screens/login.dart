import 'package:flutter/material.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';
import 'package:flutter/cupertino.dart';

import '../../data/services/auth_service.dart';
import '../widgets/input_field.dart';
import '../widgets/notification_overlay.dart';
import 'registration.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF0E1116),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: SingleChildScrollView(
            keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
            padding: EdgeInsets.only(
              bottom: MediaQuery.of(context).viewInsets.bottom,
            ),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight:
                    MediaQuery.of(context).size.height -
                    MediaQuery.of(context).padding.vertical,
              ),
              child: IntrinsicHeight(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 80),
                    Text(
                      'Green Drive',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.9),
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'Accedi per continuare',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 60),

                    // Email field
                    LiquidGlassLayer(
                      child: LiquidStretch(
                        stretch: 0.5,
                        interactionScale: 0.90,
                        child: LiquidGlass(
                          shape: LiquidRoundedSuperellipse(borderRadius: 20),
                          child: InputField(
                            icon: Icons.email_outlined,
                            controller: _emailController,
                            hint: 'Email',
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Password field
                    LiquidGlassLayer(
                      child: LiquidStretch(
                        stretch: 0.5,
                        interactionScale: 0.90,
                        child: LiquidGlass(
                          shape: LiquidRoundedSuperellipse(borderRadius: 20),
                          child: InputField(
                            icon: Icons.lock_outline,
                            controller: _passwordController,
                            hint: 'Password',
                            obscure: true,
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 40),
                    Center(
                      child: LiquidGlassLayer(
                        child: LiquidStretch(
                          stretch: 0.5,
                          interactionScale: 1.05,
                          child: LiquidGlass(
                            shape: LiquidRoundedSuperellipse(borderRadius: 20),
                            child: ElevatedButton(
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF1EAE98),
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 100,
                                  vertical: 16,
                                ),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 6,
                                shadowColor: const Color(
                                  0xFF1EAE98,
                                ).withOpacity(0.6),
                              ),
                              onPressed: () async {
                                // Handle login action
                                final email = _emailController.text;
                                final password = _passwordController.text;

                                if (email.isEmpty || password.isEmpty) {
                                  NotificationOverlay.show(
                                    'Per effettuare l\'accesso compila tutti i campi.',
                                    Colors.redAccent,
                                  );
                                  return;
                                }

                                final result = AuthService().login(
                                  email: email,
                                  password: password,
                                );

                              },
                              child: const Text(
                                'Accedi',
                                style: TextStyle(
                                  color: Colors.white,
                                  fontSize: 18,
                                  fontWeight: FontWeight.w600,
                                ),
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),

                    const Spacer(),

                    Center(
                      child: TextButton(
                        onPressed: () {
                          // Navigate to registration page
                          Navigator.push(
                            context,
                            CupertinoPageRoute(
                              builder: (context) => const RegisterPage(),
                            ),
                          );
                        },
                        child: Text(
                          'Non hai un account? Registrati',
                          style: TextStyle(
                            color: Colors.white.withOpacity(0.6),
                            fontSize: 14,
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 20),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
