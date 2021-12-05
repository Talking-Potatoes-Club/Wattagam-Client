import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton, IconButton } from "./Components/Button" ;
import { images } from './Images'

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


const EditProfile = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View style={{position: "absolute", left: 10, top: 10}}>
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
            placeholder="이정원"
          />
          <Text style={{color: theme.mainColor,fontSize: 12, margin: 6}}> 자기소개 </Text>
          <TextInput
            style={[styles.TextBox, {height: 80}]}
            multiline
            placeholder="자기소개입니다. fdfdfdfdfdksddddddddddddddddddddddddd"
          />
  
          <View
            style={{
              flexDirection: "row",
              marginTop: 7,
              marginBottom: 7
            }}
          >
            <ColorButton
              title="저장"
              flex="1"
             // onPress={() => navigation.navigate()}
            />
            <ColorButton
              title="취소"
              flex="1"
              color={theme.dangerColor}
              onPress={()=>navigation.goBack()}
            />
          </View>

        <OutlineButton
          title="로그아웃"
          // onPress={() => navigation.navigate()}
        />

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
    borderColor: theme.stroke,
    backgroundColor:"white",
  }
})

export default EditProfile;