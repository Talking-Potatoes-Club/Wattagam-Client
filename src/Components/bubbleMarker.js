import React from "react";
import {View, Image, StyleSheet} from "react-native";
import { theme } from "../Theme";

const BubbleMarker = props => {
  let src = "../../assets/bear.jpg";
  
  return (
    <View style={{alignItems: "center"}}>
      <Image
          style={styles.image}
          source={require(src)}
      />
      <View style={styles.triangle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  image : {
    borderColor: 'white',
    borderWidth: 4,
    borderRadius: 8,
    width: 70,
    height: 50,
    resizeMode: "cover",
  },
  triangle : {
    width: 16,
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: 'white',
  }
})

BubbleMarker.defaultProps = {
  src: "../../assets/bear.jpg",
}
export default BubbleMarker;