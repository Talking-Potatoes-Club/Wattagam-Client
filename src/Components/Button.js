import React from "react";
import { theme } from "../Theme"
import { StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';
import { ThemeColors } from "react-navigation";

const ColorButton = props => {
  return (
    <TouchableOpacity
      style={{
        flex: Number(props.flex),
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: props.color,
        borderRadius: theme.radius,
        borderColor: props.color,
        borderWidth: 1,
        padding: 8,
        margin: 4,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: 'white' }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const OutlineButton = props => {
  return (
    <TouchableOpacity
      style={{
        flex: Number(props.flex),
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius,
        borderColor: props.color,
        borderWidth: 1,
        padding: 8,
        margin: 4,
      }}
      onPress={props.onPress}
    >
      <Text style={{ color: props.color }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const ImageButton = (props) => {
  let BGColor = props.color;
  let ContentColor = "#ffffff";

  if (props.whiteBackground == "true"){
    BGColor = "#ffffff";
    ContentColor = props.color;
  }
  
  return (
    <TouchableOpacity
      onPressOut={props.onPressOut}
      style={{
        padding: 8,
        margin: 8,
        width: Number(props.size),
        height: Number(props.size),
        borderRadius: Number(props.size) / 2,
        backgroundColor: BGColor,
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
          android: {
            elevation: 5,
          }
        })
      }}
    >
      <Image
        style={{
          width: Number(props.size) * 0.7,
          height: Number(props.size) * 0.7,
          tintColor: ContentColor,
        }}
        source={props.type}
      />
    </TouchableOpacity>
  )
}

const IconButton = (props) => {
  return(
    <TouchableOpacity
      onPressOut={props.onPressOut}
    >
      <Image 
        style={{
          height: Number(props.size),
          width: Number(props.size),
          color: props.color,
        }}
        source={props.type}
      />
    </TouchableOpacity>
  );
}

ColorButton.defaultProps = {
  color: theme.mainColor,
  title: 'Button',
  flex: 0,
}

OutlineButton.defaultProps = {
  color: theme.mainColor,
  title: 'Button',
  flex: 0,
}

ImageButton.defaultProps = {
  color: theme.mainColor,
  size: "25",
  whiteBackground: "false",
}

IconButton.defaultProps = {
  color: theme.ContentColor,
  size: "24",
}

export {ColorButton, OutlineButton, ImageButton, IconButton};
