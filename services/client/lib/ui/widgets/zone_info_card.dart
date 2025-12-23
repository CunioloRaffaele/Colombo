import 'package:flutter/material.dart';
import 'package:liquid_glass_renderer/liquid_glass_renderer.dart';

class ZoneInfoCard extends StatelessWidget {
  final String zoneName;
  final String? description;

  const ZoneInfoCard({super.key, required this.zoneName, this.description});

  @override
  Widget build(BuildContext context) {
    return LiquidGlassLayer(
      key: ValueKey(zoneName),
      child: LiquidStretch(
        stretch: 0.5,
        interactionScale: 0.90,
        child: LiquidGlass(
          shape: LiquidRoundedSuperellipse(borderRadius: 20),
          child: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.black.withOpacity(0.3),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: Colors.white.withOpacity(0.1)),
            ),
            child: Row(
              children: [
                Container(
                  width: 50,
                  height: 50,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(
                    _getIconForZoneType(zoneName),
                    color: Colors.white,
                    size: 28,
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        zoneName.toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.bold,
                          fontSize: 16,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        description ??
                            'Zona a traffico controllato.\nNon sono attualmente disponibili informazioni circa incentivazioni per la guida sostenibile in questa area.',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.7),
                          fontSize: 14,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  IconData _getIconForZoneType(String type) {
    switch (type.toLowerCase()) {
      case 'centro storico':
        return Icons.school;
      case 'commerciale':
        return Icons.store;
      case 'industriale':
        return Icons.factory;
      case 'residenziale':
        return Icons.home;
      case 'generica':
      default:
        return Icons.map;
    }
  }
}
