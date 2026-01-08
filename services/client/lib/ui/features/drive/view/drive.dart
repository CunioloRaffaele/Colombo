import 'package:colombo/core/constants/color_costants.dart';
import 'package:flutter/material.dart';
import '../../../widgets/glass_button.dart';
import '../../../widgets/eco_effect_layer.dart';
import '../viewmodels/drive_viewmodel.dart';
import 'drive_debug_page.dart';

class DrivePage extends StatefulWidget {
  final DriveViewModel? viewModel;
  const DrivePage({super.key, this.viewModel});

  @override
  State<DrivePage> createState() => _DrivePageState();
}

class _DrivePageState extends State<DrivePage> with TickerProviderStateMixin {
  late final DriveViewModel _viewModel;
  late AnimationController _pulseController;

  @override
  void initState() {
    super.initState();
    _viewModel = widget.viewModel ?? DriveViewModel();
    _viewModel.addListener(_onViewModelChanged);
    _pulseController = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 2),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _viewModel.removeListener(_onViewModelChanged);
    if (widget.viewModel == null) {
      _viewModel.dispose();
    }
    _pulseController.dispose();
    super.dispose();
  }

  void _onViewModelChanged() {
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final state = _viewModel.currentState;
    final mainColor = getColorForScore(state.ecoscore, _viewModel);

    return GestureDetector(
      onTap: _viewModel.resetInactivityTimer,
      onPanDown: (_) => _viewModel.resetInactivityTimer(),
      child: Scaffold(
        backgroundColor: Colors.black,
        body: Stack(
          children: [
            AnimatedOpacity(
              duration: const Duration(milliseconds: 800),
              opacity: _viewModel.isFocusMode ? 0.1 : 1.0,
              child: AnimatedContainer(
                duration: const Duration(milliseconds: 1000),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: [
                      const Color(0xFF0E1116),
                      mainColor.withOpacity(0.6),
                    ],
                  ),
                ),
              ),
            ),
            if (_viewModel.isSessionActive)
              EcoEffectLayer(score: state.ecoscore),
            SafeArea(
              child: AnimatedOpacity(
                duration: const Duration(milliseconds: 500),
                opacity: _viewModel.isFocusMode ? 0.0 : 1.0,
                child: Padding(
                  padding: const EdgeInsets.all(20.0),
                  child: GlassButton(
                    icon: Icons.volume_off,
                    onTap: () {
                      _viewModel.toggleSoundMute();
                    },
                    borderRadius: 25,
                    backgroundColor: _viewModel.isSoundMuted
                        ? Colors.redAccent.withOpacity(0.3)
                        : Colors.black.withOpacity(0.5),
                  ),
                ),
              ),
            ),
            Center(
              child: SafeArea(
                child: Column(
                  children: [
                    if (state.isInZone)
                      _buildAlertChip(
                        "Zona Monitorata: ${state.zoneName}",
                        color: Colors.greenAccent,
                      ),
                    if (!state.isPipeConnected)
                      _buildAlertChip("Disconnesso", color: Colors.red),
                  ],
                ),
              ),
            ),
            Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  GestureDetector(
                    onLongPress: () {
                      Navigator.of(context).push(
                        MaterialPageRoute(
                          builder: (context) => const DriveDebugPage(),
                        ),
                      );
                    },
                    child: AnimatedBuilder(
                      animation: _pulseController,
                      builder: (context, child) {
                        return Container(
                          width: 200,
                          height: 200,
                          decoration: BoxDecoration(
                            shape: BoxShape.circle,
                            border: Border.all(
                              color: mainColor.withOpacity(0.5),
                              width: 4,
                            ),
                            boxShadow: [
                              BoxShadow(
                                color: mainColor.withOpacity(0.4),
                                blurRadius: 20 + (_pulseController.value * 20),
                                spreadRadius: 5,
                              ),
                            ],
                          ),
                          child: Center(
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                if (_viewModel.isSessionActive)
                                  RollingNumberText(
                                    value: state.ecoscore.toInt(),
                                    style: const TextStyle(
                                      fontSize: 80,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white,
                                      height: 1,
                                    ),
                                  )
                                else
                                  const Text(
                                    "--",
                                    style: TextStyle(
                                      fontSize: 80,
                                      fontWeight: FontWeight.bold,
                                      color: Colors.white54,
                                      height: 1,
                                    ),
                                  ),
                                const Text(
                                  "ECOSCORE",
                                  style: TextStyle(
                                    color: Colors.white54,
                                    fontSize: 12,
                                    letterSpacing: 2,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  SizedBox(height: 40),
                  AnimatedOpacity(
                    duration: const Duration(milliseconds: 500),
                    opacity: _viewModel.isFocusMode ? 0.0 : 1.0,
                    child: Column(
                      children: [
                        if (_viewModel.isSessionActive)
                          _buildInfoChip(Icons.speed, state.speed, "km/h"),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              bottom: 50,
              left: 0,
              right: 0,
              child: SafeArea(
                child: AnimatedOpacity(
                  opacity: _viewModel.isFocusMode ? 0.0 : 1.0,
                  duration: const Duration(milliseconds: 500),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      GlassButton(
                        icon: Icons.bluetooth,
                        backgroundColor: Colors.black.withOpacity(0.3),
                        label: state.isPipeConnected
                            ? "Disconnetti"
                            : "Connetti ELM",
                        onTap: () {
                          _viewModel.togglePipeConnection(context);
                        },
                      ),
                      const SizedBox(width: 16),
                      GlassButton(
                        icon: _viewModel.isSessionActive
                            ? Icons.stop
                            : Icons.play_arrow,
                        backgroundColor: Colors.black.withOpacity(0.3),
                        label: _viewModel.isSessionActive
                            ? "Stop Sessione"
                            : "Avvia Sessione",
                        color: _viewModel.isSessionActive
                            ? Colors.redAccent
                            : Colors.greenAccent,
                        onTap: _viewModel.toggleSession,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 50,
              left: 0,
              right: 0,
              child: SafeArea(
                child: AnimatedOpacity(
                  duration: const Duration(milliseconds: 500),
                  opacity: _viewModel.isFocusMode ? 1.0 : 0.0,
                  child: const Center(
                    child: Text(
                      "Tocca per i dettagli",
                      style: TextStyle(color: Colors.white54, fontSize: 12),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoChip(IconData icon, int value, String unit) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.1),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, color: Colors.white70, size: 20),
          const SizedBox(width: 10),
          RollingNumberText(
            value: value,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
          Text(
            " $unit",
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w600,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAlertChip(String label, {Color color = Colors.amber}) {
    return Container(
      margin: const EdgeInsets.only(top: 10),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      decoration: BoxDecoration(
        color: color.withOpacity(0.2),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: color.withOpacity(0.5)),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.warning_amber_rounded, color: color, size: 18),
          const SizedBox(width: 8),
          Text(
            label,
            style: TextStyle(
              color: color,
              fontSize: 14,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}

class RollingNumberText extends StatefulWidget {
  final int value;
  final TextStyle style;
  final Duration duration;

  const RollingNumberText({
    super.key,
    required this.value,
    required this.style,
    this.duration = const Duration(milliseconds: 400),
  });

  @override
  State<RollingNumberText> createState() => _RollingNumberTextState();
}

class _RollingNumberTextState extends State<RollingNumberText> {
  int? _oldValue;

  @override
  void didUpdateWidget(RollingNumberText oldWidget) {
    super.didUpdateWidget(oldWidget);
    _oldValue = oldWidget.value;
  }

  @override
  Widget build(BuildContext context) {
    final valueStr = widget.value.toString();
    final isIncreasing = widget.value > (_oldValue ?? widget.value);

    return Row(
      mainAxisSize: MainAxisSize.min,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: valueStr.split('').map((digit) {
        return _RollingDigit(
          digit: digit,
          style: widget.style,
          duration: widget.duration,
          slideUp: isIncreasing,
        );
      }).toList(),
    );
  }
}

class _RollingDigit extends StatefulWidget {
  final String digit;
  final TextStyle style;
  final Duration duration;
  final bool slideUp;

  const _RollingDigit({
    required this.digit,
    required this.style,
    required this.duration,
    required this.slideUp,
  });

  @override
  State<_RollingDigit> createState() => _RollingDigitState();
}

class _RollingDigitState extends State<_RollingDigit>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideInAnimation;
  late Animation<Offset> _slideOutAnimation;
  late Animation<double> _opacityIn;
  late Animation<double> _opacityOut;

  String _currentDigit = "";
  String _oldDigit = "";

  @override
  void initState() {
    super.initState();
    _currentDigit = widget.digit;
    _oldDigit = widget.digit;
    _controller = AnimationController(vsync: this, duration: widget.duration);
    _setupAnimations();
  }

  void _setupAnimations() {
    final beginIn = widget.slideUp
        ? const Offset(0, 0.6)
        : const Offset(0, -0.6);
    final endOut = widget.slideUp
        ? const Offset(0, -0.6)
        : const Offset(0, 0.6);

    _slideInAnimation = Tween<Offset>(
      begin: beginIn,
      end: Offset.zero,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeOutBack));

    _slideOutAnimation = Tween<Offset>(
      begin: Offset.zero,
      end: endOut,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.easeIn));

    _opacityIn = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.0, 0.5)),
    );
    _opacityOut = Tween<double>(begin: 1.0, end: 0.0).animate(
      CurvedAnimation(parent: _controller, curve: const Interval(0.5, 1.0)),
    );
  }

  @override
  void didUpdateWidget(_RollingDigit oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.digit != widget.digit) {
      _oldDigit = oldWidget.digit;
      _currentDigit = widget.digit;
      _setupAnimations();
      _controller.reset();
      _controller.forward();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRect(
      child: Stack(
        alignment: Alignment.center,
        children: [
          // Sizing widget (invisible)
          Opacity(opacity: 0, child: Text("8", style: widget.style)),

          // Exiting Digit
          if (_controller.isAnimating)
            SlideTransition(
              position: _slideOutAnimation,
              child: FadeTransition(
                opacity: _opacityOut,
                child: Text(_oldDigit, style: widget.style),
              ),
            ),

          // Entering Digit
          SlideTransition(
            position: _controller.isAnimating
                ? _slideInAnimation
                : const AlwaysStoppedAnimation(Offset.zero),
            child: FadeTransition(
              opacity: _controller.isAnimating
                  ? _opacityIn
                  : const AlwaysStoppedAnimation(1.0),
              child: Text(_currentDigit, style: widget.style),
            ),
          ),
        ],
      ),
    );
  }
}
