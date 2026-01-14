import 'package:colombo/ui/widgets/glass_card.dart';
import 'package:flutter/material.dart';

class CarInfoPage extends StatelessWidget {
  final String vin;
  final String heroTag;
  final String manufacturer;
  final String model;
  final String year;
  final double co2Emissions;
  final double pmEmissions;
  final ImageProvider? image;

  const CarInfoPage({
    super.key,
    required this.vin,
    required this.heroTag,
    required this.manufacturer,
    required this.model,
    required this.year,
    required this.co2Emissions,
    required this.pmEmissions,
    this.image,
  });

  static const _accent = Color(0xFF1EAE98);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        backgroundColor: Colors.black.withOpacity(0.25),
        surfaceTintColor: Colors.transparent,
        elevation: 0,
        foregroundColor: Colors.white,
        title: const Text('Dettagli veicolo'),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Color(0xFF0E1116), Color(0xFF1E2A38)],
          ),
        ),
        child: SafeArea(
          child: SizedBox.expand(
            child: SingleChildScrollView(
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
              child: Column(
                children: [
                  if (vin.isEmpty) ...[
                    GlassCard(
                      color: Colors.red.withOpacity(0.5),
                      child: Text(
                        'Informazioni sul veicolo non disponibili o parziali. L\'errore potrebbe essere dovuto all\'impossibilità di recuperare il VIN dalla centralina del veicolo.',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.8),
                          fontSize: 12,
                        ),
                      ),
                    ),
                  ],
                  Hero(
                    tag: heroTag,
                    child: Container(
                      width: double.infinity,
                      height: 200,
                      decoration: BoxDecoration(
                        image: image != null
                            ? DecorationImage(
                                image: image!,
                                fit: BoxFit.contain,
                              )
                            : null,
                      ),
                      alignment: Alignment.center,
                      child: image == null
                          ? Icon(
                              Icons.directions_car,
                              size: 56,
                              color: Colors.white.withOpacity(0.6),
                            )
                          : null,
                    ),
                  ),
                  const SizedBox(height: 18),
                  _infoRow('VIN', vin.isNotEmpty ? vin : '—'),
                  _infoRow(
                    'Marca',
                    manufacturer.isNotEmpty ? manufacturer : '—',
                  ),
                  _infoRow('Modello', model.isNotEmpty ? model : '—'),
                  _infoRow('Anno', year.isNotEmpty ? year : '—'),
                  _infoRow(
                    'Emissioni CO₂ (g/km)',
                    co2Emissions >= 0
                        ? co2Emissions.toStringAsFixed(4)
                        : 'Dati non disponibili',
                  ),
                  _infoRow(
                    'Emissioni PM (g/km)',
                    pmEmissions >= 0
                        ? pmEmissions.toStringAsFixed(4)
                        : 'Dati non disponibili',
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _infoRow(
    String label,
    String value, {
    bool highlight = false,
    Color? highlightColor,
  }) {
    final textColor = Colors.white.withOpacity(0.9);
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            flex: 5,
            child: Text(
              label,
              style: TextStyle(
                color: Colors.white.withOpacity(0.7),
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
          Expanded(
            flex: 7,
            child: Text(
              value,
              style: TextStyle(
                color: highlight ? (highlightColor ?? _accent) : textColor,
                fontSize: 14,
                fontWeight: highlight ? FontWeight.w700 : FontWeight.w600,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
