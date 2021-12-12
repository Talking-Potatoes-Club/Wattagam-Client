import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, DeviceEventEmitter, BackHandler, Alert} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton, IconButton } from "./Components/Button" ;
import { images } from './Images'
import axios from "axios";
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constant } from "./Constant";

const img = require('../assets/bear.jpg');
const imgProps = Image.resolveAssetSource(img);





const EditProfile = ({route, navigation}) => {
  const [name, setName] = useState(route.params.name);
  const [bio, setBio] = useState(route.params.bio);
  const [profileImg, setProfileImg] = useState(route.params.profile_img);
  const [base64Img, setBase64Img] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const options = {
    title: '프로필 사진 변경',
    chooseFromLibraryButtonTitle: '내 파일에서 선택',
    cancelButtonTitle: '취소',
  }

  const HandleDataChanging = () => {
    AsyncStorage.getItem('token', (error, token)=>{
      axios.patch(Constant.baseURL + '/account/changeUserInfo', 
        {
          bio: bio,
          is_open: true,
          profile: base64Img
        },
        {headers: {'Authorization': `token ${token}`}
      })
      .then(result => {
        if (name != route.params.name){
          if (name == ""){
            setErrorMessage("닉네임을 입력해주세요.");
          }
          else {
            axios.patch(Constant.baseURL + '/account/changeNickname', 
              {
                new_name: name
              },
              {headers: {'Authorization': `token ${token}`}
            })
            .then(result=>{
              patchComplete();
            })
            .catch(error=>{
              console.log("EditProfile: " + error);
              setErrorMessage("이미 존재하는 닉네임입니다.");
            })
          }
        }
        else patchComplete();
      })
      .catch(error=>{
        console.log("EditProfile: " + error);
      });
    })
  }

  const HandleLogoutButtonPress = () => {
    Alert.alert("로그아웃", "왔다감에서 로그아웃합니다.", [
      {
        text: "취소",
        onPress: ()=> null,
      },
      {
        text: "확인",
        onPress: () => {
          AsyncStorage.setItem('token', "");
          navigation.reset({routes: [{name: 'Login'}]});
        }
      }
    ]); 
  }

  const pickImage = () => {
    launchImageLibrary({maxWidth: 1500, maxHeight: 1500, quality: 0.7, includeBase64: true}, response => {
      if(!response.didCancel){
        setBase64Img(response.assets[0].base64);
        setProfileImg(response.assets[0].uri);
      }
    })
  }
  
  const backAction = () => {
    Alert.alert("잠시만요!", "작성하던 내용이 사라집니다.\n계속하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      { text: "확인", onPress: () => navigation.goBack() }
    ]);
    return true;
  }

  const patchComplete = () => {
    Alert.alert("프로필 수정", "프로필이 수정되었습니다!", [
      { text: "확인", onPress: () => navigation.goBack() }
    ]);
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () =>{
      DeviceEventEmitter.emit('abc');
      backHandler.remove();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      
      <View style={{position: "absolute", left: 24, top: 32}}>
        <IconButton
          type={images.backIcon}
          onPressOut={()=>backAction()}
        />
      </View>
    <View
        style={{
          alignItems: "center",
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <TouchableOpacity
          onPressOut={()=>pickImage()}
        >
          <Image
            style={styles.profileImage}
            source={{uri: profileImg}}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems:'stretch',
            width : Dimensions.get('window').width > 300 ? (300 - 16) : '100%',
          }}
        >
           <Text style={{color: theme.mainColor,fontSize: 12, margin: 6}}> 이름 </Text>
          <TextInput
            style={[styles.TextBox, {marginBottom: 8}, errorMessage != "" ? styles.inputError : null]}
            value={name}
            onChangeText={text => {setName(text);}}
            placeholder="이름을 입력해주세요"
          />
          {errorMessage != "" ? <Text style={styles.errorText}>{errorMessage}</Text>: null}
          <Text style={{color: theme.mainColor,fontSize: 12, margin: 6}}> 자기소개 </Text>
          <TextInput
            style={[styles.TextBox, {height: 80}]}
            multiline
            value={bio}
            onChangeText={text=>{setBio(text);}}
            placeholder="자기소개를 입력해주세요"
          />
          <OutlineButton
            title="로그아웃"
            onPress={() => HandleLogoutButtonPress()}
          />
          <View
            style={{
              flexDirection: "row",
              marginTop: 40,
              marginBottom: 7
            }}
          >
            <OutlineButton
              title="취소"
              flex="1"
              color={theme.dangerColor}
              onPress={()=>backAction()}
            />
            <ColorButton
              title="저장"
              flex="1"
              onPress={() => HandleDataChanging()}
            />
          </View>
          
        </View>
      </View>
    </View>
  )
}

const styles=StyleSheet.create({
  profileImage : {
    width: 90,
    height: 90,
    margin: 20,
    borderRadius: 20,
    borderWidth: 1,
  },

  TextBox:{
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.lightStroke,
    backgroundColor:"white",
  },

  inputError: {
    borderColor: theme.dangerColor,
  },

  errorText: {
    color: theme.dangerColor,
    textAlign: "center",
  }
})

export default EditProfile;