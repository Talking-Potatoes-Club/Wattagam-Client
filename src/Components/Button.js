import React from "react";
import { theme } from "../Theme"
import { StyleSheet, TouchableOpacity, Button, View, Text } from 'react-native';

const ColorButton = props => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.mainColor,
        borderRadius: theme.radius,
        borderColor: theme.mainColor,
        borderWidth: 1,
        padding: 8,
        margin: 4,
      }}
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
        flex: 1,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.radius,
        borderColor: theme.mainColor,
        borderWidth: 1,
        padding: 8,
        margin: 4,
      }}
    >
      <Text style={{ color: theme.mainColor }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}


export {ColorButton, OutlineButton};
