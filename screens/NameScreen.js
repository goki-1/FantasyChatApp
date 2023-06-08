import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import  {TextInput, Button, Text, Caption, Title} from 'react-native-paper';
import User from '../User';
import database from '@react-native-firebase/database';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

import countries from "../countries";
export default class NameScreen extends React.Component {
  state = {
    name: '',
    id: '',
    gender: '',
    avatar: 0,
    country: "",
    countrycode: 0,
  }

  
  handleChange = key => val => {
    this.setState({[key]: val})
  }
  submitForm = async () => {
    if(this.state.name.length < 1){
      Alert.alert('error', 'Cannot leave Name blank')
    }
    else if(this.state.name.length > 14 ){
      Alert.alert('error', 'Name is too long')
    }
    else if (this.state.gender === ''){
      Alert.alert('error', 'Please select the Gender')
    }
    else{
        this.setState({id: DeviceInfo.getUniqueId()});
        await AsyncStorage.setItem('userid', this.state.id);
        await AsyncStorage.setItem('usergender', this.state.gender);
        await AsyncStorage.setItem('username', this.state.name);
        let av
        if(this.state.gender === "f")
        av = (Math.floor (Math.random() * 34)) + 1
        else if(this.state.gender === "m")
        av = (Math.floor(Math.random() * 36)) + 35
        else
        av = (Math.floor(Math.random() * 72)) + 1
        User.avatar = av
        this.state.avatar = av + ""
        await AsyncStorage.setItem('useravatar', this.state.avatar);
        this.state.countrycode = User.countrycode
        this.state.country = countries[User.countrycode]
        console.log(this.state.country)
        User.country = this.state.country
        await AsyncStorage.setItem('usercountrycode',User.countrycode);
        User.id = this.state.id;
        User.name = this.state.name;
        User.gender = this.state.gender;
        let sa = []
        sa[0] = "1"
        sa[1] = "2"
        sa[2] = "3"
        sa[3] = "4"
        sa[4] = "5"
        sa[5] = "6"
        sa[6] = "7"
        sa[7] = "8"
        sa[8] = "9"
        sa[9] = "10"
        
        database().ref('users/' + User.id).set
        ({
          "allowed": 0,
          "name" : this.state.name,
          "gender" : this.state.gender,
          "chatleft" : "20",
          "avatar" : this.state.avatar,
          "country": this.state.country,
          "countrycode": this.state.countrycode,
          "arrinapp": sa,
          "arr_in_data_read":0,
          "chitchat": true,
        })
        
        this.props.navigation.navigate('GiveScreen');
    }
  }
  Male = () =>{
    this.setState({gender: 'm'})
  }
  Female = () =>{
    this.setState({gender: 'f'})
  }
  Other = () =>{
    this.setState({gender: 'o'})
  }
  render(){
    
    return (
      <TouchableWithoutFeedback style={styles.container} onPress = {Keyboard.dismiss}>
        <View style={styles.container}>
        <View style = {{justifyContent:'center',alignItems: 'center',}}>
        <Text style = {{margin: 10,marginBottom: 30, fontFamily:'DancingScript-Bold', 
        fontSize:40, justifyContent:'center'}}>Fantasy Chat</Text>
        </View>
        <Text style = {{margin: 10, marginLeft:20,fontSize:20,fontFamily:'DancingScript-Bold', }}>Type Username </Text>
        <TextInput
          label = 'Name'
          placeholder = "Type your username...."
          value = {this.state.name}
          onChangeText = {this.handleChange('name')}
          underlineColor = "#777"
        />
        <Text style = {{marginTop:20, marginLeft:20,fontSize:20,fontFamily:'DancingScript-Bold', }}>Select your Gender</Text>
        <View style = {{ marginHorizontal:60}}>
        <Button style = {{ marginVertical: 10,marginHorizontal:34}} onPress = {this.Female} mode = "contained" color = {this.state.gender === 'f' ? '#222' : '#999'}>
          Female
        </Button>
        <Button style = {{ marginVertical: 10,marginHorizontal:34}} onPress = {this.Other} mode = "contained" color = {this.state.gender === 'o' ? '#222' : '#999'}>
          Other
        </Button>
        <Button style = {{ marginVertical: 10,marginHorizontal:34}} onPress = {this.Male} mode = "contained" color = {this.state.gender === 'm' ? '#222' : '#999'}>
          Male
        </Button>
        </View>
        <TouchableOpacity style = {{ margin: 30,marginHorizontal:'10%',alignItems:'center'}} onPress = {this.submitForm}>
            <Text style = {{fontFamily:'DancingScript-Bold',fontSize:25, color: '#fff'}}>Continue</Text>
        </TouchableOpacity>
        
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ccc',
    //alignItems: 'center',
     justifyContent: 'center',
  },
});
