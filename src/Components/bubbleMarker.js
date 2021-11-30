import React from "react";
import {View, Text, StyleSheet} from "react-native";
import { theme } from "../Theme";

const BubbleMarker = props => {
  return (
    <View style={{alignItems: "center"}}>
      <View style={styles.box}>
        <Text style={styles.text}>{props.num}</Text>
      </View>
      <View style={styles.triangle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  box : {
    borderColor: theme.mainColor,
    backgroundColor: theme.mainColor,
    borderWidth: 4,
    borderRadius: 8,
    width: 50,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  triangle : {
    width: 8,
    borderStyle: "solid",
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 15,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: theme.mainColor,
  },
  text : {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
})

BubbleMarker.defaultProps = {
  src: "../../assets/bear.jpg",
}
export default BubbleMarker;