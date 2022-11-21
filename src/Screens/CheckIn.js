import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import moment from 'moment';
import React,{ useState,useEffect } from 'react';
import {Stopwatch,} from 'react-native-stopwatch-timer';
import MaterialICons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CheckIn({navigation,route}){

  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);
  let timer=''
  const [time,setTime]=useState('')
  const [startTime,setStartTime]=useState()
  const [endTime,setEndTime]=useState()
  const [totalTime,setTotalTime]=useState()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      let starttime=await AsyncStorage.getItem("starttime")
      setStartTime(starttime)
      console.log(starttime)
      
      
      // The screen is focused
      // Call any action
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

 

    const handleTotalTime=()=>{
        let date=moment().format("HH:mm")
        let startsplit=startTime.split(":")
        let starthrs= parseInt(startsplit[0])
        let startmins= parseInt(startsplit[1])
        let endsplit=date.split(":")
        let endhrs= parseInt(endsplit[0])
        let endmins=parseInt(endsplit[1])
        let starttime=(starthrs*60)+startmins
        let endtime=(endhrs*60)+endmins
        
        console.log("start time:",endhrs)
        console.log("end time:",endmins)
        console.log("start diff:",starttime)
        console.log("end diff:",endtime)
        let totaltime=endtime-starttime
        let hours=Math.floor(totaltime/60)
        let mins=totaltime%60
       console.log(hours+":"+mins)
       setTotalTime(hours+":"+mins)
    }

   const date=moment().format("MMM Do");
    return(
        <View style={{flexDirection:'column',backgroundColor:'#cfe6fa'}}>
            <View style={{height:'25%',backgroundColor:'#61aced',flexDirection:'column',justifyContent:'center',  shadowColor: '#000000', margin:20,borderRadius:20,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity:  0.5,
        shadowRadius: 3,
        elevation: 20,}}>
                <Text style={{textAlign:'center',color:'#ffffff',fontSize:25}}>Welcome Adnan</Text>
               
                <View style={{height:50,backgroundColor:'#97cc8b',flexDirection:'column',justifyContent:'center',  shadowColor: '#000000', margin:20,borderRadius:20,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity:  0.5,
        shadowRadius: 3,
        elevation: 20,}} >
        <Text style={{textAlign:'center',color:'#ffffff',fontSize:20}}>You are currently working on Ship</Text>

        </View>
                
            </View>
            <View style={{height:'25%',backgroundColor:'#97cc8b',flexDirection:'column',justifyContent:'center',  shadowColor: '#000000',borderRadius:20,
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity:  0.5,
        shadowRadius: 3,
        elevation: 20,}}>
                
                <View style={{flex:4,flexDirection:'column',justifyContent:'center'}}>
                <View>
                <Stopwatch
            
            laps={true}
            start={isStopwatchStart}
            // To start
            reset={resetStopwatch}
            // To reset
            options={options}
            
            
            // Options for the styling
           
            
            
          />
                </View>
                </View>
                <View style={{backgroundColor:'#61aced',justifyContent:'center',flex:1,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                <Text style={{textAlign:'center',color:'#ffffff',fontSize:22,}}>Total Hours for {date}:- {totalTime}</Text>
                </View>
                
            </View>
            {!isStopwatchStart && startTime==null ?
            <View style={{backgroundColor:'#cfe6fa',height:'50%',justifyContent:'flex-start'}}>
                <TouchableOpacity 
                onPress={()=>{setIsStopwatchStart(!isStopwatchStart);
                    
             
                            setResetStopwatch(false);
                            setStartTime(moment().format('HH:mm'))
                            AsyncStorage.setItem("starttime",moment().format('HH:mm'))}}
                style={{backgroundColor:'#97cc8b',borderRadius:150,height:200,width:200,alignSelf:'center',flexDirection:'column',justifyContent:'center',margin:20,  shadowOffset: { width: 10, height: 10 },
        shadowOpacity:  0.5,
        shadowRadius: 3,
        elevation: 20}}>
                    <MaterialICons
                        name="timer"
                        color="#ffffff"
                        size={100}
                        style={{alignSelf:'center'}}
                    />
                    <Text style={{textAlign:'center',color:'#ffffff',fontSize:22}}>Start Shift</Text>
                </TouchableOpacity>

                

            </View>:
            <View style={{backgroundColor:'#cfe6fa',height:'50%'}}>
                <TouchableOpacity 
                onPress={()=>{ setIsStopwatchStart(false);
                   
              setResetStopwatch(true);
              setEndTime(moment().format('HH:mm'))
              AsyncStorage.removeItem("starttime")
              setStartTime()
              
              handleTotalTime()}}
                style={{backgroundColor:'#fa7a7f',borderRadius:150,height:200,width:200,flexDirection:'column',justifyContent:'center',margin:20,alignSelf:'center',  shadowOffset: { width: 10, height: 10 },
        shadowOpacity:  0.5,
        shadowRadius: 3,
        elevation: 20}}>
                    <MaterialICons
                        name="timer-off"
                        color="#ffffff"
                        size={100}
                        style={{alignSelf:'center'}}
                    />
                    <Text style={{textAlign:'center',color:'#ffffff',fontSize:22}}>End Shift</Text>
                </TouchableOpacity>

                

            </View>}
          
        </View>
    )

}
const options={
    container:{
        backgroundColor:'#97cc8b',
        alignSelf:'center',
        
    },
    text:{
        fontSize:50
    }
}