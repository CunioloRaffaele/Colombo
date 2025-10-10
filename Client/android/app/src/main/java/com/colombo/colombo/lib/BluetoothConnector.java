package com.colombo.colombo.lib;

import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothSocket;
import android.util.Log;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.UUID;
import android.content.Context;
import android.os.Build;

// Note: Bluetooth operations are blocking. Threading/asynchronous execution is handled in Dart (Flutter).
// If you need to avoid blocking the Android main thread, ensure Dart calls these methods asynchronously.

public class BluetoothConnector {
    private static final String TAG = "BluetoothConnector";
    // Standard Serial Port Profile (SPP) UUID
    private static final UUID SPP_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");

    private final BluetoothAdapter bluetoothAdapter;
    private BluetoothSocket socket;
    private OutputStream outputStream;
    private InputStream inputStream;

    public BluetoothConnector(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            BluetoothManager bluetoothManager = context.getSystemService(BluetoothManager.class);
            if (bluetoothManager != null) {
                bluetoothAdapter = bluetoothManager.getAdapter();
            } else {
                bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
            }
        } else {
            bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
        }
    }

    public boolean isBluetoothEnabled() {
        return bluetoothAdapter != null && bluetoothAdapter.isEnabled();
    }

    public List<Map<String, String>> getPairedDevices() {
        List<Map<String, String>> devicesList = new ArrayList<>();
        if (bluetoothAdapter == null) {
            Log.e(TAG, "Bluetooth adapter is null.");
            return devicesList;
        }
        try {
            // This requires BLUETOOTH_CONNECT permission on Android 12+
            Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
            if (!pairedDevices.isEmpty()) {
                for (BluetoothDevice device : pairedDevices) {
                    Map<String, String> deviceMap = new HashMap<>();
                    // This requires BLUETOOTH_CONNECT permission on Android 12+
                    deviceMap.put("name", device.getName());
                    deviceMap.put("address", device.getAddress());
                    devicesList.add(deviceMap);
                }
            }
        } catch (SecurityException e) {
            Log.e(TAG, "Bluetooth permission missing for getPairedDevices", e);
        }
        return devicesList;
    }

    public boolean connectToSerial(String address) {
        if (bluetoothAdapter == null || address == null) {
            Log.e(TAG, "Bluetooth adapter or address is null.");
            return false;
        }
        try {
            BluetoothDevice device = bluetoothAdapter.getRemoteDevice(address);
            // This requires BLUETOOTH_CONNECT permission on Android 12+
            socket = device.createRfcommSocketToServiceRecord(SPP_UUID);
            socket.connect(); // Blocking call
            outputStream = socket.getOutputStream();
            inputStream = socket.getInputStream();
            Log.d(TAG, "Connected to " + address);
            return true;
        } catch (IOException e) {
            Log.e(TAG, "Connection failed", e);
            disconnect(); // Clean up on failure
            return false;
        } catch (SecurityException e) {
            Log.e(TAG, "Bluetooth permission missing", e);
            return false;
        } catch (IllegalArgumentException e) {
            Log.e(TAG, "Invalid Bluetooth address", e);
            return false;
        }
    }

    public void disconnect() {
        try {
            if (outputStream != null) outputStream.close();
            if (inputStream != null) inputStream.close();
            if (socket != null) socket.close();
        } catch (IOException e) {
            Log.e(TAG, "Failed to close resources", e);
        } finally {
            outputStream = null;
            inputStream = null;
            socket = null;
            Log.d(TAG, "Disconnected.");
        }
    }

    public boolean isConnected() {
        return socket != null && socket.isConnected();
    }

    public String sendSerialCommand(String command) {
        if (!isConnected()) {
            return "Error: Not connected";
        }
        try {
            // ELM327 commands must end with a carriage return
            outputStream.write((command + "\r").getBytes());
            outputStream.flush();

            // Read response until the '>' prompt character
            StringBuilder response = new StringBuilder();
            char c;
            while ((c = (char) inputStream.read()) != '>') {
                response.append(c);
            }
            // Clean up the response string
            return response.toString().trim().replace("\r", " ");
        } catch (IOException e) {
            Log.e(TAG, "Error sending command", e);
            disconnect(); // Assume connection is lost
            return "Error: " + e.getMessage();
        }
    }
}
