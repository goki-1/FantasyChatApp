import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, KeyboardAvoidingView,TouchableWithoutFeedback, Keyboard } from 'react-native';
import  {TextInput, Button, Text, Caption, Title} from 'react-native-paper';
import User from '../User';
import database from '@react-native-firebase/database';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Feather';
export default class NameScreen extends React.Component {
  state = {
    name: '',
    id: '',
    gender: '',
    avatar: 0,
  }

  
  handleChange = key => val => {
    this.setState({[key]: val})
  }
  submitForm = async () => {
    if(this.state.name.length < 1 ){
      Alert.alert('error', 'Cannot leave Name blank')
    }
    else if(this.state.name.length > 14 ){
        Alert.alert('error', 'Name is too long')
      }
    else if (this.state.gender === ''){
      Alert.alert('error', 'Please select the Gender')
    }
    else{
        
        await AsyncStorage.setItem('usergender', this.state.gender);
        await AsyncStorage.setItem('username', this.state.name);

        User.name = this.state.name;
        User.gender = this.state.gender;
        let av
        if(this.state.gender === 'f')
        av = (Math.floor (Math.random() * 34)) + 1
        else if(this.state.gender === 'm')
        av = (Math.floor(Math.random() * 37)) + 35
        else
        av = (Math.floor(Math.random() * 72)) + 1
        User.avatar = av
        this.state.avatar = av + ""
        await AsyncStorage.setItem('useravatar', this.state.avatar);
        
        database().ref('users/' + User.id).update
        ({
          "name" : this.state.name,
          "gender" : this.state.gender,
          "avatar" : this.state.avatar,
        })
        this.setState({name: ''})
        this.setState({id: ''})
        this.setState({gender: ''})
        this.setState({avatar: 0})
        this.props.navigation.navigate('HomeDrawer');
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
  movebac = () =>{
    this.props.navigation.goBack();
  }
  render(){
    
    return (
      <TouchableWithoutFeedback style={styles.container} onPress = {Keyboard.dismiss}>
        <View style={styles.container}>
        <View style = {styles.header}>
                    <Icon name = "arrow-left" size={30} color="#ccc" onPress = {this.movebac}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 25,marginLeft:30, fontFamily:'DancingScript-Bold'}}>Profile</Title>
                    {/* <Icon name = "edit" size={30} color="#ccc" style = {{marginLeft: "30%"}}/> */}
                </View>
        <Title style = {{margin: 10, marginBottom: 40,fontFamily:'DancingScript-Bold', fontSize:25}}>Please enter your correct gender only</Title>
        <Text style = {{margin: 10, marginLeft:20,fontFamily:'DancingScript-Bold',fontSize:18}}>Type New Username </Text>
        <TextInput
          label = 'Name'
          placeholder = "Type your username...."
          value = {this.state.name}
          onChangeText = {this.handleChange('name')}
          underlineColor = "#777"
          style = {{margin: 10}}
        />
        <Text style = {{marginTop:20, marginLeft:20,fontFamily:'DancingScript-Bold',fontSize:18}}>Select your Gender again</Text>
        <View style = {{ marginHorizontal:110,}}>
        <Button style = {{ marginVertical: 10}} onPress = {this.Female} mode = "contained" color = {this.state.gender === 'f' ? '#222' : '#999'}>
          Female
        </Button>
        <Button style = {{ marginVertical: 10}} onPress = {this.Other} mode = "contained" color = {this.state.gender === 'o' ? '#222' : '#999'}>
          Other
        </Button>
        <Button style = {{ marginVertical: 10}} onPress = {this.Male} mode = "contained" color = {this.state.gender === 'm' ? '#222' : '#999'}>
          Male
        </Button>
        </View>
        <TouchableOpacity style = {{ margin: 25,marginHorizontal:"10%",alignItems:'center'}} onPress = {this.submitForm}>
            <Text style = {{fontFamily:'DancingScript-Bold',fontSize:25, color: '#fff'}}>Update</Text>
        </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#ccc',
    
     //justifyContent: 'center',
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#444',
    padding: 20,
    elevation: 9,
     
      shadowOffset: { width: 10, height: 10 },
      shadowColor: '#000',
      shadowOpacity: 0,
    
  },
});
