// stateless widget for home screen
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
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback(
      (_) => _verifyLocationPermissions(),
    );
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

  int _currentIndex = 0;

  // Lista delle pagine da mostrare
  final List<Widget> _pages = [
    const Center(
      child: Text(
        "Home View Placeholder",
        style: TextStyle(color: Colors.white),
      ),
    ),
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
