import React from "react";
import {View, Image, Text, StyleSheet} from "react-native";
import { theme } from "../Theme";
import BubbleMarker from "./bubbleMarker";

const LandMark = props => {
  if(Number(props.num) > 20){
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
  else {
    return(
      <View>
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