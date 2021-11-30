import React, {useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton} from "./Components/Button";
import axios from "axios";

const SignUpPage = ({navigation}) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePW] = useState("");
  const [userName, onChangeUsername] = useState("");
  const [isFailed, onFailed] = useState(0);
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
            style={[styles.TextBox, isFailed == 500 ? {borderColor: theme.dangerColor} : null]}
            placeholder="Username"
            onChangeText={text => onChangeUsername(text)}
          />
          <TextInput
            style={[styles.TextBox, isFailed == 500 ? {borderColor: theme.dangerColor} : null]}
            placeholder="email"
            onChangeText={text => onChangeEmail(text)}
          />
          <TextInput
            style={styles.TextBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={text => onChangePW(text)}
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
              onPress={() => {
                console.log(userName + ", " + email + ", " + password);
                axios.post('http://wattagam-test-server.herokuapp.com/account/signUp', {
                  email : email,
                  password : password,
                  user_name : userName,
                  bio: "안녕하세요! " + userName + "입니다.",
                })
                .then((response) => {
                  console.log(response);
                  navigation.reset({routes: [{name: 'SignUpSuccess'}]});
                })
                .catch((error) => {
                  console.log(error.response);
                  onFailed(error.response.status);
                });
                
              }}
              flex="1"
            />
          </View>
          <Text style={{color: theme.dangerColor, alignSelf: "center"}}>
              {isFailed == 400? "입력한 이름이 이미 존재합니다." : (isFailed == 500 ? "입력한 이메일이 이미 존재합니다" : "")}
            </Text>
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