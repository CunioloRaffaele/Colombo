package com.colombo.colombo.lib;

import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.BinaryMessenger;
import android.content.Context;
import android.os.Handler;
import android.os.Looper;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class BluetoothChannel implements MethodCallHandler {
    private final BluetoothConnector connector;
    private final ExecutorService executor; // Thread pool for Bluetooth operations
    private final Handler mainHandler;      // Handler to return to the UI thread

    public BluetoothChannel(Context context) {
        this.connector = new BluetoothConnector(context);
        this.executor = Executors.newSingleThreadExecutor(); // Executes tasks one at a time in order
        this.mainHandler = new Handler(Looper.getMainLooper());
    }

    public static void registerWith(BinaryMessenger messenger, Context context) {
        MethodChannel channel = new MethodChannel(messenger, "bluetooth_channel");
        channel.setMethodCallHandler(new BluetoothChannel(context));
    }

    @Override
    public void onMethodCall(MethodCall call, MethodChannel.Result result) {
        // Execute Bluetooth operations in a separate thread
        executor.execute(() -> {
            try {
                Object response = null;
                boolean success = true;

                switch (call.method) {
                    case "isBluetoothEnabled":
                        response = connector.isBluetoothEnabled();
                        break;
                    case "getPairedDevices":
                        response = connector.getPairedDevices();
                        break;
                    case "connectToSerial":
                        String address = call.argument("address");
                        response = connector.connectToSerial(address);
                        break;
                    case "disconnect":
                        connector.disconnect();
                        response = null;
                        break;
                    case "isConnected":
                        response = connector.isConnected();
                        break;
                    case "sendSerialCommand":
                        String command = call.argument("command");
                        response = connector.sendSerialCommand(command);
                        break;
                    default:
                        success = false;
                }

                final Object finalResponse = response;
                final boolean finalSuccess = success;

                // Back to main thread to return result
                mainHandler.post(() -> {
                    if (finalSuccess) {
                        result.success(finalResponse);
                    } else {
                        result.notImplemented();
                    }
                });

            } catch (Exception e) {
                mainHandler.post(() -> result.error("ERROR", e.getMessage(), null));
            }
        });
    }
}
