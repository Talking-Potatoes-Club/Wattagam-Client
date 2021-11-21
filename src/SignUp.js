import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
t


const LoginPage = ({navigation}) => {
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
            placeholder="이메일을 입력해주세요"
          />
          <TextInput
            style={styles.TextBox}
            placeholder="비밀번호를 입력해주세요"
            secureTextEntry={true}
          />
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <OutlineButton
              title="취소"
              onPress={() => navigation.goBack()}
            />
            <ColorButton 
              title="회원가입"
              onPress={() => navigation.reset({routes: [{name: 'Login'}]})}
            />
          </View>
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

export default LoginPage;