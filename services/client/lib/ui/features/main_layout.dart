// stateless widget for home screen
import 'package:flutter/material.dart';
import 'package:glow_bottom_app_bar/glow_bottom_app_bar.dart';
import './profile/view/settings.dart';

class MainLayout extends StatefulWidget {
  const MainLayout({super.key});

  @override
  State<MainLayout> createState() => _MainLayoutState();
}

class _MainLayoutState extends State<MainLayout> {
  int _currentIndex = 0;

  // Lista delle pagine da mostrare
  final List<Widget> _pages = [
    const Center(
      child: Text(
        "Home View Placeholder",
        style: TextStyle(color: Colors.white),
      ),
    ),
    const Center(
      child: Text(
        "Statistics View Placeholder",
        style: TextStyle(color: Colors.white),
      ),
    ),
    Center(child: SettingsPage()),
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
      bottomNavigationBar: Padding(
        padding: const EdgeInsets.only(bottom: 20.0),
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
            Icon(Icons.person, color: Color(0xFF1EAE98)),
          ],
          children: const [
            Icon(Icons.drive_eta_rounded, color: Colors.white54),
            Icon(Icons.stacked_bar_chart_rounded, color: Colors.white54),
            Icon(Icons.person_outline, color: Colors.white54),
          ],
        ),
      ),
    );
  }
}
