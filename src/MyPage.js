import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton, IconButton } from "./Components/Button" ;
import { images } from './Images'

const img = require('../assets/bear.jpg');
const imgProps = Image.resolveAssetSource(img);

const ProfileSection = () => {
  return(

    <View
      style={{
        flex: 1,
        padding: 20,
      }}
    >

        <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center",}}>

          <Image
            style={styles.profileImage}
            source={img}
          />
          <Text style={{color: "white", fontWeight: 'bold', fontSize: 20, margin: 4}}> 이정원 </Text>
          <Text style={{color: "white", fontSize: 13,}}> 자기소개입니다. </Text>
        </View>

        <View style={{position: "absolute", right: 10, top: 10}}>
          <IconButton
            type={images.settingIcon}
            onPress={() => navigation.navigate("EditProfile")}
          />
        </View>

    </View>

  )
}

const ArticleSection = () => {
  return(

    <View
    style={{
      flex: 3,
      borderRadius: theme.radius,
      backgroundColor: "white",
      margin: 8,
      padding: 20,
    }}
  >
    
  </View>
  )
}

const MyPage = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.mainColor,
      }}
    >
      <ProfileSection />
      <View style = {[styles.postTab,
      {
          flex: 0.4,
          marginTop: 30,
          marginBottom: -12,
          alignItems: "center",
          justifyContent: "center",
      }]}>

        <Text style={{color: theme.mainColor, fontSize: 13,}}>게시글</Text>
      </View>
      <ArticleSection /> 
      
    </View>
  )
}

const styles=StyleSheet.create({
  profileImage : {
    width: 80,
    height: 80,
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  postTab : {
    backgroundColor: "white",
    width: 70,
    height: 32,
    borderRadius: theme.radius,
  },

})

export default MyPage;