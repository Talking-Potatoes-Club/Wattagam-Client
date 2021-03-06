import React, {useEffect} from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import { ImageButton } from "./Components/Button";
import { Constant } from "./Constant";
import { images } from './Images';
import { requireNativeComponent } from 'react-native';
import { PermissionsAndroid } from "react-native";
import ARCameraModule from "./ARCameraModule";

const Example = requireNativeComponent('WattagamARCameraView');


const CameraPage = ({route, navigation}) => {

  useEffect(()=> {
    const requestPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "카메라 접근 권한",
            message: "사진 촬영을 위해 카메라 사용 권한을 '허용'으로 바꿔주세요.",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("granted!");
          return true;
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const requestPermission2 = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "저장소 접근 권한",
            message: "사진 저장을 위해 저장소 접근 권한을 '허용'으로 바꿔주세요.",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("granted!");
          return true;
        }
      } catch (err) {
        console.warn(err);
      }
    };
    const requestPermission3 = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "저장소 읽기 권한",
            message: "사진 저장을 위해 저장소 접근 권한을 '허용'으로 바꿔주세요.",
            buttonNegative: "취소",
            buttonPositive: "확인"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("granted!");
          return true;
        }
      } catch (err) {
        console.warn(err);
      }
    };
    requestPermission();
    requestPermission2();
    requestPermission3();
  },[]);



  return(
    <View style={{width: '100%', height: '100%'}}>
      <Example style={{width: '100%', height: '100%'}} />
      <View style={{flexDirection: "row", width: '100%', position: "absolute", bottom: 30, alignItems: "center", justifyContent: "center"}}>
        <ImageButton
          type={images.cameraIcon}
          size="70"
          onPressOut={() => {
            ARCameraModule.capture("filename"); 
            navigation.navigate('PostWrite', {
              latitude: route.params.latitude,
              longitude: route.params.longitude,
              //imgsrc: Constant.testImg,
              imgsrc: 'file:///data/user/0/com.wattagam/files/filename.png',
            });
          //  console.log(feature);
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
})
export default CameraPage;