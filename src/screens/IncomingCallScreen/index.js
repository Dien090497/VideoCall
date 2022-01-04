import React, { useEffect, useState } from "react";
import {
  ImageBackground, Pressable,
  Text,
  View,
} from "react-native";
import {styles} from "./styles";
import { Images } from "../../assets/Images";
import Ionicons from "react-native-vector-icons/Ionicons";
import Fontisto from "react-native-vector-icons/Fontisto";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import {useRoute, useNavigation} from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";

export default function IncomingCallScreen(){
  const [caller, setCaller] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  const {call} = route.params;

  useEffect(()=>{

    setCaller(call.getEndpoints()[0].displayName);

    call.on(Voximplant.CallEvents.Disconnected, callEvent=>{
      navigation.navigate('Contacts');
    })

    return ()=>{
      call.off(Voximplant.CallEvents.Disconnected);
    }
  },[])

  const onDecline = ()=>{
    call.decline();
  }

  const onMessenger = ()=>{
    console.log('onMessenger')
  }

  const onRemindMe = ()=>{
    console.log('onDecline')
  }

  const onAccept = ()=>{
    navigation.navigate('Calling', {call, isIncomingCall: true})
  }

  return (
    <View style={styles.page}>
      <ImageBackground source={Images.backgroundVideoCall} style={styles.background}>
        <Text style={styles.textName}>{caller}</Text>
        <Text>WhatsApp video...</Text>
        <View style={{flex:1}}/>
        <View style={styles.body}>
          <Pressable onPress={onRemindMe} style={styles.itemBody}>
            <Ionicons name={'ios-alarm-sharp'} size={20} color={'white'}/>
            <Text style={styles.textBody}>Remind Me</Text>
          </Pressable>
          <Pressable onPress={onMessenger} style={styles.itemBody}>
            <Fontisto name={'messenger'} size={20} color={'white'}/>
            <Text style={styles.textBody}>Messenger</Text>
          </Pressable>
        </View>
        <View style={styles.body}>
          <Pressable style={styles.itemBody} onPress={onDecline}>
            <View style={[styles.icon,{backgroundColor: 'red'}]}>
              <Feather name={'x'} size={30} color={'white'}/>
            </View>
            <Text style={styles.textBody}>Decline</Text>
          </Pressable>
          <Pressable style={styles.itemBody} onPress={onAccept}>
            <View style={[styles.icon,{backgroundColor: 'green'}]}>
              <Entypo name={'phone'} size={30} color={'white'}/>
            </View>
            <Text style={styles.textBody}>Accept</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}
