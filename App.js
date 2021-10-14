/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


 import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import FaceBookReaction from './src/components/faceBookReaction';
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: '#FFF'},
        gestureEnabled: false,
      }}
      initialRouteName={FaceBookReaction}>
        <Stack.Screen name={'FaceBookReaction'} component={FaceBookReaction} />
      </Stack.Navigator>
      </NavigationContainer>
  );
};
export default App;
