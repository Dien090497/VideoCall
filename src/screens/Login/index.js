import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { styles } from "./styles";
import {Voximplant} from 'react-native-voximplant'
import { ACC_NAME, APP_NAME } from "../../assets/Constants";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
  const [username, setUsername] = useState('user');
  const [password, setPassword] = useState('abc123456');

  const voximplant = Voximplant.getInstance();
  const navigation = useNavigation();

  useEffect(()=>{
    const connect = async () =>{
      const status = await voximplant.getClientState();
      console.log(status)
      if (status === Voximplant.ClientState.DISCONNECTED){
        await voximplant.connect();
      }else if (status === Voximplant.ClientState.LOGGED_IN){
        redirectHome();
      }
    }
    connect();
  },[])

  const signIn = async () => {
    try {
      const fqUserName = `${username}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(fqUserName, password)
      redirectHome()
    } catch (e) {
      Alert.alert(e.name,'Error code: '+e.code)
    }
  }

  const redirectHome = ()=>{
    navigation.reset({
      index: 0,
      routes:[
        {name: 'Contacts'}
      ]
    })
  }

  return (
    <View style={styles.page}>
      <TextInput
        placeholder={"username"}
        style={styles.input}
        placeholderTextColor={"gray"}
        autoCapitalize={'none'}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder={"password"}
        style={styles.input}
        placeholderTextColor={"gray"}
        value={password}
        autoCapitalize={'none'}
        onChangeText={setPassword}
      />
      <Pressable style={styles.btn} onPress={signIn}>
        <Text style={styles.text}>signIn</Text>
      </Pressable>
    </View>
  );
};

export default Login;
