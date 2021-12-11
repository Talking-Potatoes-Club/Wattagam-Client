import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image, Alert, BackHandler} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton,  } from "./Components/Button";
import { images } from './Images'
import axios from "axios";
import { Constant } from "./Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImgToBase64 from 'react-native-image-base64';

const PostWrite = ({route, navigation}) => {
  const [contents, setContents] = useState("");  
  
  const [latitude, setLatitude] = useState(route.params.latitude);
  const [longitude, setLongitude] = useState(route.params.longitude);
  
  const imgsrc = route.params.imgsrc;
  // testing
  //const imgsrc = Constant.testImg; 
  let imageRatio = 1;
  
  let imgProps = {width: 0, height: 0};
  Image.getSize(imgsrc, (width, height) => {
    imgProps.width = width;
    imgProps.height = height;
    imageRatio = width / height;
  });

  const uploadComplete = () => {
    Alert.alert("게시글 작성", "게시글이 업로드되었습니다!", [
      { text: "확인", onPress: () => navigation.reset({routes: [{name: 'Home'}]}) }
    ]);
  }

  const backAction = () => {
    Alert.alert("잠시만요!", "작성하던 내용이 사라집니다.\n계속하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null,
      },
      { text: "확인", onPress: () => navigation.reset({routes: [{name: 'Home'}]}) }
    ]);
    return true;
  };

  useEffect(()=>{
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return() => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, }} >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >

        <ImageButton
          type={images.locationIcon}
          size="60"
          whiteBackground="true"
        />
        <Text style={{color: theme.mainColor, marginVertical: 10}}> {latitude + ", " + longitude} </Text>
 
        <Image
          style={[styles.ImageBox, imageRatio < 1 ? {aspectRatio: 1} : {aspectRatio: imageRatio}]}
          source={{uri: imgsrc}}
        />
    
        <TextInput
          style={styles.TextBox}
          multiline
          placeholder="문구 입력"
          onChangeText={(text)=>setContents(text)}
        />
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            // position: "absolute",
            // bottom:10,
            // right:0,
            // left:0,
          }}
        >
        <OutlineButton
          title="뒤로 돌아가기"
          onPress={backAction}
        />

        <ColorButton 
          title="작성하기"
          onPress={()=>{
            let token = "";
            AsyncStorage.getItem('token', (error, result) => {
              console.log("Token Loaded : " + result);
              token = result;
              ImgToBase64.getBase64String(imgsrc)
              .then(base64String => {
                axios.post(Constant.baseURL + "/location/newPicture", {
                  x_location: latitude,
                  y_location: longitude,
                  location_name : "temp",
                  picture: base64String,
                  contents: contents,
                },{
                  headers: {'Authorization': `token ${token}`}
                })
                .then((response)=>{
                  //console.log(response);
                  uploadComplete();
                })
                .catch((error)=>{
                  console.log(error.response);
                  //console.log(latitude + ", " + longitude + ", " + token + ", " + contents);
                })
              })
              .catch(err =>{
                console.log(err);
              })

            });
          }}
        />
      </View>
      </View>

      

    </View>


  )
}

const styles=StyleSheet.create({

  ImageBox:{
    //backgroundColor: '#CCCCCC',
    width: '90%',
    height: undefined,
    resizeMode:'contain',
    margin: 4,
    padding: 8,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  },

  ImageBoxWithAspectRatio:{
    //backgroundColor: '#CCCCCC',
    width: '90%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode:'contain',
    margin: 4,
    padding: 8,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  },

  TextBox:{
    width: '90%',
    height: '10%',
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  }
})

export default PostWrite;