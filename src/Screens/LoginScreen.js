import React,{ useState,useEffect } from 'react';
import Dashboard from './Dashboard';
import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator,Modal,Pressable,StatusBar,AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import * as Animatable from 'react-native-animatable';
import NetInfo  from "@react-native-community/netinfo";
export default function LoginScreen({route,navigation}){

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [IsOffline,setIsOffline]=useState(false)
    const [isLoading,setIsLoading]=useState(false)

    useEffect(() => {
        const removeNetInfoSubscription = NetInfo.addEventListener((state) => {
          const offline = !(state.isConnected && state.isInternetReachable);
          console.log("offline:",offline)
          setIsOffline(offline);
        });
      
      
        return () => removeNetInfoSubscription();
      }, []);

    const validation=()=>{
        if(username.length<1){
            Alert.alert("Username is  required.")
        }
        else if(password.length<1){
            Alert.alert("Password is required.")
        }
        else if(IsOffline){
            Alert.alert("No Internet Connection!")

        }
        else{
            setIsLoading(true)
            AsyncStorage.setItem('isLoggedIn',JSON.stringify(true))

            setTimeout(() => {
                setIsLoading(false);
                navigation.navigate("Dashboard")
                
           }, 3000);
        }
    }

    return(
        isLoading ?
        <View style={{backgroundColor:'#ffffff',height:'100%',flexDirection:'column',justifyContent:'center'}}>
          <ActivityIndicator size={70} color="#009387" style={{alignSelf:'center'}} />
        </View>
        :
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={{height:400,backgroundColor:'#009387',borderBottomEndRadius:50,borderBottomStartRadius:50,flexDirection:'column',justifyContent:'space-between'}}>
        <Animatable.Image
              animation="bounceIn"
              duraton="1500"
          source={require('../../assets/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
          />
          <Text style={{alignSelf:'center',fontSize:30,color:'#ffffff'}}>App Name</Text>
        <View style={{height:200,width:'100%',backgroundColor:'#ffffff',alignSelf:'flex-end',flexDirection:'column',justifyContent:'flex-start',borderTopStartRadius:50,borderTopEndRadius:50}}>
        <Text style={{margin:50,color:'#009387',fontSize:30,fontWeight:'bold',alignSelf:'center'}}>Welcome</Text>
        <TextInput
          placeholder='Username'
          onChangeText={(e)=>{setUsername(e)}}
          placeholderTextColor={'#000000'}
           style={{width:'90%',height:50,borderRadius:10,margin:10,fontSize:18,padding:10,backgroundColor:'#ededed',color:'#000000',alignSelf:'center'}}></TextInput>

           <TextInput
          placeholder='Password'
          onChangeText={(e)=>{setPassword(e)}}
          secureTextEntry={true}
          placeholderTextColor={'#000000'}
           style={{width:'90%',height:50,borderRadius:10,margin:10,padding:10,fontSize:18,backgroundColor:'#ededed',color:'#000000',alignSelf:'center'}}></TextInput>
            <Text style={{color:'#000000',alignSelf:'flex-end',marginRight:40,color:'#009387',fontSize:16,marginBottom:50,marginTop:20}}>Forgot Password?</Text>
           <TouchableOpacity 
           onPress={()=>{validation()}}
           style={{backgroundColor:'#009387',height:50,width:300,borderRadius:50,alignSelf:'center',alignItems:'center',flexDirection:'column',justifyContent:'center',margin:10}}>
            <Text style={{fontSize:20,color:'#ffffff'}}>Login</Text>
           </TouchableOpacity>

           
          </View>
        </View>
        
      <View style={styles.header}>
          
          
          
      </View>
      </View>
    )
    
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#ffffff'
    },
    header: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,
        //paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf:'center',
        marginTop:20
    },
    title: {
        color: '#05375a',
        fontSize: 34,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        fontSize: 30,
        marginTop:5,
        //height:'100%',
        marginBottom:50,
        textAlign: 'justify'
    },
    button: {
        alignItems: 'center',
        marginTop: 10
    },
    signIn: {
        width: 200,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    }
  });