import 'package:flutter/material.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';

class GlassButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final Color color;
  final Color backgroundColor;
  final double borderRadius;
  final double? height;
  final double? fontSize;

  const GlassButton({
    super.key,
    required this.icon,
    required this.label,
    required this.onTap,
    this.color = Colors.white,
    this.backgroundColor = Colors.transparent,
    this.borderRadius = 16.0,
    this.height,
    this.fontSize = 14.0,
  });

  @override
  Widget build(BuildContext context) {
    return LiquidGlassLayer(
      child: LiquidStretch(
        stretch: 0.5,
        interactionScale: 0.95,
        child: LiquidGlass(
          shape: LiquidRoundedSuperellipse(borderRadius: borderRadius),
          child: Material(
            color: backgroundColor,
            child: InkWell(
              onTap: onTap,
              borderRadius: BorderRadius.circular(borderRadius),
              child: Container(
                height: height,
                padding: EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: height != null ? 0 : 12,
                ),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(borderRadius),
                  border: Border.all(color: Colors.white.withOpacity(0.2)),
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  mainAxisAlignment: MainAxisAlignment.center, // Center content
                  children: [
                    Icon(icon, color: color, size: 20),
                    const SizedBox(width: 8),
                    Text(
                      label,
                      style: TextStyle(
                        color: color,
                        fontWeight: FontWeight.w600,
                        fontSize: fontSize,
                      ),
                    ),
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
