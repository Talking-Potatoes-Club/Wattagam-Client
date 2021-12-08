package com.wattagam;

import android.os.Build;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ARCameraModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    ARCameraModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @Override
    public String getName(){
        return "ARCameraModule";
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @ReactMethod
    public void capture(String filename){
        CaptureUtil.captureView(ARCameraFragment.arSceneView, filename);
    }
}