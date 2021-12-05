import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import { ImageButton } from "./Components/Button";
import { images } from './Images';

const CameraPage = ({route, navigation}) => {
  return(
    <View>
      <Image
        source={require('../assets/temp.png')}
        style={styles.image}
      />
      <View style={{position: "absolute", top: 16, left: 16}}>
        <ImageButton
          type={images.backIcon}
          size="36"
          whiteBackground="true"
        />
      </View>
      <View style={{flexDirection: "row", width: '100%', position: "absolute", bottom: 30, alignItems: "center", justifyContent: "center"}}>
        <ImageButton
          type={images.cameraIcon}
          size="70"
          onPressOut={() => navigation.navigate('PostWrite', {
            latitude: route.params.latitude,
            longitude: route.params.longitude,
            imgsrc: "https://postfiles.pstatic.net/MjAyMTEyMDJfMTM1/MDAxNjM4NDA1NDI4MzEy.msE8INlF5qPSg6hzcQOKJHZuyqCTHDLLV5HOhnSbgigg.vR7DetbNv7HaE51i3B0ItMWK4jhD4mXYcX0CxEaQkaAg.JPEG.so0426yeon/20200217_143556.jpg?type=w966",
          })}
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