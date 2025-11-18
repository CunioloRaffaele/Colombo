import 'package:flutter/material.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';
import '../../../main.dart';

class NotificationOverlay {
  static OverlayEntry? _entry;
  static double _opacity = 0.0;
  static const Duration _fadeDuration = Duration(milliseconds: 300);

  static void show(String message, Color color, {Duration duration = const Duration(seconds: 4)}) {
    if (_entry != null) return;
    final overlay = navigatorKey.currentState?.overlay;
    if (overlay == null) return;

    _opacity = 0.0;

    _entry = OverlayEntry(
      builder: (ctx) => Positioned(
        top: 80,
        left: 16,
        right: 16,
        child: GestureDetector(
          onVerticalDragUpdate: (details) {
            // Swipe verso l'alto: delta.dy < 0
            if (details.delta.dy < -6) {
              hide();
            }
          },
          onPanEnd: (details) {
            // Fling rapido verso l'alto
            final vy = details.velocity.pixelsPerSecond.dy;
            if (vy < -500) {
              hide();
            }
          },
          child: AnimatedOpacity(
            opacity: _opacity,
            duration: _fadeDuration,
            curve: Curves.easeOut,
            child: LiquidGlassLayer(
              child: LiquidStretch(
                stretch: 0.5,
                interactionScale: 0.90,
                child: LiquidGlass(
                  shape: LiquidRoundedSuperellipse(borderRadius: 12),
                  child: Material(
                    color: Colors.transparent,
                    child: Container(
                      padding: const EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: color,
                        borderRadius: BorderRadius.circular(12),
                        boxShadow: const [BoxShadow(blurRadius: 12, color: Colors.black26)],
                      ),
                      child: Row(
                        children: [
                          const Icon(Icons.error_outline, color: Colors.white),
                          const SizedBox(width: 12),
                          Expanded(
                            child: Text(
                              message,
                              style: const TextStyle(color: Colors.white, fontSize: 14),
                            ),
                          ),
                          const SizedBox(width: 8),
                          const Icon(Icons.keyboard_arrow_up, color: Colors.white70, size: 20),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    );

    overlay.insert(_entry!);

    // Trigger fade-in on the next frame
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _opacity = 1.0;
      _entry?.markNeedsBuild();
    });

    // Auto-hide after duration
    Future.delayed(duration, () => hide());
  }

  static void hide() {
    if (_entry == null) return;
    _opacity = 0.0;
    _entry?.markNeedsBuild();

    // Wait for fade-out, then remove
    Future.delayed(_fadeDuration, () {
      _entry?.remove();
      _entry = null;
    });
  }
}
