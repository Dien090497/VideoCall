import React, { useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {styles} from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Calling(){

  const [isCamera, setIsCamera] = useState(true)
  const [isMicro, setIsMicro] = useState(true)
  const navigation = useNavigation();
  const route = useRoute();

  const user = route?.params?.user;

  const onReverseCamera = () =>{
    console.log('onReverseCamera')
  }

  const onToggleCamera = () =>{
    setIsCamera(currenValue => !currenValue)
  }

  const onToggleMicrophone = () =>{
    setIsMicro(currenValue => !currenValue)
  }

  const onHangup = () =>{
    console.log('onHangup')
  }

  const goBack = () =>{
    navigation.goBack();
  }

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.goBack}>
        <Ionicons name={'arrow-back'} size={30} color={'white'}/>
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>+0859994645</Text>
        <View style={{flex:1}}/>
        <View style={styles.btnContainer}>
          <Pressable style={styles.icon} onPress={onReverseCamera}>
            <Ionicons name='camera-reverse' size={30} color={'white'}/>
          </Pressable>
          <Pressable style={styles.icon} onPress={onToggleCamera}>
            <MaterialCommunityIcons name={isCamera ? 'camera-off' : 'camera'} size={30} color={'white'}/>
          </Pressable>
          <Pressable style={styles.icon} onPress={onToggleMicrophone}>
            <MaterialCommunityIcons name={isMicro ? 'microphone-off': 'microphone'} size={30} color={'white'}/>
          </Pressable>
          <Pressable style={[styles.icon,{backgroundColor: 'red'}]} onPress={onHangup}>
            <MaterialCommunityIcons name='phone-hangup' size={30} color={'white'}/>
          </Pressable>
        </View>
      </View>
      <View style={styles.cameraChild}/>
    </View>
  );
}
