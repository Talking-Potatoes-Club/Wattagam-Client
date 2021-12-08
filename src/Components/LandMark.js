import React from "react";
import {View, Image, Text, StyleSheet} from "react-native";
import { theme } from "../Theme";
import BubbleMarker from "./bubbleMarker";

const LandMark = props => {
  if(Number(props.num) > 30){
    return (
      <View>
        <BubbleMarker
          num={props.num}
        />
        <Image
          style={styles.image}
          source={require('../../assets/landmark_3x.png')}
        />
      </View>
    )
  }
  else if (Number(props.num) > 20) {
    return (
      <View>
        <BubbleMarker
          num={props.num}
        />
        <Image
          style={styles.image}
          source={require('../../assets/landmark_2x.png')}
        />
      </View>
    )
  }
  else if (Number(props.num) > 10) {
    return (
      <View>
        <BubbleMarker
          num={props.num}
        />
        <Image
          style={styles.image}
          source={require('../../assets/landmark_1x.png')}
        />
      </View>
    )
  }
}

const styles=StyleSheet.create({
  image: {
    marginTop: 5,
  }
})

export default LandMark;