
import React,{ useState,useEffect } from 'react';
import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator,AsyncStorage,BackHandler } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/Screens/LoginScreen';
import SplashScreen from './src/Screens/SplashScreen';
import Dashboard from './src/Screens/Dashboard';





function App() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  useEffect(() => {
    displayData()
  }, []);

  const backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to exit?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => {BackHandler.exitApp()
        

        } }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  const displayData = async ()=>{  
    try{  
      let status = await AsyncStorage.getItem('isLoggedIn');  
       setIsLoggedIn(status)
       console.log("app status:",status)
    }  
    catch(error){  
      alert(error)  
    }  
  }
  const Stack = createNativeStackNavigator();
 



  
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator 
  initialRouteName="Splash"
  >

<Stack.Screen options={{
    headerShown: false,
   
  }} name="Splash" component={SplashScreen}
 />

 {isLoggedIn ?
 <>

<Stack.Screen options={{
    headerShown: false,
   
  }} name="Dashboard" component={Dashboard}
 />
 </>:
 <>
  
      <Stack.Screen options={{
    headerShown: false
  }} name="Login" component={LoginScreen} />
  </>}
        
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles= StyleSheet.create({
    
  textInput:{
    height: 40,
    width:350,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius:10,
    backgroundColor:"white",
    color:"black"
  },
  touchable:{
    width: 350,
    height:40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    margin:10,
    borderRadius:10

  }
 
});
export default App;