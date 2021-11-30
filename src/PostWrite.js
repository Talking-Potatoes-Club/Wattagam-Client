import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton } from "./Components/Button";
import { images } from './Images'

const img = require('../assets/bear.jpg');
const imgProps = Image.resolveAssetSource(img);

const PostWrite = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
        <Text style={{color: theme.mainColor}}> 위치를 선택해 주세요! </Text>
 

        <Image
          style={imgProps.height >= imgProps.width ? styles.ImageBoxWithAspectRatio : styles.ImageBox}
          source={img}
        />
       

        <TextInput
            style={styles.TextBox}
            multiline
            placeholder="문구 입력"
          />
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          position: "absolute",
          bottom:10,
          right:0,
          left:0,
        }}
      >
        <OutlineButton
          title="뒤로 돌아가기"
          onPress={()=>navigation.goBack()}
        />

        <ColorButton 
          title="작성하기"
          onPress={()=>navigation.goBack()}
        />
      </View>

    </View>


  )
}

const styles=StyleSheet.create({

  ImageBox:{
    backgroundColor: '#CCCCCC',
    width: '90%',
    height: undefined,
    resizeMode:'contain',
    aspectRatio: 1.5,
    margin: 4,
    padding: 8,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  },

  ImageBoxWithAspectRatio:{
    backgroundColor: '#CCCCCC',
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