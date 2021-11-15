import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton} from "./Components/Button";

const App = () => {
  
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          padding: 16,
          alignItems: "center",
          flexDirection: "column",
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems:'stretch',
            width : Dimensions.get('window').width > 300 ? (300 - 16) : '100%',
          }}
        >
          <TextInput
            style={styles.TextBox}
            placeholder="ID"
          />
          <TextInput
            style={styles.TextBox}
            placeholder="Password"
            secureTextEntry={true}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <OutlineButton
              title="회원가입"
            />
            <ColorButton 
              title="로그인"
            />
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 8,
            }}
          >
            <Text style={{color: theme.mainColor}}> Guest 모드로 사용하기 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  TextBox:{
    // width: '100%',
    alignContent: 'flex-start',
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  }
})

export default App;