import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../Theme';
import { IconButton } from './Button';
import { images } from '../Images';

const ProfileImage = () => {
  return (
    <Image
      style={styles.profileImage}
      source={require('../../assets/bear.jpg')}
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
  const imageSrc = "../../assets/bear.jpg"
  let imageRatio = 1;

  imageRatio = Image.resolveAssetSource(require(imageSrc)).width / Image.resolveAssetSource(require(imageSrc)).height;
  
  // ***** Is not working for local Image.
  // ***** We have to replace it when we adjust it
  // Image.getSize(imageSrc, (width, height) => {
  //   imageRatio = width / height;
  // })
  
  return (
    <View>
      <ProfileSection
        userid={props.userid}
        username={props.username}
        time={props.time}
      /> 
      <View>
        <Image
          style={[styles.contentsImage, {aspectRatio : imageRatio}]}
          source={require(imageSrc)}
        />
        <Text style={styles.contentsText}>
          {props.content}
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
    //backgroundColor: theme.mainColor,
  },
  contentsText: {
    color: theme.textColor,
    margin: 16,
    lineHeight: 20,
  }
})

export default SingleArticle;