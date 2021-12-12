import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, Touchable } from 'react-native';
import { theme } from '../Theme';
import { IconButton } from './Button';
import { images } from '../Images';
import { Constant } from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const SingleArticle = props => {
  //const imageSrc = "http://wattagam-test-server.herokuapp.com" + props.picture;
  const imageSrc = Constant.baseURL + props.picture;
  const [imageRatio, setImageRatio] = useState(1);

  Image.getSize(imageSrc, (width, height) => {
    setImageRatio(width / height);
  })
  
  const deleteAlert = postid => {
    Alert.alert("게시글 삭제", "게시글을 삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => null
      },
      {
        text: "삭제",
        onPress: () => {
          AsyncStorage.getItem('token', (error, token) =>{
            axios.delete(Constant.baseURL + "/location/myPicture/" + postid,
              {headers: {'Authorization': `token ${token}`}}
            )
            .then(response => {
              Alert.alert("게시글 삭제 완료", "삭제가 완료되었습니다.", [
                {
                  text: "확인",
                  onPress: () => null
                }
              ])
            })
            .catch(error=>{
              console.log("SingleArticle: " + error);
            })
          })
          
        }
      }
    ])
  }

  const ProfileImage = props => {
    return (
      <Image
        style={styles.profileImage}
        source={{uri: props.profileimg}}
      />
    )
  }
  
  const ProfileSection = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
        }}
      >
        <View style={{flexDirection: 'row',}}>
          <ProfileImage 
            style={{ marginLeft: 16, marginRight: 16 }}
            profileimg={props.profileimg}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 8,
            }}
          >
            <Text style={styles.userName}>{props.username}</Text>
            <Text>{props.time}</Text>
          </View>
        </View>
        <IconButton
          type={images.MoreIcon}
          onPressOut={()=>{
            AsyncStorage.getItem('user_id', (error, result)=>{
              result == props.userid ? deleteAlert(props.postid) : null;
            })
          }}
        />
      </View>
    )
  }

  return (
    <View>
      <TouchableOpacity onPress={props.showUserPage}>
        <ProfileSection
          userid={props.userid}
          username={props.username}
          time={props.time}
          profileimg={props.profileimg}
          postid={props.postid}
        /> 
      </TouchableOpacity>
      <View>
        <Image
          style={[styles.contentsImage, {aspectRatio: imageRatio}]}
          source={{uri: imageSrc}}
        />
        <Text style={styles.contentsText}>
          {props.contents}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  profileImage : {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.textColor,
  },
  caption: {
    fontSize: 10,
    color: theme.captionColor, 
  },
  contentsImage : {
    width: '100%',
    height: undefined,
    resizeMode: "contain",
    aspectRatio: 0.7,
    //backgroundColor: theme.mainColor,
  },
  contentsText: {
    color: theme.textColor,
    margin: 16,
    lineHeight: 20,
  }
})

export default SingleArticle;