import React from "react";
import {View, Text} from "react-native";
import { ColorButton } from "./Components/Button";

const CameraPage = ({navigation}) => {
  return(
    <View>
      <Text> Hello This is Camera Page </Text>
      <ColorButton
        title="게시글 작성하기"
        onPress={() => navigation.navigate("PostWrite")}
      />
    </View>
  )
}

export default CameraPage;