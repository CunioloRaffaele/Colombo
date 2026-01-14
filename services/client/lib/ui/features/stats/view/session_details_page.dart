import 'dart:ui';
import 'package:colombo/core/constants/color_costants.dart';
import 'package:colombo/data/models/reports_dto.dart';
import 'package:colombo/data/services/reports_service.dart';
import 'package:colombo/ui/widgets/glass_card.dart';
import 'package:colombo/ui/widgets/notification_overlay.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class SessionDetailsPage extends StatefulWidget {
  final MonthlyEcoStatsSessionsDto session;

  const SessionDetailsPage({super.key, required this.session});

  @override
  State<SessionDetailsPage> createState() => _SessionDetailsPageState();
}

class _SessionDetailsPageState extends State<SessionDetailsPage> {
  final _reportsService = ReportsService();
  late Future<SessionDetailsDto> _sessionDetailsFuture;
  late Future<SessionSummaryDto> _sessionSummaryFuture;

  @override
  void initState() {
    super.initState();
    try {
      _sessionDetailsFuture = _reportsService.getSessionDetails(
        widget.session.id,
      );
      _sessionSummaryFuture = _reportsService.getSessionSummary(
        widget.session.id,
      );
    } catch (e) {
      WidgetsBinding.instance.addPostFrameCallback((_) {
        NotificationOverlay.show(
          "Errore nell'inizializzazione: $e",
          Colors.red,
        );
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.black.withOpacity(0.4),
            shape: BoxShape.circle,
          ),
          child: IconButton(
            icon: const Icon(Icons.arrow_back, color: Colors.white),
            onPressed: () => Navigator.of(context).pop(),
          ),
        ),
      ),
      body: FutureBuilder<SessionDetailsDto>(
        future: _sessionDetailsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const SizedBox();
          } else if (snapshot.hasError) {
            WidgetsBinding.instance.addPostFrameCallback((_) {
              Navigator.of(context).pop();
              NotificationOverlay.show(
                "Errore dati: ${snapshot.error}",
                Colors.red,
              );
            });
            return const SizedBox.shrink();
          } else if (!snapshot.hasData) {
            return const Center(child: Text("Nessun dato"));
          }

          final details = snapshot.data!;
          final points = details.rilevazioni.map((r) {
            return LatLng(r.punto.coordinates[1], r.punto.coordinates[0]);
          }).toList();

          LatLngBounds? bounds;
          if (points.isNotEmpty) {
            bounds = LatLngBounds.fromPoints(points);
          }

          return Stack(
            children: [
              // 1. Full Screen Map
              FlutterMap(
                options: MapOptions(
                  initialCenter: points.isNotEmpty
                      ? points.first
                      : const LatLng(45.4642, 9.1900),
                  initialZoom: 13,
                  initialCameraFit: bounds != null
                      ? CameraFit.bounds(
                          bounds: bounds,
                          padding: const EdgeInsets.only(
                            top: 100,
                            left: 50,
                            right: 50,
                            bottom: 350, // Space for the bottom sheet
                          ),
                        )
                      : null,
                ),
                children: [
                  TileLayer(
                    urlTemplate:
                        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                    userAgentPackageName: 'com.colombo.app',
                  ),
                  PolylineLayer(
                    polylines: _buildPolylines(details.rilevazioni),
                  ),
                ],
              ),

              // 2. Draggable Bottom Sheet with frosted glass effect
              DraggableScrollableSheet(
                initialChildSize: 0.4,
                minChildSize: 0.25,
                maxChildSize: 0.85,
                builder: (context, scrollController) {
                  return ClipRRect(
                    borderRadius: const BorderRadius.vertical(
                      top: Radius.circular(30),
                    ),
                    child: BackdropFilter(
                      filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
                      child: Container(
                        decoration: BoxDecoration(
                          color: const Color(0xFF0F172A).withOpacity(0.85),
                          borderRadius: const BorderRadius.vertical(
                            top: Radius.circular(30),
                          ),
                          border: Border(
                            top: BorderSide(
                              color: Colors.white.withOpacity(0.1),
                            ),
                          ),
                        ),
                        child: SingleChildScrollView(
                          controller: scrollController,
                          padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Drag Handle
                              Center(
                                child: Container(
                                  width: 40,
                                  height: 4,
                                  margin: const EdgeInsets.only(bottom: 20),
                                  decoration: BoxDecoration(
                                    color: Colors.white.withOpacity(0.3),
                                    borderRadius: BorderRadius.circular(2),
                                  ),
                                ),
                              ),

                              // Header Title
                              Text(
                                "Resoconto Viaggio",
                                style: Theme.of(context).textTheme.headlineSmall
                                    ?.copyWith(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                    ),
                              ),
                              const SizedBox(height: 5),
                              Text(
                                widget.session.vettura != "00000000000000000"
                                    ? "Veicolo: ${widget.session.vettura}"
                                    : "VIN del veicolo non disponibile",
                                style: TextStyle(
                                  color: Colors.white.withOpacity(0.6),
                                ),
                              ),

                              const SizedBox(height: 20),

                              if (widget.session.vettura ==
                                  "00000000000000000") ...[
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
                                const SizedBox(height: 30),
                              ],

                              // Main Stats Row
                              _buildMainStats(),

                              const SizedBox(height: 25),

                              // Section Title
                              _buildSectionTitle("Analisi"),
                              _buildEcoDetails(details),

                              const SizedBox(height: 25),

                              // Section Title
                              _buildSectionTitle("Zone Attraversate"),
                              _buildZonesList(),

                              // Bottom padding for scroll
                              const SizedBox(height: 40),
                            ],
                          ),
                        ),
                      ),
                    ),
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Text(
        title,
        style: const TextStyle(
          color: Colors.white,
          fontSize: 18,
          fontWeight: FontWeight.w600,
          letterSpacing: 0.5,
        ),
      ),
    );
  }

  Widget _buildMainStats() {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.05),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          _buildStatColumn(
            Icons.straighten,
            widget.session.km?.toStringAsFixed(1) ?? '-',
            "km",
            Colors.blueAccent,
          ),
          _buildDivider(),
          _buildStatColumn(
            Icons.eco,
            widget.session.ecoscore?.toStringAsFixed(0) ?? '-',
            "Score",
            getScoreColor(widget.session.ecoscore?.toInt() ?? 0),
          ),
          _buildDivider(),
          _buildStatColumn(
            Icons.cloud,
            widget.session.co2?.toStringAsFixed(2) ?? '-',
            "g CO2",
            Colors.grey,
          ),
          _buildDivider(),
          _buildStatColumn(
            Icons.grain_sharp,
            widget.session.pm?.toStringAsFixed(2) ?? '-',
            "PM",
            Colors.grey,
          ),
        ],
      ),
    );
  }

  Widget _buildDivider() {
    return Container(
      height: 30,
      width: 1,
      color: Colors.white.withOpacity(0.1),
    );
  }

  Widget _buildStatColumn(
    IconData icon,
    String value,
    String label,
    Color color,
  ) {
    return Column(
      children: [
        Icon(icon, color: color, size: 20),
        const SizedBox(height: 8),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        Text(
          label,
          style: TextStyle(color: Colors.white.withOpacity(0.5), fontSize: 12),
        ),
      ],
    );
  }

  Widget _buildEcoDetails(SessionDetailsDto details) {
    double avgScore = 0;
    if (details.rilevazioni.isNotEmpty) {
      avgScore =
          details.rilevazioni.map((e) => e.punteggio).reduce((a, b) => a + b) /
          details.rilevazioni.length;
    }

    return GlassCard(
      padding: const EdgeInsets.all(0),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white.withOpacity(0.03),
          borderRadius: BorderRadius.circular(16),
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.green.withOpacity(0.2),
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.analytics_outlined,
                color: Colors.greenAccent,
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    "Qualità Guida",
                    style: TextStyle(color: Colors.white70, fontSize: 13),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Text(
                        "${avgScore.toStringAsFixed(0)}%",
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(width: 8),
                      // Simple visual bar
                      Expanded(
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(4),
                          child: LinearProgressIndicator(
                            value: avgScore / 100,
                            backgroundColor: Colors.white10,
                            valueColor: AlwaysStoppedAnimation<Color>(
                              getScoreColor(avgScore.toInt()),
                            ),
                            minHeight: 6,
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
  }

  Widget _buildZonesList() {
    return FutureBuilder<SessionSummaryDto>(
      future: _sessionSummaryFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(
            child: Padding(
              padding: EdgeInsets.all(20.0),
              child: CircularProgressIndicator(strokeWidth: 2),
            ),
          );
        } else if (snapshot.hasError || !snapshot.hasData) {
          return const Text(
            "Dati zone non disponibili",
            style: TextStyle(color: Colors.white54),
          );
        }

        final summary = snapshot.data!;
        if (summary.comuniAttraversati.isEmpty) {
          return const Text(
            "Nessuna zona speciale attraversata.",
            style: TextStyle(color: Colors.white54),
          );
        }

        return Column(
          children: summary.comuniAttraversati.map((comune) {
            return Container(
              margin: const EdgeInsets.only(bottom: 12),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.05)),
              ),
              child: Theme(
                data: Theme.of(
                  context,
                ).copyWith(dividerColor: Colors.transparent),
                child: ExpansionTile(
                  iconColor: Colors.white70,
                  collapsedIconColor: Colors.white54,
                  leading: const Icon(
                    Icons.location_city,
                    color: Colors.white70,
                  ),
                  title: Text(
                    "Comune ${comune.istat}", // Replace with name if available
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  children: comune.zoneAttraversate.map((zona) {
                    return Padding(
                      padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                      child: Row(
                        children: [
                          Container(
                            width: 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: getScoreColor(zona.ecoscore.toInt()),
                              shape: BoxShape.circle,
                            ),
                          ),
                          const SizedBox(width: 12),
                          Text(
                            "Zona ${zona.zonaId}",
                            style: const TextStyle(color: Colors.white70),
                          ),
                          const Spacer(),
                          Text(
                            "${zona.ecoscore.toInt()}",
                            style: TextStyle(
                              color: getScoreColor(zona.ecoscore.toInt()),
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    );
                  }).toList(),
                ),
              ),
            );
          }).toList(),
        );
      },
    );
  }

  // Helper to color polylines
  List<Polyline> _buildPolylines(List<RilevazioneDto> rilevazioni) {
    List<Polyline> polylines = [];
    // Smoother width for lines
    const double strokeWidth = 5.0;

    for (int i = 0; i < rilevazioni.length - 1; i++) {
      final p1 = LatLng(
        rilevazioni[i].punto.coordinates[1],
        rilevazioni[i].punto.coordinates[0],
      );
      final p2 = LatLng(
        rilevazioni[i + 1].punto.coordinates[1],
        rilevazioni[i + 1].punto.coordinates[0],
      );

      polylines.add(
        Polyline(
          points: [p1, p2],
          color: getScoreColor(rilevazioni[i].punteggio),
          strokeWidth: strokeWidth,
          strokeCap: StrokeCap.round,
        ),
      );
    }
    return polylines;
  }
}
