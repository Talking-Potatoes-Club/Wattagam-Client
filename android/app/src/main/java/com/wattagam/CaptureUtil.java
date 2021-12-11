package com.wattagam;

import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Build;
import android.os.Environment;
import android.os.Handler;
import android.os.HandlerThread;
import android.util.LruCache;
import android.view.PixelCopy;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.google.ar.sceneform.ArSceneView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class CaptureUtil {
    // 캡쳐가 저장될 외부 저장소
    public static String CAPTURE_PATH;

    /**
     * 특정 뷰만 캡쳐
     *
     * @param View
     */
//    public static String captureView(ArSceneView View) {
//        Bitmap captureView = getBitmapFromView(View);
//        FileOutputStream fos;
//
//        String strFolderPath = Environment.getExternalStorageDirectory().getAbsolutePath() ;//+ CAPTURE_PATH;
//        File folder = new File(strFolderPath);
//        if (!folder.exists()) {
//            folder.mkdirs();
//        }
//
//        String strFilePath = strFolderPath + "/" + System.currentTimeMillis() + ".png";
//        File fileCacheItem = new File(strFilePath);
//
//        try {
//            fos = new FileOutputStream(fileCacheItem);
//            captureView.compress(Bitmap.CompressFormat.PNG, 100, fos);
//
//            return "Success";
//
//        } catch (FileNotFoundException e) {
//            e.printStackTrace();
//            return e.getMessage();
//        }
//    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    public static String captureView(ArSceneView View, String filename)
    {
        final HandlerThread handlerThread = new HandlerThread("PixelCopier");
        handlerThread.start();
        PixelCopy.OnPixelCopyFinishedListener pixelCopyFinishedListener = new PixelCopy.OnPixelCopyFinishedListener() {
            @Override
            public void onPixelCopyFinished(int copyResult) { }
        };
        Bitmap bitmap = Bitmap.createBitmap(View.getWidth(), View.getHeight(),  Bitmap.Config.ARGB_8888);
        PixelCopy.request(View, bitmap, pixelCopyFinishedListener, new Handler(handlerThread.getLooper()));

        return SaveToFile(bitmap, filename);
    }

    public static String SaveToFile(Bitmap captureView, String filename){
        FileOutputStream fos;

        String strFolderPath = CAPTURE_PATH;
        File folder = new File(strFolderPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        String strFilePath = strFolderPath + "/" + filename + ".png";
        File fileCacheItem = new File(strFilePath);

        try {
            fos = new FileOutputStream(fileCacheItem);
            captureView.compress(Bitmap.CompressFormat.PNG, 100, fos);

            return strFilePath;

        } catch (FileNotFoundException e) {
            e.printStackTrace();
            return e.getMessage();
        }
    }

}

