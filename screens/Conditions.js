import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking } from 'react-native';
import {Caption, Title, Button} from 'react-native-paper';
import User from '../User';

import AsyncStorage from '@react-native-community/async-storage';

export default class Conditions extends React.Component {
    
    navi = async () =>{
        
        let you = await AsyncStorage.getItem('userid');
        if(you === null){
            await AsyncStorage.setItem('userid', User.id);
            await AsyncStorage.setItem('usergender', User.gender);
            await AsyncStorage.setItem('username', User.name);
        }
        
        this.props.navigation.navigate('HomeScreen')
    }
    render(){
        return (
            <View style={styles.container}>
                
            <Title style = {styles.tit}>Caution</Title>
            <Caption style = {styles.cap}>
                This app introduces you some anonymous random people around the world.</Caption>
                <Caption style = {styles.cap}>Be careful while disclosing your personal information to them. They may use this information for extraction.
                </Caption>
                <Caption style = {styles.cap}>Please only share images and personal information if you trust the other User.</Caption>
                
                <Caption style = {styles.cap}>It is strictly forbidden to offend other users. Sexual and hateful speech is strictly prohibted</Caption>
            
                <Caption style = {styles.cap}>By continuing, you agree to our following Policies</Caption>
                <TouchableOpacity
                 onPress = {() => {Linking.openURL('https://project-1-41542.web.app/terms.html')}} style = {{color:'#333', marginBottom: 5}}>
                   <Text style = {{color:'#eee'}}>Terms of Service</Text></TouchableOpacity>
                   <TouchableOpacity
                 onPress = {() => {Linking.openURL('https://project-1-41542.web.app')}} style = {{color:'#333'}}>
                   <Text style = {{color:'#eee'}}>Privacy Policy</Text></TouchableOpacity>
            <Button onPress = {this.navi} mode = "contained" color ="#666" style ={{marginTop:20}}>
                <Text>Continue</Text>
            </Button>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tit: {
        //marginBottom:50,
        marginVertical:30,
        marginHorizontal:10,
        marginBottom:70,
        color: '#333',
        fontSize: 30,
        fontFamily:'DancingScript-Bold'
    },
    container: {
      flex: 1,
      margin:0,
      alignItems: 'center',
      //justifyContent: 'center',
      backgroundColor: '#ccc',
      padding: 0
    },
    cap: {
        margin:17,
        fontSize: 15,
        color: "#555"
    }
  });