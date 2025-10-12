import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:permission_handler/permission_handler.dart';

import 'data/connector/driver_elm327.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Colombo Test',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
      ),
      home: const MyHomePage(title: 'Colombo Test'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({super.key, required this.title});
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  Elm327Driver driver = Elm327Driver();
  bool _isConnected = false;
  bool _permissionsGranted = false;
  int? _rpm;
  int? _speed;
  double? _throttlePosition;
  double? _fuelRate;
  double? _engineExhaustFlow;
  double? _odometer;

  Future<void> _startUpdates() async {
    print("update");
    if (true) {
      print("update2");
      try {
        int rpm = await driver.rpm();
        double throttle = await driver.throttlePosition();
        int speed = await driver.speed();
        double fuelRate = await driver.fuelRate();
        double engineExhaustFlow = await driver.engineExhaustFlow();
        double odometer = await driver.odometer();
        if (mounted) {
          setState(() {
            _rpm = rpm;
            _throttlePosition = throttle;
            _speed = speed;
            _fuelRate = fuelRate;
            _engineExhaustFlow = engineExhaustFlow;
            _odometer = odometer;
          });
        }
      } catch (e) {
        // show toast with error
        print("Error during update: $e");
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Errore durante l\'aggiornamento: $e'),
            duration: Duration(seconds: 5),
          ),
        );
        /*if (mounted) {
          setState(() {
            _isConnected = false;
            _rpm = null;
            _throttlePosition = null;
            _speed = null;
          });
        }*/
      }
    }
  }


  @override
  void initState() {
    super.initState();
    _requestPermissions();
  }

  Future<void> _requestPermissions() async {
    Map<Permission, PermissionStatus> statuses = await [
      Permission.bluetoothScan,
      Permission.bluetoothConnect,
    ].request();

    if (statuses[Permission.bluetoothScan] == PermissionStatus.granted &&
        statuses[Permission.bluetoothConnect] == PermissionStatus.granted) {
      setState(() {
        _permissionsGranted = true;
      });
    } else {

      print("Bluetooth permissions were denied.");
    }
  }

  Future<void> _showDeviceSelectionDialog(List<Map<String, String>> devices) async {
    showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Seleziona un dispositivo'),
          content: SizedBox(
            width: double.maxFinite,
            child: ListView.builder(
              shrinkWrap: true,
              itemCount: devices.length,
              itemBuilder: (context, index) {
                final device = devices[index];
                return ListTile(
                  title: Text(device['name'] ?? 'Unknown Device'),
                  subtitle: Text(device['address'] ?? 'No address'),
                  onTap: () async {
                    bool result = await driver.connect(device['address'] ?? '');
                    if (!mounted) return;
                    Navigator.of(context).pop(); // Close the dialog
                  },
                );
              },
            ),
          ),
        );
      },
    );
  }

  Future<void> _connect() async {
    bool bluetoothStatus = await driver.isBluetoothEnabled();

    if (!mounted) return;
    if (!bluetoothStatus) {
      showDialog <void>(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Errore'),
            content: const Text('Il Bluetooth non è attivo.'),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );

    } else if (_permissionsGranted) {
      final devices = await driver.getPairedDevices();
      await _showDeviceSelectionDialog(devices);
    }

    bool isConnected = await driver.isConnected();
    setState(() {
      _isConnected = true;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Stato della connessione con l\'ELM327:'),
            Text(
              _isConnected ? 'Connesso' : 'Disconnesso',
            ),
            const SizedBox(height: 24),
            Text(
              _rpm != null ? 'RPM: $_rpm' : 'RPM: --',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Text(
              _speed != null ? 'Velocità: $_speed km/h' : 'Velocità: -- km/h',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Text(
              _throttlePosition != null ? 'Posizione Acceleratore: ${_throttlePosition!.toStringAsFixed(1)}%' : 'Posizione Acceleratore: --%',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Text(
              _fuelRate != null ? 'Fuel Rate: ${_fuelRate!.toStringAsFixed(2)} L/h' : 'Fuel Rate: -- L/h',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Text(
              _engineExhaustFlow != null ? 'Engine Exhaust Flow: ${_engineExhaustFlow!.toStringAsFixed(2)} g/s' : 'Engine Exhaust Flow: -- g/s',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 16),
            Text(
              _odometer != null ? 'Odometer: ${_odometer!.toStringAsFixed(2)} km' : 'Odometer: -- km',
              style: const TextStyle(fontSize: 24),
            ),
            const SizedBox(height: 32),
            MaterialButton(
              onPressed: () async {
                String version = await driver.elmVersion();
                print("version:$version");
                // Optionally show the version in a dialog or setState
              },
              child: const Text('Leggi versione ELM327 e scrivi in log'),
            ),
            MaterialButton(onPressed: _startUpdates, child: const Text('Start Updates') ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => _connect(),
        tooltip: 'connect',
        child: const Icon(Icons.link),
      ),
    );
  }
}
