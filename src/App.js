import React from "react";
import {StyleSheet, Text, View, TextInput, Dimensions, TouchableOpacity} from 'react-native';
import {LoginPage, FindPW} from "./Login";
import Home from "./Home";
import {SignUpPage} from "./SignUp";
import CameraPage from './Camera';
import SingleArticle from "./Components/SingleArticle";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostWrite from "./PostWrite";
import MyPage from "./MyPage";
import UserPage from "./UserPage";
import EditProfile from "./EditProfile";
import Articles from "./Articles";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        {/* <Stack.Screen name="SignUpSuccess" component={SignUpSuccess}/> */}
        <Stack.Screen name="FindPW" component={FindPW}/>
        <Stack.Screen name="Camera" component={CameraPage}/>
        <Stack.Screen name="PostWrite" component={PostWrite}/>
        <Stack.Screen name="SingleArticle" component={SingleArticle} />
        <Stack.Screen name="MyPage" component={UserPage}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="Articles" component={Articles}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App;