import 'package:colombo/ui/features/sensors_debug.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/material.dart';
import '../../../widgets/glass_card.dart';
import '../viewmodels/settings_viewmodel.dart';

class SettingsPage extends StatefulWidget {
  const SettingsPage({super.key});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  final _viewModel = SettingsViewModel();

  @override
  void initState() {
    super.initState();
    _viewModel.loadData();
  }

  @override
  Widget build(BuildContext context) {
    final accent = const Color(0xFF1EAE98);

    // Listen to ViewModel changes
    return ListenableBuilder(
      listenable: _viewModel,
      builder: (context, child) {
        return Scaffold(
          backgroundColor: Colors.transparent,
          body: SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(
                horizontal: 20.0,
                vertical: 18,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Greeting
                  Text(
                    'Ciao ${_viewModel.userName} 👋',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.95),
                      fontSize: 28,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 14),

                  // Cars carousel
                  SizedBox(
                    height: 140,
                    child: _viewModel.cars.isEmpty
                        ? Center(
                            child: Text(
                              "Nessun veicolo associato al tuo account.",
                              style: TextStyle(color: Colors.white54),
                            ),
                          )
                        : PageView.builder(
                            controller: PageController(viewportFraction: 0.78),
                            itemCount: _viewModel.cars.length,
                            onPageChanged: (i) => _viewModel.selectCar(i),
                            itemBuilder: (context, index) {
                              final car = _viewModel.cars[index];
                              final selected =
                                  index == _viewModel.selectedCarIndex;
                              return Padding(
                                padding: const EdgeInsets.symmetric(
                                  horizontal: 8.0,
                                  vertical: 6.0,
                                ),
                                child: GlassCard(
                                  onTap: () => _viewModel.selectCar(index),
                                  child: Row(
                                    children: [
                                      // Car image circle
                                      Hero(
                                        tag: car.heroTag,
                                        child: Container(
                                          width: 72,
                                          height: 72,
                                          decoration: BoxDecoration(
                                            shape: BoxShape.circle,
                                            border: Border.all(
                                              color: Colors.white.withOpacity(
                                                0.06,
                                              ),
                                            ),
                                            boxShadow: [
                                              BoxShadow(
                                                color: Colors.black.withOpacity(
                                                  0.5,
                                                ),
                                                blurRadius: 8,
                                                offset: const Offset(0, 3),
                                              ),
                                            ],
                                            image: car.image != null
                                                ? DecorationImage(
                                                    image: car.image!,
                                                    fit: BoxFit.contain,
                                                  )
                                                : null,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(width: 14),

                                      // Car info
                                      Expanded(
                                        child: Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: [
                                            Text(
                                              car.manufacturer.isNotEmpty
                                                  ? car.manufacturer
                                                  : car.model,
                                              maxLines: 1,
                                              overflow: TextOverflow.ellipsis,
                                              style: TextStyle(
                                                color: Colors.white.withOpacity(
                                                  0.95,
                                                ),
                                                fontSize: 18,
                                                fontWeight: FontWeight.w700,
                                              ),
                                            ),
                                            const SizedBox(height: 6),
                                            Text(
                                              '${car.model} • ${car.year}',
                                              style: TextStyle(
                                                color: Colors.white.withOpacity(
                                                  0.65,
                                                ),
                                                fontSize: 13,
                                              ),
                                            ),
                                            const SizedBox(height: 8),
                                            Row(
                                              children: [
                                                Container(
                                                  padding:
                                                      const EdgeInsets.symmetric(
                                                        horizontal: 8,
                                                        vertical: 6,
                                                      ),
                                                  decoration: BoxDecoration(
                                                    color: selected
                                                        ? accent.withOpacity(
                                                            0.18,
                                                          )
                                                        : Colors.white
                                                              .withOpacity(
                                                                0.03,
                                                              ),
                                                    borderRadius:
                                                        BorderRadius.circular(
                                                          10,
                                                        ),
                                                  ),
                                                  child: GestureDetector(
                                                    onTap: () =>
                                                        _viewModel.openCarInfo(
                                                          context,
                                                          index,
                                                        ),
                                                    child: Text(
                                                      'Info veicolo',
                                                      style: TextStyle(
                                                        color: selected
                                                            ? accent
                                                            : Colors.white
                                                                  .withOpacity(
                                                                    0.7,
                                                                  ),
                                                        fontSize: 12,
                                                        fontWeight:
                                                            FontWeight.w600,
                                                      ),
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              );
                            },
                          ),
                  ),

                  const SizedBox(height: 18),

                  // Settings list
                  Expanded(
                    child: GlassCard(
                      padding: const EdgeInsets.all(8.0),
                      child: ListView(
                        physics: const BouncingScrollPhysics(),
                        children: [
                          _buildSectionTitle('Impostazioni account'),
                          const SizedBox(height: 8),
                          _buildSettingTile(
                            icon: Icons.person_outline,
                            title: 'Info account',
                            subtitle: 'Email, telefono, preferenze',
                            onTap: () {
                              _viewModel.userInfo(context);
                            },
                          ),
                          _buildSettingTile(
                            icon: Icons.code,
                            title: 'Licenze open source',
                            subtitle: 'Vedi le librerie usate',
                            onTap: () {},
                          ),
                          const Divider(
                            color: Colors.white12,
                            height: 28,
                            thickness: 1,
                          ),
                          _buildSectionTitle('Impostazioni avanzate'),
                          const SizedBox(height: 8),
                          _buildSettingTile(
                            icon: Icons.troubleshoot_rounded,
                            title: 'Strumenti di debug',
                            subtitle:
                                'Opzioni per verificare il funzionamento del dispositivo di raccolta dati della vettura',
                            onTap: () => Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const SensorsDebugPage(
                                  title: 'Strumenti di debug',
                                ),
                              ),
                            ),
                          ),
                          const Divider(
                            color: Colors.white12,
                            height: 28,
                            thickness: 1,
                          ),
                          _buildSectionTitle('Impostazioni di sicurezza'),
                          const SizedBox(height: 8),
                          _buildSettingTile(
                            icon: Icons.mode_edit_outline,
                            title: 'Modifica dati personali',
                            subtitle:
                                'Aggiorna le informazioni associate al tuo account',
                            onTap: () => NotificationOverlay.show(
                              "Funzionalità non ancora disponibile.",
                              Colors.redAccent,
                            ),
                          ),
                          _buildSettingTile(
                            icon: Icons.logout,
                            title: 'Esci',
                            subtitle: 'Termina la sessione',
                            onTap: () => _viewModel.logout(context),
                          ),
                          _buildSettingTile(
                            icon: Icons.delete_outline,
                            title: 'Cancella account',
                            subtitle:
                                'Rimuove tutti i dati personali raccolti su di te dal server. L\'operazione è irreversibile.',
                            trailing: const Icon(
                              Icons.arrow_forward_ios,
                              size: 14,
                              color: Colors.redAccent,
                            ),
                            titleStyle: const TextStyle(
                              color: Colors.redAccent,
                            ),
                            onTap: () {
                              _viewModel.deleteAccount(context);
                            },
                          ),
                          const SizedBox(height: 24),
                          Center(
                            child: Text(
                              'Colombo 2025',
                              textAlign: TextAlign.center,
                              style: TextStyle(
                                color: Colors.white.withOpacity(0.4),
                                fontSize: 12,
                              ),
                            ),
                          ),
                          const SizedBox(height: 24),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildSectionTitle(String title) => Padding(
    padding: const EdgeInsets.symmetric(horizontal: 6.0, vertical: 6.0),
    child: Text(
      title,
      style: TextStyle(
        color: Colors.white.withOpacity(0.8),
        fontSize: 14,
        fontWeight: FontWeight.w700,
      ),
    ),
  );

  Widget _buildSettingTile({
    required IconData icon,
    required String title,
    String? subtitle,
    Widget? trailing,
    TextStyle? titleStyle,
    required VoidCallback onTap,
  }) {
    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
      leading: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: Colors.white.withOpacity(0.03),
          border: Border.all(color: Colors.white.withOpacity(0.04)),
        ),
        child: Icon(icon, color: Colors.white.withOpacity(0.9)),
      ),
      title: Text(
        title,
        style:
            titleStyle ??
            TextStyle(
              color: Colors.white.withOpacity(0.92),
              fontSize: 16,
              fontWeight: FontWeight.w600,
            ),
      ),
      subtitle: subtitle != null
          ? Text(
              subtitle,
              style: TextStyle(
                color: Colors.white.withOpacity(0.55),
                fontSize: 13,
              ),
            )
          : null,
      trailing:
          trailing ??
          const Icon(Icons.arrow_forward_ios, size: 14, color: Colors.white54),
      onTap: onTap,
    );
  }
}

class Car {
  final String model;
  final String? manufacturer;
  final String? year;
  final ImageProvider? image;

  Car({required this.model, this.manufacturer, this.year, this.image});
}
