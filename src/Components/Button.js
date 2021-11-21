import React from "react";
import { theme } from "../Theme"
import { StyleSheet, TouchableOpacity, Button, View, Text } from 'react-native';
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

export {ColorButton, OutlineButton};
