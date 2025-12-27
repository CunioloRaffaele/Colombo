// stateless widget for home screen
import 'package:colombo/data/services/bluetooth_service.dart';
import 'package:colombo/ui/features/drive/view/drive.dart';
import 'package:colombo/ui/features/drive/viewmodels/drive_viewmodel.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/material.dart';
//import 'package:glow_bottom_app_bar/glow_bottom_app_bar.dart'; --- IGNORE ---
import '../widgets/custom_bottom_app_bar.dart';
import './profile/view/settings.dart';
import './stats/view/statistics.dart';
import './map/view/map.dart';
import './../../data/services/location_service.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  final _driveViewModel = DriveViewModel();

  @override
  void initState() {
    super.initState();
    _driveViewModel.addListener(_onDriveStateChanged);
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _verifyLocationPermissions();
      _verifyBluetoothPermissions();
    });
  }

  void _onDriveStateChanged() {
    setState(() {});
  }

  @override
  void dispose() {
    _driveViewModel.removeListener(_onDriveStateChanged);
    _driveViewModel.dispose();
    super.dispose();
  }

  Future<void> _verifyLocationPermissions() async {
    bool granted;
    String errorMessage = '';
    try {
      granted = await verifyLocationPermissions();
    } catch (e) {
      granted = false;
      errorMessage = e.toString();
    }
    if (!mounted) return;
    if (!granted) {
      await showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: Text(errorMessage),
          content: const Text(
            'Per utilizzare tutte le funzionalità dell\'app, è necessario abilitare i servizi di localizzazione.',
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                _verifyLocationPermissions();
              },
              child: const Text('Chiudi'),
            ),
          ],
        ),
      );
    }
  }

  Future<void> _verifyBluetoothPermissions() async {
    bool granted = await requestPermissions();
    if (!mounted) return;
    if (!granted) {
      await showDialog(
        context: context,
        builder: (ctx) => AlertDialog(
          title: const Text('Permessi Bluetooth Negati'),
          content: const Text(
            'Per utilizzare tutte le funzionalità dell\'app, è necessario abilitare i permessi Bluetooth.',
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(ctx).pop();
                _verifyBluetoothPermissions();
              },
              child: const Text('Chiudi'),
            ),
          ],
        ),
      );
    }
  }

  int _currentIndex = 0;

  // Lista delle pagine da mostrare
  late final List<Widget> _pages = [
    Center(child: DrivePage(viewModel: _driveViewModel)),
    const Center(child: StatisticsPage()),
    const Center(child: MapPage()),
    const Center(child: SettingsPage()),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      backgroundColor: const Color(0xFF0E1116),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF0E1116), Color(0xFF1E2A38)],
          ),
        ),
        // No index stack -- Animated with transition
        child: AnimatedSwitcher(
          duration: const Duration(milliseconds: 500),
          switchInCurve: Curves.easeOutQuart,
          switchOutCurve: Curves.easeInQuart,
          transitionBuilder: (Widget child, Animation<double> animation) {
            return FadeTransition(
              opacity: animation,
              child: SlideTransition(
                position: Tween<Offset>(
                  begin: const Offset(0.0, 0.05), // Slightly lower (5%)
                  end: Offset.zero,
                ).animate(animation),
                child: child,
              ),
            );
          },
          // Using KeyedSubtree to preserve state of each page
          child: KeyedSubtree(
            key: ValueKey<int>(_currentIndex),
            child: _pages[_currentIndex],
          ),
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.only(bottom: 5.0),
          child: GlowBottomAppBar(
            initialIndex: _currentIndex,
            height: 60,
            onChange: (value) {
              if (_driveViewModel.isSessionActive && value != 0) {
                NotificationOverlay.show(
                  "Sessione di guida in corso. Mantieni la concentrazione alla guida e adotta comportamenti sicuri.",
                  Colors.redAccent,
                );
              }
              setState(() {
                _currentIndex = value;
              });
            },
            background: Colors.black.withOpacity(0.4),
            iconSize: 35,
            glowColor: const Color(0xFF1EAE98),
            selectedChildren: const [
              Icon(Icons.drive_eta_rounded, color: Color(0xFF1EAE98)),
              Icon(Icons.stacked_bar_chart_rounded, color: Color(0xFF1EAE98)),
              Icon(Icons.map, color: Color(0xFF1EAE98)),
              Icon(Icons.person, color: Color(0xFF1EAE98)),
            ],
            children: const [
              Icon(Icons.drive_eta_rounded, color: Colors.white54),
              Icon(Icons.stacked_bar_chart_rounded, color: Colors.white54),
              Icon(Icons.map_outlined, color: Colors.white54),
              Icon(Icons.person_outline, color: Colors.white54),
            ],
          ),
        ),
      ),
    );
  }
}
