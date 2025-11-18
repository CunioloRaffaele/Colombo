import 'package:colombo/data/services/auth_service.dart';
import 'package:flutter/material.dart';

import '../widgets/notification_overlay.dart';
import '../widgets/input_field.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _nomeController = TextEditingController();
  final _cognomeController = TextEditingController();
  final _bithDateController = TextEditingController();
  final _comuneController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  late bool? _isChecked = false;

  @override
  void dispose() {
    _nomeController.dispose();
    _cognomeController.dispose();
    _bithDateController.dispose();
    _comuneController.dispose();
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
            padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
            child: ConstrainedBox(
              constraints: BoxConstraints(
                minHeight: MediaQuery.of(context).size.height - MediaQuery.of(context).padding.vertical,
              ),
              child: IntrinsicHeight(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 80),
                    Text(
                      'Crea Account',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.9),
                        fontSize: 36,
                        fontWeight: FontWeight.bold,
                        letterSpacing: 1.2,
                      ),
                    ),
                    const SizedBox(height: 10),
                    Text(
                      'Registrati per iniziare a usare Green Drive',
                      style: TextStyle(
                        color: Colors.white.withOpacity(0.7),
                        fontSize: 16,
                      ),
                    ),
                    const SizedBox(height: 60),

                    InputField(
                      icon: Icons.person_outline,
                      hint: 'Nome',
                      controller: _nomeController,
                    ),
                    const SizedBox(height: 20),

                    InputField(
                      icon: Icons.person_outline,
                      hint: 'Cognome',
                      controller: _cognomeController,
                    ),
                    const SizedBox(height: 20),

                    InputField(
                      icon: Icons.cake_outlined,
                      hint: 'Data di nascita (AAAA-MM-GG)',
                      controller: _bithDateController,
                    ),
                    const SizedBox(height: 20),

                    InputField(
                      icon: Icons.location_city_outlined,
                      hint: 'Comune',
                      controller: _comuneController,
                    ),
                    const SizedBox(height: 20),

                    InputField(
                      icon: Icons.email_outlined,
                      hint: 'Email',
                      controller: _emailController,
                      keyboardType: TextInputType.emailAddress,
                    ),
                    const SizedBox(height: 20),

                    InputField(
                      icon: Icons.lock_outline,
                      hint: 'Password',
                      obscure: true,
                      controller: _passwordController,
                    ),
                    const SizedBox(height: 20),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          'Accetto termini e condizioni ',
                          style: TextStyle(fontSize: 20.0, color: Colors.white.withOpacity(0.5)),
                        ),
                        Transform.scale(
                          scale: 1.3,
                        child: Checkbox(
                          value: _isChecked,
                          onChanged: (bool? newValue) {
                            setState(() {
                              _isChecked = newValue;
                            });
                          },
                        ),
                        ),
                      ],
                    ),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Text(
                          'Accetto politica sulla privacy ',
                          style: TextStyle(fontSize: 20.0, color: Colors.white.withOpacity(0.5)),
                        ),
                        Transform.scale(
                          scale: 1.3,
                          child: Checkbox(
                            value: _isChecked,
                            onChanged: (bool? newValue) {
                              setState(() {
                                _isChecked = newValue;
                              });
                            },
                          ),
                        ),
                      ],
                    ),

                    const SizedBox(height: 40),
                    Center(
                      child: ElevatedButton(
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF1EAE98),
                          padding: const EdgeInsets.symmetric(
                              horizontal: 90, vertical: 16),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 6,
                          shadowColor: const Color(0xFF1EAE98).withOpacity(0.6),
                        ),
                        onPressed: () {
                          // Get values
                          final nome = _nomeController.text.toUpperCase();
                          final cognome = _cognomeController.text.toUpperCase();
                          final birthDate = _bithDateController.text;
                          final email = _emailController.text;
                          final password = _passwordController.text;
                          // final comune = _comuneController.text;
                          if (nome.isEmpty || cognome.isEmpty || birthDate.isEmpty || email.isEmpty || password.isEmpty) {
                            // Show error
                            NotificationOverlay.show('Per procedere con la registrazione è necessario compilare tutti i campi richiesti.', Colors.redAccent);
                            return;
                          }
                          if (_isChecked != true) {
                            // Show error
                            NotificationOverlay.show('Per procedere con la registrazione è necessario accettare i termini e condizioni e la politica sulla privacy.', Colors.redAccent);
                            return;
                          }

                          AuthService().register(
                            nameSurname: '$nome $cognome',
                            email: email,
                            password: password,
                            birthDate: DateTime.parse(birthDate),
                            // municipality: comune,
                          );
                          Navigator.pop(context);

                        },
                        child: const Text(
                          'Registrati',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),

                    const Spacer(),

                    Center(
                      child: TextButton(
                        onPressed: () {
                          Navigator.pop(context);
                        },
                        child: Text(
                          'Hai già un account? Accedi',
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
