import React, { useEffect, useState } from "react";
import { FlatList, Pressable, SafeAreaView, StatusBar, Text, TextInput, View } from "react-native";
import dummyContacts from "../../../assets/data/concats.json";
import {styles} from "./styles";
import {useNavigation} from "@react-navigation/native";
import {Voximplant} from 'react-native-voximplant';

export default function Contacts(){

  const [searchTerm, setSearchTerm] =useState('');
  const [filteredContacts, setFilteredContacts] =useState(dummyContacts);

  const navigate = useNavigation();
  const voximplant = Voximplant.getInstance();

  useEffect(()=>{
    voximplant.on(Voximplant.ClientEvents.IncomingCall, incomingCallEvent=>{
      navigate.navigate('IncomingCallScreen',{call: incomingCallEvent.call});
    })

    return () =>{
      voximplant.off(Voximplant.ClientEvents.IncomingCall)
    }
  },[])

  useEffect(()=>{
      const newContact = dummyContacts.filter(
        val => val.user_display_name.toLowerCase().includes(searchTerm.toLowerCase()))
      setFilteredContacts(newContact)
  },[searchTerm])

  const callUser = (user) =>{
    navigate.navigate('Calling',{user})
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.page}>
        <TextInput
          style={styles.txtInput}
          placeholder='Tìm kiếm'
          onChangeText={setSearchTerm}
          value={searchTerm}
          placeholderTextColor={'gray'}
        />
        <FlatList
          data={filteredContacts}
          renderItem={({item})=>{
            return(
              <Pressable onPress={()=>callUser(item)} >
                <Text style={styles.contactName}>{item.user_display_name}</Text>
              </Pressable>
            )
          }}
          ItemSeparatorComponent={()=><View style={styles.separator}/>}
        />
      </View>
    </SafeAreaView>
  );
}
