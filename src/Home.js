import React, { useState, useEffect } from "react";
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { ColorButton, ImageButton } from "./Components/Button";
import { images } from './Images'
import BubbleMarker from "./Components/bubbleMarker";
import LandMark from "./Components/LandMark";
import axios from "axios";
import { Constant } from "./Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isLoaded, setLoaded] = useState(false);

  const getMarkers = (x, y) => {
    const url = Constant.baseURL + '/location/getLocationCount?x=' + x + '&y=' + y;

    let token = "";
    AsyncStorage.getItem('token', (error, result) => {
      console.log("Token Loaded : " + result);
      token = result;
      axios.get(url, {headers: {'Authorization': `token ${token}`}})
        .then((response) => {
          setMarkers(response.data.mapLocation);
        })
        .catch((error) => {
          console.log("Home: " + error);
        });
      });
  }

  useEffect(() => {
    requestPermission();
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        setLatitude(Number(position.coords.latitude));
        setLongitude(Number(position.coords.longitude));
        getMarkers(Number(position.coords.latitude), Number(position.coords.longitude));
        setLoaded(true);
      },
      error => {
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      {isLoaded ? 
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
        {Object.values(markers).map((marker) => (
          <Marker
            key={marker.location_id}
            coordinate={{latitude: marker.x_location, longitude: marker.y_location}}
            onPress={()=>navigation.navigate('Articles', {
              id: marker.location_id,
            })}
          >
            {marker.location_count < 10 ? <BubbleMarker num={String(marker.location_count)} /> : <LandMark num={String(marker.location_count)}/>}
          </Marker> 
          ))
        }
          
      </MapView>
      : <View style={{flex: 1, backgroundColor: "#eeeeee"}}></View>}
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
          onPressOut={() => navigation.navigate('Camera', {
            latitude: latitude,
            longitude: longitude,
          })}
        />
        <ImageButton
          type={images.myPageIcon}
          size="50"
          whiteBackground="true"
          onPressOut={() => {
            AsyncStorage.getItem('user_id', (error, result)=>{
              navigation.navigate('MyPage', {id: result});
            })
          }}
        />
      </View>
    </View>
  );
};

export default Home;