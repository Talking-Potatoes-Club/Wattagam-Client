import React, { useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../Theme';
import { IconButton } from './Button';
import { images } from '../Images';
import { Constant } from '../Constant';

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
        paddingHorizontal: 16,
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
            marginLeft: 16,
          }}
        >
          <Text style={styles.userName}>{props.username}</Text>
          <Text>{props.time}</Text>
        </View>
      </View>
      <IconButton
        type={images.MoreIcon}
      />
    </View>
  )
}

const SingleArticle = props => {
  //const imageSrc = "http://wattagam-test-server.herokuapp.com" + props.picture;
  const imageSrc = Constant.baseURL + props.picture;
  const [imageRatio, setImageRatio] = useState(1);

  Image.getSize(imageSrc, (width, height) => {
    setImageRatio(width / height);
  })
  
  return (
    <View>
      <ProfileSection
        userid={props.userid}
        username={props.username}
        time={props.time}
        profileimg={props.profileimg}
      /> 
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