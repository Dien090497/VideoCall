import React, { useEffect, useState } from "react";
import {
  Pressable,
  View,
} from "react-native";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CallActionBox = () =>{
  const [isCamera, setIsCamera] = useState(true)
  const [isMicro, setIsMicro] = useState(true)

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
  return(
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

      <View style={styles.cameraChild}/>
    </View>
  )
}
