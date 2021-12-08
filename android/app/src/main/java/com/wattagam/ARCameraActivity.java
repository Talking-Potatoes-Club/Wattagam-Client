package com.wattagam;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.widget.Toast;

import androidx.annotation.RequiresApi;

import com.facebook.react.ReactActivity;
import com.google.ar.core.AugmentedFace;
import com.google.ar.core.Frame;
import com.google.ar.sceneform.ArSceneView;
import com.google.ar.sceneform.rendering.Material;
import com.google.ar.sceneform.rendering.MaterialFactory;
import com.google.ar.sceneform.rendering.ModelRenderable;
import com.google.ar.sceneform.rendering.Renderable;
import com.google.ar.sceneform.rendering.Texture;
import com.google.ar.sceneform.ux.AugmentedFaceNode;

import java.util.Collection;

public class ARCameraActivity extends ReactActivity {
    private ModelRenderable modelRenderable;
    private Texture texture;
    private boolean isAdded = false;
    private Material FoxEarMaterial;

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_arcamera);

        ARCameraFragment customARFragment = (ARCameraFragment) getSupportFragmentManager().findFragmentById(R.id.arFragment);

        Texture.builder()
                .setSource(this, R.drawable.butterfly_texture)
                .build()
                .thenAccept(texture-> {
                    MaterialFactory.makeTransparentWithTexture(this, texture)
                            .thenAccept(material -> {
                                FoxEarMaterial = material;
                                FoxEarMaterial.setFloat("metallic", 0);
                            });

                    ModelRenderable.builder()
                            .setSource(this, R.raw.butterfly_renderable)
                            .build()
                            .thenAccept(renderable -> {
                                modelRenderable = renderable;

                                modelRenderable.setMaterial(FoxEarMaterial);
                                modelRenderable.setShadowCaster(false);
                                modelRenderable.setShadowReceiver(false);
                            });
                });

        Texture.builder()
                .setSource(this, R.drawable.canonical_face_texture)
                .build()
                .thenAccept(texture -> {
                    this.texture = texture;
                });

        customARFragment.getArSceneView().setCameraStreamRenderPriority(Renderable.RENDER_PRIORITY_FIRST);

        customARFragment.getArSceneView().getScene().addOnUpdateListener(frameTime -> {
            if(modelRenderable == null || texture == null || FoxEarMaterial == null){
                return;
            }

            Frame frame = customARFragment.getArSceneView().getArFrame();

            Collection<AugmentedFace> augmentedFaces = frame.getUpdatedTrackables(AugmentedFace.class);

            for(AugmentedFace augmentedFace : augmentedFaces){
                if(isAdded) return;

                AugmentedFaceNode augmentedFaceNode = new AugmentedFaceNode(augmentedFace);
                augmentedFaceNode.setParent(customARFragment.getArSceneView().getScene());
                augmentedFaceNode.setFaceMeshTexture(texture);
                //augmentedFaceNode.setFaceRegionsRenderable(modelRenderable);

                isAdded = true;
            }
        });
    }
//    @RequiresApi(api = Build.VERSION_CODES.N)
//    public void createCapture(View view) {
//        PermissionManager.verifyStoragePermissions(this);
//
//        ARCameraFragment customARFragment = (ARCameraFragment) getSupportFragmentManager().findFragmentById(R.id.arFragment);
//        ArSceneView arFragment = customARFragment.getArSceneView();
//        String msg = CaptureUtil.captureView(arFragment);
//        Toast.makeText(getApplicationContext(), msg,
//                Toast.LENGTH_LONG).show();
//    }
}
