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

const ProfileSection = () => {
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
          <Text style={styles.userName}>UserName</Text>
          <Text>Location</Text>
        </View>
      </View>
      <IconButton
        type={images.MoreIcon}
      />
    </View>
  )
}

const SingleArticle = () => {
  const imageSrc = "../../assets/bear.jpg";
  let imageRatio = 1;

  imageRatio = Image.resolveAssetSource(require(imageSrc)).width / Image.resolveAssetSource(require(imageSrc)).height;
  
  // ***** Is not working for local Image.
  // ***** We have to replace it when we adjust it
  // Image.getSize(imageSrc, (width, height) => {
  //   imageRatio = width / height;
  // })
  
  return (
    <View style={{borderColor: theme.stroke, borderWidth: 1,}}>
      <ProfileSection /> 
      <View>
        <Image
          style={[styles.contentsImage, {aspectRatio : imageRatio}]}
          source={require(imageSrc)}
        />
        <Text style={styles.contentsText}>
          본문 내용이 들어가는 공간입니다. dfdfdfdfdfdfdf fdfdf fd f dfd d fdfdfdfd f dfdfdf df fd fdf d
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
    fontWeight: "Bold",
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
    backgroundColor: theme.mainColor,
  },
  contentsText: {
    color: theme.textColor,
    margin: 16,
    lineHeight: 20,
  }
})

export default SingleArticle;