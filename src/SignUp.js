import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton} from "./Components/Button";

const SignUpPage = ({navigation}) => {
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
            placeholder="Username"
          />
          <TextInput
            style={styles.TextBox}
            placeholder="email"
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
              title="취소"
              onPress={() => navigation.goBack()}
              flex="1"
            />
            <ColorButton 
              title="회원가입"
              onPress={() => navigation.reset({routes: [{name: 'SignUpSuccess'}]})}
              flex="1"
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const SignUpSuccess = ({navigation}, props) => {
  return(
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Text style={{padding: 8}}>
          회원가입이 완료되었습니다
        </Text>
        <Text style={{padding: 8}}>
          로그인을 마저 진행해주세요!
        </Text>
        <ColorButton 
          title="로그인 페이지로 돌아가기"
          onPress={()=>navigation.reset({routes: [{name: 'Login'}]})}
        />
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

export {SignUpPage, SignUpSuccess};