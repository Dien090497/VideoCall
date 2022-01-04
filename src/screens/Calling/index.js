import React, { useEffect, useRef, useState } from "react";
import { Alert, PermissionsAndroid, Platform, Pressable, Text, View } from "react-native";
import { styles } from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";
import { ACC_NAME, APP_NAME } from "../../assets/Constants";
import callEvents from "react-native-voximplant/src/call/CallEvents";

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];


export default function Calling() {

  const [isCamera, setIsCamera] = useState(true);
  const [isMicro, setIsMicro] = useState(true);
  const [permissionsGranted, setPermissionsGranted] = useState(false);
  const [callStatus, setCallStatus] = useState('Initializing...');
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {user, call: incomingCall, isIncomingCall} = route?.params;
  const voximplant = Voximplant.getInstance();

  const call = useRef(incomingCall);

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === "granted";
      const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] = "granted";
      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert("Permissions not granted");
      } else {
        setPermissionsGranted(true);
      }
    };
    getPermissions()
    if (Platform.OS === "android") {
      getPermissions();
    } else {
      setPermissionsGranted(true);
    }
  }, []);


  useEffect(() => {
    if (!permissionsGranted) {
      return;
    }

    const callSetting ={
      video:{
        sendVideo: true,
        receiveVideo: true
      },
    }

    const makeCall = async () => {
      call.current = await voximplant.call(`${user.user_name}@${APP_NAME}.${ACC_NAME}.voximplant.com`, callSetting);
      subscribeToCallEvent();
    };

    const answerCall = () =>{
      subscribeToCallEvent();
      call.current.answer(callSetting)
    }

    const subscribeToCallEvent = ()=>{
      call.current.on(Voximplant.CallEvents.Failed, (callEvent) =>{
        showError(callEvent.reason);
      })
      call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) =>{
        setCallStatus('Calling...')
      })
      call.current.on(Voximplant.CallEvents.Connected, callEvent =>{
        setCallStatus('Connected')
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent=>{
        navigation.navigate('Contacts');
      })
      call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, callEvent=>{
        setLocalVideoStreamId(callEvent.videoStream.id)
        navigation.navigate('Contacts');
      })
    }

    const showError = (reason) =>{
      Alert.alert('Call Fail', `Reason: ${reason}`,[{text:'OK', onPress: navigation.navigate('Contacts')}])
    }

    if (isIncomingCall){
      answerCall();
    }else {
      makeCall();
    }

    makeCall();

    return ()=>{
      call.current.off(Voximplant.CallEvents.Failed)
      call.current.off(Voximplant.CallEvents.ProgressToneStart)
      call.current.off(Voximplant.CallEvents.Connected)
      call.current.off(Voximplant.CallEvents.Disconnected)
    }
  }, [permissionsGranted]);

  const onReverseCamera = () => {
    console.log("onReverseCamera");
  };

  const onToggleCamera = () => {
    setIsCamera(currenValue => !currenValue);
  };

  const onToggleMicrophone = () => {
    setIsMicro(currenValue => !currenValue);
  };

  const onHangup = () => {
    call.current.hangup();
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.goBack}>
        <Ionicons name={"arrow-back"} size={30} color={"white"} />
      </Pressable>
      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
        <View style={{ flex: 1 }} />
        <View style={styles.btnContainer}>
          <Pressable style={styles.icon} onPress={onReverseCamera}>
            <Ionicons name="camera-reverse" size={30} color={"white"} />
          </Pressable>
          <Pressable style={styles.icon} onPress={onToggleCamera}>
            <MaterialCommunityIcons name={isCamera ? "camera-off" : "camera"} size={30} color={"white"} />
          </Pressable>
          <Pressable style={styles.icon} onPress={onToggleMicrophone}>
            <MaterialCommunityIcons name={isMicro ? "microphone-off" : "microphone"} size={30} color={"white"} />
          </Pressable>
          <Pressable style={[styles.icon, { backgroundColor: "red" }]} onPress={onHangup}>
            <MaterialCommunityIcons name="phone-hangup" size={30} color={"white"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
