import React, {useEffect, useState} from "react";
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { theme } from "./Theme";
import axios from "axios";
import SingleArticle from "./Components/SingleArticle";
import { Constant } from "./Constant";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Articles = ({route, navigation}) => {
  const [posts, setPosts] = useState([]);
  let what = [];

  const getArticles = (id) => {
    let url = Constant.baseURL + "/location/getPictures/" + id;
    let token = "";
    let posts = [];
    
    AsyncStorage.getItem('token', (error, result) => {
      token = result;
      axios.get(url, {headers: {'Authorization': `token ${token}`}})
        .then((response) => {
          const posts_ = response.data.posts;
          setPosts(posts_);
        })
        .catch((error) => {
          console.log("Articles: " + error);
        });
      });
  }

  useEffect(()=>{
    getArticles(route.params.id);
  }, []);

  return (
    <ScrollView style={styles.back}>
      <Text style={styles.titleText}>
        이 위치에 남겨진 {posts.length}개의 왔다감
      </Text>
      <View style={{marginBottom: 32}}>
        {Object.values(posts).map((post, index) => (
          <View key={index} style={styles.postBox}>
            <SingleArticle
              userid={post.author.id}
              username={post.author.user_name}
              time={post.created_at.split("T")[0]}
              postid={post.id}
              contents={post.contents}
              picture={post.picture}
              profileimg={Constant.baseURL + post.author.profile_img}
              showUserPage={()=>navigation.navigate('MyPage', {id: post.author.id})}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  back : {
    backgroundColor: theme.mainColor,
  },
  postBox: {
    borderRadius: theme.radius,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 3,
  },
  titleText: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 16,
    fontWeight: 'bold',
  }
})

export default Articles;