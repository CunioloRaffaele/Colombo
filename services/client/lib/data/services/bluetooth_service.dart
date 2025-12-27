import 'package:permission_handler/permission_handler.dart';

Future<bool> requestPermissions() async {
  Map<Permission, PermissionStatus> statuses = await [
    Permission.bluetoothScan,
    Permission.bluetoothConnect,
  ].request();

  if (statuses[Permission.bluetoothScan] == PermissionStatus.granted &&
      statuses[Permission.bluetoothConnect] == PermissionStatus.granted) {
    return true;
  } else {
    Future.error("Bluetooth permissions were denied.");
    return false;
  }
}
