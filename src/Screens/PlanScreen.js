import { Text, TextInput, View,StyleSheet, Alert, Image, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
export default function PlanScreen(){
  const newDate=moment(new Date()).format("D");
  console.log(newDate)
  const attributes=[
    {date:1,
    agenda:'A',
    ship:'ALR'},
    {date:2,
    agenda:'W',
    ship:'SLR'}]

    const getDayText=(day)=>{
      console.log(day)
      return day
    }

  
    return(
        <View style={{}}>
           <Calendar
            hideArrows={false}
            hideExtraDays={true}
            displayLoadingIndicator={false}
            
            markedDates={{
            '2022-11-14': {color: '#70d7c7', textColor: '#000000'},
    
  }}
           
  dayComponent={({date, state,marking}) => {
    return (
      
      <View style={{backgroundColor:'#e1f5e6',padding:10,margin:-5,width:55}}> 
        
        <Text style={{fontSize:18, color: state === 'disabled' ? 'gray' : 'black',}}>{date.day}</Text>
        <Text style={{textAlign: 'center',fontSize:18,fontWeight:'bold', color: state === 'disabled' ? 'gray' : 'green'}}>{getDayText(date.day)}</Text>
       
        <Text style={{textAlign: 'center',fontSize:18,fontWeight:'bold', color: state === 'disabled' ? 'gray' : 'red'}}>SLr</Text>       
        </View>
      
    );
  }}
  
/>
        </View>
    )
}
const styles=StyleSheet.create({
  monthText:{
    fontSize:100
  }
})