//package com.wattagam;
//
//import android.view.View;
//import android.widget.TextView;
//
//import androidx.annotation.NonNull;
//import androidx.constraintlayout.widget.ConstraintLayout;
//
//import com.facebook.react.uimanager.SimpleViewManager;
//import com.facebook.react.uimanager.ThemedReactContext;
//import com.facebook.react.uimanager.ViewManager;
//
//public class ARCameraViewManager extends SimpleViewManager<TextView> {
//    public static final String REACT_CLASS = "WattagamARCameraView";
//
//    @Override
//    public String getName() {
//        return REACT_CLASS;
//    }
//
////    @Override
////    protected ConstraintLayout createViewInstance(@NonNull ThemedReactContext reactContext) {
////        return new ConstraintLayout(new ARCameraActivity());
////    }
//    protected TextView createViewInstance(@NonNull ThemedReactContext reactContext) {
//        TextView tv = new TextView(reactContext);
//        tv.setText("Text");
//        return tv;
//    }
//
//}
package com.wattagam;

import android.os.Build;
import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.constraintlayout.widget.ConstraintLayout;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class ARCameraViewManager extends SimpleViewManager<ConstraintLayout> {
    public static final String REACT_CLASS = "WattagamARCameraView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected ConstraintLayout createViewInstance(@NonNull ThemedReactContext reactContext) {

        ConstraintLayout cl = new ConstraintLayout(reactContext);

        View.inflate(reactContext, R.layout.activity_arcamera, cl);

        return cl;
    }
}
