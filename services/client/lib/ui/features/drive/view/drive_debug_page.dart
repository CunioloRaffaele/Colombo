import 'package:flutter/material.dart';
import '../../../../data/global_drive_state.dart';
import '../../../../data/services/drive_sessions_service.dart';

class DriveDebugPage extends StatelessWidget {
  const DriveDebugPage({super.key});

  @override
  Widget build(BuildContext context) {
    final service = DriveSessionService();

    return StreamBuilder<DriveState>(
      stream: service.stream,
      initialData: service.currentState,
      builder: (context, snapshot) {
        final state = snapshot.data ?? DriveState();

        return Scaffold(
          appBar: AppBar(
            title: const Text('Drive State Debug (Live)'),
            backgroundColor: Colors.transparent,
            foregroundColor: Colors.white,
          ),
          backgroundColor: const Color(0xFF0E1116),
          body: SafeArea(
            child: ListView(
              padding: const EdgeInsets.all(16.0),
              children: [
                _buildSection('Connection', [
                  _buildItem(
                    'Pipe Connected',
                    state.isPipeConnected.toString(),
                  ),
                  _buildItem('VIN', state.vin),
                ]),
                _buildSection('Sensors', [
                  _buildItem('RPM', state.rpm.toString()),
                  _buildItem('Speed', '${state.speed} km/h'),
                  _buildItem(
                    'Throttle',
                    '${state.throttlePosition.toStringAsFixed(1)}%',
                  ),
                  _buildItem('Coolant Temp', '${state.coolantTemp}°C'),
                  _buildItem(
                    'Fuel Rate',
                    '${state.fuelRate.toStringAsFixed(2)} L/h',
                  ),
                  _buildItem(
                    'Odometer',
                    '${state.odometer.toStringAsFixed(1)} km',
                  ),
                  _buildItem(
                    'Exhaust Flow',
                    '${state.engineExhaustFlow.toStringAsFixed(2)} g/s',
                  ),
                  _buildItem(
                    'Fuel Level',
                    '${state.fuelTankLevel.toStringAsFixed(1)}%',
                  ),
                  _buildItem(
                    'Acceleration',
                    '${state.acceleration.toStringAsFixed(2)} m/s²',
                  ),
                ]),
                _buildSection('Eco & Zone', [
                  _buildItem('Ecoscore', state.ecoscore.toStringAsFixed(2)),
                  _buildItem('In Zone', state.isInZone.toString()),
                  _buildItem('Zone Name', state.zoneName ?? 'N/A'),
                ]),
                _buildSection('Location', [
                  _buildItem(
                    'Latitude',
                    state.position?.latitude.toString() ?? 'N/A',
                  ),
                  _buildItem(
                    'Longitude',
                    state.position?.longitude.toString() ?? 'N/A',
                  ),
                  _buildItem(
                    'Altitude',
                    state.position?.altitude.toString() ?? 'N/A',
                  ),
                  _buildItem(
                    'Accuracy',
                    state.position?.accuracy.toString() ?? 'N/A',
                  ),
                  _buildItem(
                    'Speed (GPS)',
                    state.position?.speed.toString() ?? 'N/A',
                  ),
                ]),
                _buildSection('Supported PIDs', [
                  if (state.supportedPids.isEmpty)
                    _buildItem('None', 'No PIDs detected')
                  else
                    ...state.supportedPids.entries.map(
                      (e) => _buildItem(e.key, e.value.toString()),
                    ),
                ]),
                _buildSection('Other', [
                  _buildItem(
                    'Something Broken',
                    state.isSomethingBroken?.toString() ?? 'null',
                  ),
                  _buildItem(
                    'Latest Update to server',
                    state.lastUpdated?.toUtc().toString() ?? 'N/A',
                  ),
                  _buildItem('Buffer Size', state.positionInBuffer.toString()),
                  _buildItem('Server Session ID', state.sessionId.toString()),
                  _buildItem(
                    'Initial Odometer',
                    state.initialOdometer.toStringAsFixed(1),
                  ),
                ]),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildSection(String title, List<Widget> children) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Colors.tealAccent,
            ),
          ),
        ),
        Card(
          color: Colors.white.withOpacity(0.05),
          child: Column(children: children),
        ),
        const SizedBox(height: 10),
      ],
    );
  }

  Widget _buildItem(String label, String value) {
    return ListTile(
      title: Text(
        label,
        style: const TextStyle(
          fontWeight: FontWeight.w500,
          color: Colors.white70,
        ),
      ),
      trailing: Text(value, style: const TextStyle(color: Colors.white)),
      dense: true,
    );
  }
}
