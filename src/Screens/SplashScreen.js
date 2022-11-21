import React, { useState ,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from '../Screens/LoginScreen';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme} from '@react-navigation/native';





const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [isLoggedIn,setIsLoggedIn]=useState(false)

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
         displayData()
          
          // The screen is focused
          // Call any action
        });
    
        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
      }, [navigation]);
    
      const displayData = async ()=>{  
        try{  
          let status =  await AsyncStorage.getItem('isLoggedIn'); 
          
            setIsLoggedIn((status))
            console.log("status async:",status) 
            console.log("status:",isLoggedIn)
            nextScreen()
            
           
        }  
        catch(error){  
          alert(error)  
        }  
      }

    const nextScreen=()=>
    setTimeout( async () => {
        console.log(await AsyncStorage.getItem('isLoggedIn'))
        if(await AsyncStorage.getItem('isLoggedIn')){  
      navigation.replace('Dashboard')}
      else {
      navigation.replace('Login')}
      
    }, 2500)
    

    return (
      <View style={styles.container} >
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Animatable.Image 
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
            />
            <Animatable.Text animation="fadeInUp" style={{fontSize:30,color:'#ffffff',fontWeight:'bold'}}>App Name</Animatable.Text>
            
        </View>


        <View style={{flexDirection:'column',justifyContent:'flex-end',margin:5}}>
          <Animatable.Text animation="fadeInUp" style={{textAlign:'center'}}>from</Animatable.Text>
          <Animatable.Text animation="fadeInUp" style={{textAlign:'center',fontSize:18,color:'#ffffff'}}>EVOLVEWAYS</Animatable.Text>

        </View>
      
      </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#009387'
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
      width: height_logo,
      height: height_logo
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

