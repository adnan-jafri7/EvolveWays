import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import CheckIn from './CheckIn';
import PlanScreen from './PlanScreen';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();
export default function Dashboard(){
    const config = {
        animation: 'spring',
        config: {
          stiffness: 1000,
          damping: 500,
          mass: 3,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.01,
        },
      };

      return( 
      <NavigationContainer independent={true}>
        <Tab.Navigator
       screenOptions={{tabBarShowLabel:false,
          tabBarStyle:{
        elevation:0,
        backgroundColor:'#ffffff',
        
        height:50,
        width:'auto',
        ...styles.shadow,
        
      },
    }
      
    }><Tab.Screen  
          
          options={{
            tabBarIcon:({focused})=>(
              <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
                <FontAwesome5Icon
                name='user-check'
                type={FontAwesome5Icon}
                color='#009387'
                size={20}
                style={{color:focused ? '#009387' : '#748c94'}}></FontAwesome5Icon>
        
                <Text style={{color:focused? '#009387' : '#748c94',fontWeight:'bold'}} 
                >Check In</Text>
        
              </View>
                ),
                transitionSpec: {
                  open: config,
                  close: config,
                },
                headerShown: false
              }} name="CheckIn" component={CheckIn}
               />
  
  
  
          <Tab.Screen options={{
            tabBarIcon:({focused})=>(
              <View style={{alignItems:'center', justifyContent:'center',backgroundColor:'#ffffff'}}>
                <FontAwesome5Icon
                name='calendar-alt'
                type={FontAwesome5Icon}
                color='#009387'
                size={20}
                style={{color:focused ? '#009387' : '#748c94'}}>
                </FontAwesome5Icon>      
                <Text 
                style={{color:focused? '#009387' : '#748c94',fontWeight:'bold'}} 
                >Plan
                </Text>
                
        
              </View>
                ),
                transitionSpec: {
                  open: config,
                  close: config,
                },
                headerShown: false,
      
     
                }} name="PlanScreen" component={PlanScreen}
                 /></Tab.Navigator>
                 </NavigationContainer>)
}

const styles=StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset:{
          width:0,
          height:10
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:5
      }
})