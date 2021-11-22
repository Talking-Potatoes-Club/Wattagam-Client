import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity, Image} from 'react-native';
import { theme } from "./Theme";
import {ColorButton, OutlineButton, ImageButton } from "./Components/Button";
import { images } from './Images'

const PostWrite = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 2,
        }}
      >
        <ImageButton
          type={images.locationIcon}
          size="60"
          whiteBackground="true"
        />
        <Text style={{color: theme.mainColor}}> 위치를 선택해 주세요! </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 5,
        }}
      >           
        <Image
            style={styles.ImageBox}
            source={require('../assets/bear.jpg')}/>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <TextInput
            style={styles.TextBox}
            placeholder="문구 입력"
          />
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          flex: 1,
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
    width: '90%',
    height: undefined,
    aspectRatio: 1,
    resizeMode:'contain',
    margin: 4,
    padding: 8,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  },

  TextBox:{
    width: '90%',
    height: '60%',
    margin: 4,
    padding: 8,
    borderWidth: 1,
    borderRadius: theme.radius,
    borderColor: theme.stroke,
  }
})

export default PostWrite;