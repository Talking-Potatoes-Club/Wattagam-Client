import React, { useState, useEffect } from "react";
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { ColorButton, ImageButton } from "./Components/Button";
import { images } from './Images'
import BubbleMarker from "./Components/bubbleMarker";
import LandMark from "./Components/LandMark";
import axios from "axios";

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
  const [latitude, setLatitude] = useState(37.555141);
  const [longitude, setLongitude] = useState(126.936949);
  const [markers, setMarkers] = useState([]);

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

  const getMarkers = (x, y) => {
    const url = 'http://wattagam-test-server.herokuapp.com/location/getLocationCount?x=' + x + '&y=' + y;

    axios.get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

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
      >
        <Marker coordinate={{latitude: 37.556448, longitude: 126.937166}}>
          <BubbleMarker num="9"/>
        </Marker>

        <Marker coordinate={{latitude: 37.557008, longitude: 126.936718}}>
          <LandMark num="25"/>
        </Marker>

      </MapView>
      <View style={{flexDirection: "row", width: '100%', position: "absolute", bottom: 30, alignItems: "center", justifyContent: "center"}}>
        <ImageButton
          type={images.peopleIcon}
          size="50"
          whiteBackground="true"
          onPressOut={() => navigation.navigate('Articles')}
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