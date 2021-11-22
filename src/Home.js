import React, { useState, useEffect } from "react";
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { ColorButton, ImageButton } from "./Components/Button";
import { images } from './Images'

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "위치 정보 권한",
        message: "왔다감 이용을 위해 위치 정보 사용 권한을 '허용'으로 바꿔주세요.",
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

const Home = ({navigation}) => {
  const [latitude, setLatitude] = useState(37.5504);
  const [longitude, setLongitude] = useState(126.9407);
  
  const granted = requestPermission();
  
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLatitude(Number(position.coords.latitude));
        setLongitude(Number(position.coords.longitude));
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.002,
        }}
      />
      <View style={{flexDirection: "row", width: '100%', position: "absolute", bottom: 30, alignItems: "center", justifyContent: "center"}}>
        <ImageButton
          type={images.peopleIcon}
          size="50"
          whiteBackground="true"
        />
        <ImageButton
          type={images.cameraIcon}
          size="70"
          onPressOut={() => navigation.navigate('Camera')}
        />
        <ImageButton
          type={images.myPageIcon}
          size="50"
          whiteBackground="true"
        />
      </View>
    </View>
  );
};

export default Home;