import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton} from "./Components/Button";


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
              onPress={() => navigation.navigate('SignUp')}
              flex="1"
            />
            <ColorButton 
              title="로그인"
              flex="1"
            />
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 8,
            }}
            onPress={() => navigation.navigate("FindPW")}
          >
            <Text style={{color: theme.mainColor}}> 비밀번호를 잊어버리셨나요? </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              padding: 8,
            }}
            onPress={() => navigation.reset({routes: [{name: 'Home'}]})}
          >
            <Text style={{color: theme.mainColor}}> Guest 모드로 사용하기 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const FindPW = ({navigation}) => {
  return (
    <View
      style={{flex: 1}}
    >
      <View
        style={{
          width : Dimensions.get('window').width > 300 ? (300 - 16) : '100%',
          alignSelf: "center",
          alignItems: "stretch",
          justifyContent: "center",
          flex: 1,
          padding: 16
        }}
      >
          <TextInput
            style={styles.TextBox}
            placeholder="email"
          />
          <ColorButton
            title="비밀번호 찾기"
          />
          <OutlineButton
            title="로그인 페이지로 돌아가기"
            onPress={()=>navigation.reset({routes: [{name: 'Login'}]})}
          />
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  TextBox:{
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  }
})

export {LoginPage, FindPW};