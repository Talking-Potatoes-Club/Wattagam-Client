//package com.wattagam;
//
//import android.os.Build;
//import android.os.Bundle;
//import android.view.LayoutInflater;
//import android.view.View;
//import android.view.ViewGroup;
//import android.widget.FrameLayout;
//
//import androidx.annotation.Nullable;
//import androidx.annotation.RequiresApi;
//
//import com.google.ar.core.Config;
//import com.google.ar.core.Session;
//import com.google.ar.sceneform.rendering.Material;
//import com.google.ar.sceneform.rendering.MaterialFactory;
//import com.google.ar.sceneform.rendering.ModelRenderable;
//import com.google.ar.sceneform.rendering.Texture;
//import com.google.ar.sceneform.ux.ArFragment;
//
//import java.util.EnumSet;
//import java.util.Set;
//
//public class  ARCameraFragment extends ArFragment{
//
//    @Override
//    protected Config getSessionConfiguration(Session session) {
//        Config config = new Config(session);
//        config.setAugmentedFaceMode(Config.AugmentedFaceMode.MESH3D);
//
//        this.getArSceneView().setupSession(session);
//
//        return config;
//    }
//
//    @Override
//    protected Set<Session.Feature> getSessionFeatures() {
//        return EnumSet.of(Session.Feature.FRONT_CAMERA);
//    }
//
//    @Override
//    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
//        FrameLayout frameLayout = (FrameLayout) super.onCreateView(inflater, container, savedInstanceState);
//
//        getPlaneDiscoveryController().hide();
//        getPlaneDiscoveryController().setInstructionView(null);
//
//        return frameLayout;
//    }
//
//}

package com.wattagam;

import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;

import com.google.ar.core.AugmentedFace;
import com.google.ar.core.Config;
import com.google.ar.core.Frame;
import com.google.ar.core.Session;
import com.google.ar.sceneform.ArSceneView;
import com.google.ar.sceneform.rendering.Material;
import com.google.ar.sceneform.rendering.MaterialFactory;
import com.google.ar.sceneform.rendering.ModelRenderable;
import com.google.ar.sceneform.rendering.Renderable;
import com.google.ar.sceneform.rendering.Texture;
import com.google.ar.sceneform.ux.ArFragment;
import com.google.ar.sceneform.ux.AugmentedFaceNode;

import java.util.Collection;
import java.util.EnumSet;
import java.util.Set;

public class  ARCameraFragment extends ArFragment{

    public static ArSceneView arSceneView;

    private ModelRenderable modelRenderable;
    private Texture texture;
    private boolean isAdded = false;
    private Material FoxEarMaterial;

    @Override
    protected Config getSessionConfiguration(Session session) {
        Config config = new Config(session);
        config.setAugmentedFaceMode(Config.AugmentedFaceMode.MESH3D);

        this.getArSceneView().setupSession(session);

        return config;
    }

    @Override
    protected Set<Session.Feature> getSessionFeatures() {
        return EnumSet.of(Session.Feature.FRONT_CAMERA);
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    protected void setFilter(){
        Context context = getContext();
        Texture.builder()
                .setSource(context, R.drawable.butterfly_texture)
                .build()
                .thenAccept(texture-> {
                    MaterialFactory.makeTransparentWithTexture(context, texture)
                            .thenAccept(material -> {
                                FoxEarMaterial = material;
                                FoxEarMaterial.setFloat("metallic", 0);
                            });

                    ModelRenderable.builder()
                            .setSource(context, R.raw.butterfly_renderable)
                            .build()
                            .thenAccept(renderable -> {
                                modelRenderable = renderable;

                                modelRenderable.setMaterial(FoxEarMaterial);
                                modelRenderable.setShadowCaster(false);
                                modelRenderable.setShadowReceiver(false);
                            });
                });

        Texture.builder()
                .setSource(context, R.drawable.canonical_face_texture)
                .build()
                .thenAccept(texture -> {
                    this.texture = texture;
                });

        this.getArSceneView().setCameraStreamRenderPriority(Renderable.RENDER_PRIORITY_FIRST);

        this.getArSceneView().getScene().addOnUpdateListener(frameTime -> {
            if(modelRenderable == null || texture == null || FoxEarMaterial == null){
                return;
            }

            Frame frame = this.getArSceneView().getArFrame();

            Collection<AugmentedFace> augmentedFaces = frame.getUpdatedTrackables(AugmentedFace.class);

            for(AugmentedFace augmentedFace : augmentedFaces){
                if(isAdded) return;

                AugmentedFaceNode augmentedFaceNode = new AugmentedFaceNode(augmentedFace);
                augmentedFaceNode.setParent(this.getArSceneView().getScene());
                augmentedFaceNode.setFaceMeshTexture(texture);
                //augmentedFaceNode.setFaceRegionsRenderable(modelRenderable);

                isAdded = true;
            }
        });

        arSceneView = getArSceneView();
    }

    @RequiresApi(api = Build.VERSION_CODES.N)
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        FrameLayout frameLayout = (FrameLayout) super.onCreateView(inflater, container, savedInstanceState);

        getPlaneDiscoveryController().hide();
        getPlaneDiscoveryController().setInstructionView(null);

        this.setFilter();

        return frameLayout;
    }

}

