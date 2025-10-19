package com.colombo.colombo.lib;

import io.flutter.plugin.common.MethodCall;
import io.flutter.plugin.common.MethodChannel;
import io.flutter.plugin.common.MethodChannel.MethodCallHandler;
import io.flutter.plugin.common.BinaryMessenger;
import android.content.Context;
import android.os.Build;

public class BluetoothChannel implements MethodCallHandler {
    private final BluetoothConnector connector;

    public BluetoothChannel(Context context) {
        this.connector = new BluetoothConnector(context);
    }

    public static void registerWith(BinaryMessenger messenger, Context context) {
        MethodChannel channel = new MethodChannel(messenger, "bluetooth_channel");
        channel.setMethodCallHandler(new BluetoothChannel(context));
    }

    @Override
    public void onMethodCall(MethodCall call, MethodChannel.Result result) {
        switch (call.method) {
            case "isBluetoothEnabled":
                result.success(connector.isBluetoothEnabled());
                break;
            case "getPairedDevices":
                result.success(connector.getPairedDevices());
                break;
            case "connectToSerial":
                String address = call.argument("address");
                result.success(connector.connectToSerial(address));
                break;
            case "disconnect":
                connector.disconnect();
                result.success(null);
                break;
            case "isConnected":
                result.success(connector.isConnected());
                break;
            case "sendSerialCommand":
                String command = call.argument("command");
                String response = connector.sendSerialCommand(command);
                result.success(response);
                break;
            default:
                result.notImplemented();
        }
    }
}
