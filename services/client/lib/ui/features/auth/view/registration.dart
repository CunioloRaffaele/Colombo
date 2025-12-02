import 'package:colombo/core/constants/api_constants.dart';
import 'package:colombo/data/services/municipality_service.dart';
import 'package:colombo/ui/features/auth/viewmodels/registration_viewmodel.dart';
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

import '../../../widgets/notification_overlay.dart';
import '../../../widgets/input_field.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  final _viewModel = RegistrationViewModel();

  final _nomeController = TextEditingController();
  final _cognomeController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _municipalityController = TextEditingController();

  int _selectedResidenzaId = 0;

  bool _termsAccepted = false;
  bool _privacyAccepted = false;

  @override
  void dispose() {
    _nomeController.dispose();
    _cognomeController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _municipalityController.dispose();
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
                      icon: Icons.location_city_outlined,
                      hint: 'Comune',
                      controller: _municipalityController,
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
                        Flexible(
                          child: GestureDetector(
                            onTap: () async {
                              final Uri url = Uri.parse(
                                DocumentsApiConstants.termsOfServiceUrl,
                              );
                              if (!await launchUrl(url)) {
                                debugPrint('Could not launch $url');
                              }
                            },
                            child: Text(
                              'Accetto termini e condizioni ',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 20.0,
                                color: Colors.white.withOpacity(0.5),
                                decoration: TextDecoration.underline,
                                decorationColor: Colors.white.withOpacity(0.5),
                              ),
                            ),
                          ),
                        ),
                        Transform.scale(
                          scale: 1.3,
                          child: Checkbox(
                            value: _termsAccepted,
                            onChanged: (bool? newValue) {
                              setState(() {
                                _termsAccepted = newValue ?? false;
                              });
                            },
                          ),
                        ),
                      ],
                    ),

                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: <Widget>[
                        Flexible(
                          child: GestureDetector(
                            onTap: () async {
                              final Uri url = Uri.parse(
                                DocumentsApiConstants.privacyPolicyUrl,
                              );
                              if (!await launchUrl(url)) {
                                debugPrint('Could not launch $url');
                              }
                            },
                            child: Text(
                              'Accetto politica sul trattamento dei dati ',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                fontSize: 20.0,
                                color: Colors.white.withOpacity(0.5),
                                decoration: TextDecoration.underline,
                                decorationColor: Colors.white.withOpacity(0.5),
                              ),
                            ),
                          ),
                        ),
                        Transform.scale(
                          scale: 1.3,
                          child: Checkbox(
                            value: _privacyAccepted,
                            onChanged: (bool? newValue) {
                              setState(() {
                                _privacyAccepted = newValue ?? false;
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
                            horizontal: 90,
                            vertical: 16,
                          ),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(12),
                          ),
                          elevation: 6,
                          shadowColor: const Color(0xFF1EAE98).withOpacity(0.6),
                        ),
                        onPressed: () async {
                          final municipalities =
                              await MunicipalityService.searchComuni(
                                _municipalityController.text,
                              );
                          if (municipalities != 0) {
                            _selectedResidenzaId = municipalities;
                          } else {
                            _selectedResidenzaId = 0;
                            NotificationOverlay.show(
                              'Comune non trovato. Controlla l\'ortografia.',
                              Colors.redAccent,
                            );
                          }
                          final error = await _viewModel.register(
                            nome: _nomeController.text,
                            cognome: _cognomeController.text,
                            email: _emailController.text,
                            password: _passwordController.text,
                            residenzaId: _selectedResidenzaId,
                            termsAccepted: _termsAccepted,
                            privacyAccepted: _privacyAccepted,
                          );

                          print(error);

                          if (!context.mounted) return;

                          if (error == null) {
                            NotificationOverlay.show(
                              'Registrazione avvenuta con successo! Effettua il login.',
                              Colors.greenAccent,
                            );
                            Navigator.pop(context);
                          } else {
                            NotificationOverlay.show(error, Colors.redAccent);
                          }
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
