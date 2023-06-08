import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import {Caption, Title, Button} from 'react-native-paper';

export default class Conditions extends React.Component {
    
    navi = async () =>{
        
        this.props.navigation.navigate('NameScreen')
    }
    render(){
        return (
            <View style={styles.container}>
                
            <Title style = {styles.tit}>Welcome to Fantasy Chat</Title>
            <Text style = {styles.cap}>
                An app for people to share their fantacies with one another.</Text>
                

            <TouchableOpacity onPress = {this.navi} style ={{marginTop:40}}>
                <Text style = {{color: '#fff',
        fontSize: 25,
        fontFamily:'DancingScript-Bold'}}>Continue !</Text>
            </TouchableOpacity>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tit: {
        //marginBottom:50,
        marginVertical:30,
        marginHorizontal:10,
        marginBottom:100,
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
      padding: 10
    },
    cap: {
        fontFamily:'DancingScript-Bold',
        marginVertical:37,
        marginHorizontal:10,
        marginBottom:70,
        fontSize: 25,
        color: "#555"
    }
  });