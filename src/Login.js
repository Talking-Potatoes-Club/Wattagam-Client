import React , {useState} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton} from "./Components/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constant } from "./Constant";

const LoginPage = ({navigation}) => {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePW] = useState("");
  const [isFailed, onFailed] = useState(false);

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
            onChangeText={(text)=>onChangeEmail(text)}
          />
          <TextInput
            style={styles.TextBox}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text)=>onChangePW(text)}
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
              onPress={() => {
                console.log(email + ", " + password);
                axios.post(Constant.baseURL + 'account/logIn', {
                  email : email,
                  password : password,
                })
                .then((response) => {
                  console.log(response);
                  console.log(response.data.token);
                  AsyncStorage.setItem('token', response.data.token);
                  AsyncStorage.getItem('token', (error, result) => {
                    console.log("Token Saved : " + result);
                  });
                  navigation.navigate("Home");
                })
                .catch((error) => {
                  console.log(error);
                  onFailed(true);
                });
              }}
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
          <Text style={{color: theme.dangerColor, alignSelf: "center"}}>{isFailed?"아이디 또는 비밀번호를 확인해주세요.":""}</Text>
        </View>
      </View>
    </View>
  )
}

const FindPW = ({navigation}) => {
  const [email, onChangeEmail] = useState("");
  const [isMailSended, onMailSended] = useState(false);
  const [isFailed, onFailed] = useState(false);

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
            onChangeText={(text)=>onChangeEmail(text)}
          />
          <ColorButton
            title="비밀번호 찾기"
            onPress={()=>{
              email!=""?
                axios.post(Constant.baseURL + 'account/tempPassword', {
                    email : email,
                  })
                  .then((response) => {
                    console.log(email);
                    console.log(response);
                    onMailSended(true);
                  })
                  .catch((error) => {
                    console.log(error);
                    console.log(email);
                    onFailed(true);
                  })
                :onFailed(true);
            }}
          />
          <OutlineButton
            title="로그인 페이지로 돌아가기"
            onPress={()=>navigation.reset({routes: [{name: 'Login'}]})}
          />
          <Text style={{color: theme.dangerColor, alignSelf: "center"}}>
            {isMailSended?"메일로 임시 비밀번호가 전송되었습니다.": isFailed?"정확한 이메일을 입력해주세요.":""}
          </Text>
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