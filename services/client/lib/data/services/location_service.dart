import 'package:geolocator/geolocator.dart';

final LocationSettings locationSettings = LocationSettings(
  accuracy: LocationAccuracy.bestForNavigation,
  distanceFilter: 10,
);

/// Verify if location services are enabled on the device and if permissions are granted.
Future<bool> verifyLocationPermissions() async {
  bool serviceEnabled;
  LocationPermission permission;

  // Test if location services are enabled.
  serviceEnabled = await Geolocator.isLocationServiceEnabled();
  if (!serviceEnabled) {
    // Location services are not enabled don't continue
    // accessing the position and request users of the
    // App to enable the location services.
    return Future.error('I servizi di localizzazione non sono abilitati.');
  }

  permission = await Geolocator.checkPermission();
  if (permission == LocationPermission.denied) {
    permission = await Geolocator.requestPermission();
    if (permission == LocationPermission.denied) {
      // Permissions are denied
      return Future.error('Permessi di localizzazione negati');
    }
  }

  if (permission == LocationPermission.deniedForever) {
    // Permissions are denied forever.
    return Future.error(
      'I permessi di localizzazione sono permanentemente negati, non possiamo richiedere i permessi.',
    );
  }
  return true;
}

/// Determine the current position of the device.
///
/// When the location services are not enabled or permissions
/// are denied the `Future` will return an error.
Future<Position> determinePosition() async {
  await verifyLocationPermissions();
  return await Geolocator.getCurrentPosition(
    locationSettings: locationSettings,
  );
}
