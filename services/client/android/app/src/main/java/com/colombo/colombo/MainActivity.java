package com.colombo.colombo;

import androidx.annotation.NonNull;
import com.colombo.colombo.lib.BluetoothChannel;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;

public class MainActivity extends FlutterActivity {
    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        BluetoothChannel.registerWith(flutterEngine.getDartExecutor().getBinaryMessenger(), this);
    }
}