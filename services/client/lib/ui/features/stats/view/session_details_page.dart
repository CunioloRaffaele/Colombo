import 'package:colombo/data/models/reports_dto.dart';
import 'package:colombo/data/services/reports_service.dart';
import 'package:colombo/ui/widgets/glass_card.dart';
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
    _sessionDetailsFuture = _reportsService.getSessionDetails(
      widget.session.id,
    );
    _sessionSummaryFuture = _reportsService.getSessionSummary(
      widget.session.id,
    );
  }

  Color _getScoreColor(int score) {
    if (score >= 80) return Colors.green;
    if (score >= 60) return Colors.lightGreen;
    if (score >= 40) return Colors.yellow;
    if (score >= 20) return Colors.orange;
    return Colors.red;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: AppBar(
        backgroundColor: Colors.black.withOpacity(0.5),
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text(
          "Dettaglio Sessione ${widget.session.id}",
          style: const TextStyle(color: Colors.white),
        ),
      ),
      body: Stack(
        children: [
          // Background
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFF1E2A38), Color(0xFF0F172A)],
              ),
            ),
          ),

          FutureBuilder<SessionDetailsDto>(
            future: _sessionDetailsFuture,
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return const Center(child: CircularProgressIndicator());
              } else if (snapshot.hasError) {
                return Center(
                  child: Text(
                    "Errore: ${snapshot.error}",
                    style: const TextStyle(color: Colors.white),
                  ),
                );
              } else if (!snapshot.hasData) {
                return const Center(
                  child: Text(
                    "Nessun dato disponibile",
                    style: TextStyle(color: Colors.white),
                  ),
                );
              }

              final details = snapshot.data!;
              final points = details.rilevazioni.map((r) {
                // GeoJSON is [long, lat]
                return LatLng(r.punto.coordinates[1], r.punto.coordinates[0]);
              }).toList();

              // Calculate bounds to center the map
              LatLngBounds? bounds;
              if (points.isNotEmpty) {
                bounds = LatLngBounds.fromPoints(points);
              }

              return Column(
                children: [
                  Expanded(
                    flex: 2,
                    child: FlutterMap(
                      options: MapOptions(
                        initialCenter: points.isNotEmpty
                            ? points.first
                            : const LatLng(45.4642, 9.1900),
                        initialZoom: 13,
                        initialCameraFit: bounds != null
                            ? CameraFit.bounds(
                                bounds: bounds,
                                padding: const EdgeInsets.all(50),
                              )
                            : null,
                      ),
                      children: [
                        TileLayer(
                          urlTemplate:
                              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                          userAgentPackageName: 'com.example.colombo',
                        ),
                        PolylineLayer(
                          polylines: _buildPolylines(details.rilevazioni),
                        ),
                      ],
                    ),
                  ),
                  Expanded(
                    flex: 3,
                    child: Container(
                      padding: const EdgeInsets.all(20),
                      decoration: const BoxDecoration(
                        color: Color(0xFF1E2A38),
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(30),
                          topRight: Radius.circular(30),
                        ),
                      ),
                      child: SingleChildScrollView(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            _buildSummaryCard(),
                            const SizedBox(height: 20),
                            const Text(
                              "Analisi Eco",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            _buildEcoDetails(details),
                            const SizedBox(height: 20),
                            const Text(
                              "Zone Attraversate",
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            const SizedBox(height: 10),
                            _buildZonesList(),
                            const SizedBox(height: 20),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildZonesList() {
    return FutureBuilder<SessionSummaryDto>(
      future: _sessionSummaryFuture,
      builder: (context, snapshot) {
        if (snapshot.connectionState == ConnectionState.waiting) {
          return const Center(child: CircularProgressIndicator());
        } else if (snapshot.hasError) {
          return Text(
            "Errore caricamento zone: ${snapshot.error}",
            style: const TextStyle(color: Colors.red),
          );
        } else if (!snapshot.hasData) {
          return const Text(
            "Nessuna informazione sulle zone",
            style: TextStyle(color: Colors.white70),
          );
        }

        final summary = snapshot.data!;
        if (summary.comuniAttraversati.isEmpty) {
          return const Text(
            "Nessuna zona attraversata registrata",
            style: TextStyle(color: Colors.white70),
          );
        }

        return Column(
          children: summary.comuniAttraversati.map((comune) {
            return GlassCard(
              padding: const EdgeInsets.all(15),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(
                        Icons.location_city,
                        color: Colors.white70,
                        size: 20,
                      ),
                      const SizedBox(width: 10),
                      Text(
                        "Comune ISTAT: ${comune.istat}",
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  ...comune.zoneAttraversate.map((zona) {
                    return Padding(
                      padding: const EdgeInsets.only(left: 30, top: 5),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            "Zona ${zona.zonaId}",
                            style: const TextStyle(
                              color: Colors.white70,
                              fontSize: 14,
                            ),
                          ),
                          Row(
                            children: [
                              Text(
                                "EcoScore: ",
                                style: const TextStyle(
                                  color: Colors.white70,
                                  fontSize: 12,
                                ),
                              ),
                              Text(
                                zona.ecoscore.toStringAsFixed(0),
                                style: TextStyle(
                                  color: _getScoreColor(zona.ecoscore.round()),
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    );
                  }),
                ],
              ),
            );
          }).toList(),
        );
      },
    );
  }

  List<Polyline> _buildPolylines(List<RilevazioneDto> rilevazioni) {
    List<Polyline> polylines = [];
    for (int i = 0; i < rilevazioni.length - 1; i++) {
      final p1 = LatLng(
        rilevazioni[i].punto.coordinates[1],
        rilevazioni[i].punto.coordinates[0],
      );
      final p2 = LatLng(
        rilevazioni[i + 1].punto.coordinates[1],
        rilevazioni[i + 1].punto.coordinates[0],
      );

      // Use the score of the segment (average or start point)
      final score = rilevazioni[i].punteggio;

      polylines.add(
        Polyline(
          points: [p1, p2],
          color: _getScoreColor(score),
          strokeWidth: 4.0,
        ),
      );
    }
    return polylines;
  }

  Widget _buildSummaryCard() {
    return GlassCard(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildInfoItem(
                Icons.directions_car,
                "Vettura",
                widget.session.vettura,
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildInfoItem(
                Icons.straighten,
                "Distanza",
                "${widget.session.km?.toStringAsFixed(1) ?? '-'} km",
              ),
              _buildInfoItem(
                Icons.eco,
                "EcoScore",
                "${widget.session.ecoscore?.toStringAsFixed(0) ?? '-'}",
              ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _buildInfoItem(
                Icons.cloud,
                "CO2",
                "${widget.session.co2?.toStringAsFixed(1) ?? '-'} g",
              ),
              _buildInfoItem(
                Icons.air,
                "PM",
                "${widget.session.pm?.toStringAsFixed(4) ?? '-'} g",
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildInfoItem(IconData icon, String label, String value) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Icon(icon, color: Colors.white70, size: 16),
            const SizedBox(width: 5),
            Text(
              label,
              style: const TextStyle(color: Colors.white70, fontSize: 12),
            ),
          ],
        ),
        const SizedBox(height: 5),
        Text(
          value,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ],
    );
  }

  Widget _buildEcoDetails(SessionDetailsDto details) {
    // Calculate average score
    double avgScore = 0;
    if (details.rilevazioni.isNotEmpty) {
      avgScore =
          details.rilevazioni.map((e) => e.punteggio).reduce((a, b) => a + b) /
          details.rilevazioni.length;
    }

    return GlassCard(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: [
          Row(
            children: [
              const Icon(Icons.analytics, color: Colors.greenAccent, size: 30),
              const SizedBox(width: 15),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      "Punteggio Medio Rilevato",
                      style: TextStyle(color: Colors.white70, fontSize: 14),
                    ),
                    Text(
                      "${avgScore.toStringAsFixed(1)} / 100",
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 24,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 15),
          const Text(
            "La mappa mostra il percorso effettuato. I colori indicano l'efficienza di guida in ogni tratto: verde per una guida ecologica, rosso per una guida meno efficiente.",
            style: TextStyle(color: Colors.white70, fontSize: 14),
          ),
        ],
      ),
    );
  }
}
