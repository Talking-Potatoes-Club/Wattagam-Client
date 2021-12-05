import React, {useState} from "react";
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import { theme } from "./Theme";
import axios from "axios";
import SingleArticle from "./Components/SingleArticle";
import { Constant } from "./Constant";

const getArticles = (id) => {
  // axios.get(Constant.baseURL + "location/getPictures/" + id)
  // .then((response)=>{
  //   return response.data.posts;
  // })
  // .catch((error)=>{
  //   console.log(response.data.message);
  //   return null;
  // });

  return ([
    {author: {id: "1", user_name:"SoYeon"}, created_at:"2021-11-17", postid:"1", content:"Hello World! this is a test~~~ text~~~", picture:"https://picsum.photos/id/237/200/300"},
    {author: {id: "2", user_name:"YeEun"}, created_at:"2021-11-18", postid:"2", content:"Hello World! this is a test~~~ text~~~", picture:"https://picsum.photos/id/237/200/300"},
  ]);
}

const Articles = props => {
  // get id from props
  // call getPictures by x, y
  // save article information on state
  // mapping it

  const [posts, setPosts] = useState(getArticles(props.id));
  
  return (
    <ScrollView style={styles.back}>
      <Text style={styles.titleText}>
        이 위치에 남겨진 {posts.length}개의 왔다감
      </Text>
      <View style={{marginBottom: 32}}>
        {Object.values(posts).map((post) => (
          <View key={post.postid} style={styles.postBox}>
            <SingleArticle
              userid={post.author.id}
              username={post.author.user_name}
              time={post.created_at}
              postid={post.postid}
              content={post.content}
              picture={post.picture}
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