/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import type { Node } from "react";
import {
  SafeAreaView,
  StatusBar,
} from "react-native";
import Contacts from "./src/screens/Contacts";
import Calling from "./src/screens/Calling";
import IncomingCallScreen from "./src/screens/IncomingCallScreen";
import Login from "./src/screens/Login";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  return (
    <>
      <StatusBar barStyle={"dark-content"} translucent backgroundColor="transparent" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Contacts" component={Contacts} />
          <Stack.Group screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="Calling" component={Calling} />
            <Stack.Screen name="IncomingCallScreen" component={IncomingCallScreen} />
            {/*<Stack.Screen name="Calling" component={Calling}/>*/}
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
