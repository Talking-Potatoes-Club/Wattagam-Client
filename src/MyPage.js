import React, { useEffect, useState } from "react";
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import { theme } from "./Theme";
import {IconButton } from "./Components/Button" ;
import { images } from './Images'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Constant } from "./Constant";
import SingleArticle from "./Components/SingleArticle";

const img = require('../assets/bear.jpg');
const imgProps = Image.resolveAssetSource(img);

const ProfileSection = props => {
  return(
    <View
      style={{
        flex: 1,
        marginTop: 48,
        marginBottom: 16,
      }}
    >
        <View style={{flexDirection: "column", alignItems: "center", justifyContent: "center",}}>
          <Image
            style={styles.profileImage}
            source={{ uri: props.source }}
          />
          <Text style={{color: "white", fontWeight: 'bold', fontSize: 20, margin: 4}}> {props.username} </Text>
          <Text style={{color: "white", fontSize: 13,}}> {props.bio} </Text>
        </View>
    </View>

  )
}

const ArticleSection = props => {
  return(
    <View
      style={{
        flex: 3,
        borderRadius: theme.radius,
        backgroundColor: "white",
        margin: 8,
        paddingVertical: 8,
        paddingHorizontal: 4,
      }}
    > 
      {props.children}
    </View>
  )
}

const MyPage = ({navigation}) => {
  const [userData, setUserData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  
  useEffect(() => {
    AsyncStorage.getItem('user_id', (error, result)=>{
      const url = Constant.baseURL + "/account/getUserInfo/" + result;
      AsyncStorage.getItem('token', (error, result)=>{
        axios.get(url, {headers: {'Authorization': `token ${result}`}}) 
        .then(response => {
          console.log(response);
          setUserData(response.data);
          setPosts(response.data.pictures);
          setLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
      })
    });
    
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: theme.mainColor,
      }}
    >
      <View style={{position: "absolute", left: 16, top: 16}}>
        <IconButton
          type={images.backIcon}
          onPressOut={() => navigation.goBack()}
        />
      </View>
      <View style={{position: "absolute", right: 16, top: 16}}>
        <IconButton
          type={images.settingIcon}
          onPressOut={() => navigation.navigate("EditProfile", {
            name: userData.userInfo.user_name,
            bio: userData.userInfo.bio,
            profile_img: Constant.baseURL + userData.userInfo.profile_img,
          })}
        />
      </View>
      {isLoaded ? 
        <ProfileSection
          source={Constant.baseURL + userData.userInfo.profile_img}
          username={userData.userInfo.user_name}
          bio={userData.userInfo.bio}
        />
        :null
      }
        <View style = {[styles.postTab,
        {
            marginBottom: -12,
            marginLeft: 16,
            alignItems: "center",
            justifyContent: "center",
        }]}>

          <Text style={{color: theme.mainColor, fontSize: 13,}}>게시글</Text>
        </View>
        <ArticleSection>
          <ScrollView style={styles.back}>
            <View style={{marginBottom: 32}}>
              {Object.values(posts).map((post, index) => (
                <View key={index} style={styles.singlePostBox}>
                  <SingleArticle
                    userid={post.author.id}
                    username={post.author.user_name}
                    time={post.created_at.split("T")[0]}
                    postid={post.postid}
                    contents={post.contents}
                    picture={post.picture}
                    profileimg={Constant.baseURL + post.author.profile_img}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </ArticleSection>
      
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
  singlePostBox: {
    borderWidth: 1,
    borderColor: theme.lightStroke,
    borderRadius: theme.radius,
    marginBottom: 4,
  }
})

export default MyPage;