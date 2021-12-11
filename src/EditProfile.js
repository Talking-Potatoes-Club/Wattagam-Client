import React, {useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton, IconButton } from "./Components/Button" ;
import { images } from './Images'
import axios from "axios";

const img = require('../assets/bear.jpg');
const imgProps = Image.resolveAssetSource(img);


const HandleLogoutButtonPress = () => {
  return(

    <View
    style={{

    }}
  >
    
  </View>
  )
}


const EditProfile = ({route, navigation}) => {
  const [name, setName] = useState(route.params.name);
  const [bio, setBio] = useState(route.params.bio);
  const [profileImg, setProfileImg] = useState(route.params.profile_img);

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
          onPress={()=>navigation.goBack()}
        />
      </View>
    <View
        style={{
          alignItems: "center",
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Image
          style={styles.profileImage}
          source={img}

        />
        <View
          style={{
            alignItems:'stretch',
            width : Dimensions.get('window').width > 300 ? (300 - 16) : '100%',
          }}
        >
           <Text style={{color: theme.mainColor,fontSize: 12, margin: 6}}> 이름 </Text>
          <TextInput
            style={[styles.TextBox, {marginBottom: 8}]}
            value={name}
            onChangeText={text=>setName(text)}
            placeholder="이름을 입력해주세요"
          />
          <Text style={{color: theme.mainColor,fontSize: 12, margin: 6}}> 자기소개 </Text>
          <TextInput
            style={[styles.TextBox, {height: 80}]}
            multiline
            value={bio}
            onChangeText={text=>setBio(text)}
            placeholder="자기소개를 입력해주세요"
          />
          <OutlineButton
            title="로그아웃"
            // onPress={() => navigation.navigate()}
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
              onPress={()=>navigation.goBack()}
            />
            <ColorButton
              title="저장"
              flex="1"
             // onPress={() => navigation.navigate()}
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
  }
})

export default EditProfile;