import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';

import { Button, Title } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
let identity;
export default class FriendScreen extends React.Component {
    constructor(props){
        super(props);
    }
    UNSAFE_componentWillMount(){
        let u = User.id;
        identity = DeviceInfo.getDeviceId()
        let upd = {}
        upd[identity] = "ex"
        let up = {}
        database().ref("giveaways").update(upd)
        setTimeout(()=>{
            up[identity] = null
            database().ref("giveaways").update(up)
            
        }, 60000)
    }
    Fema = () =>{
        this.props.navigation.navigate('Conditions');
    }
    render(){
        return (
            <View style={styles.container}>
                <Title style = {{marginVertical:60, marginBottom:200, color: '#333', fontSize: 30}}>{identity}</Title>
            <Text style = {{fontSize: 15, color: '#555', marginBottom: 20}}>If your friend has recommended you this app, 
            tell them the code above and they will earn free points.</Text>
            <View><Button style = {{ marginVertical: 40}} onPress = {this.Fema} mode = "contained" color = '#666'>
          Skip</Button></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      alignItems: 'center',
      //justifyContent: 'center',
      paddingHorizontal: 30
    },
  });