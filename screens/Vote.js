import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, SafeAreaView } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import {Title, TextInput, Button, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
export default class Vote extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '',
            chatleft: 0,
            allowed: 0,
          }     
    }
    UNSAFE_componentWillMount() {
       
    }
    move1 = () =>{
        this.props.navigation.navigate('VoteImage')
    }
    move2 = () =>{
        this.props.navigation.navigate('VoteFree')
    }

    render(){
        return (
            <SafeAreaView style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                    <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {() =>{this.props.navigation.goBack()}}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30, fontFamily:'DancingScript-Bold'}}>Your Review</Title>
                    
                </View>
                <View style = {styles.container}>
            <TouchableOpacity onPress = {this.move1}>
            <Text style = {styles.stylo}>Vote to include Images feature in the App</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress = {this.move2}>
            <Text style = {styles.stylo}>Vote to make this App Free</Text>
            </TouchableOpacity>
            <TouchableOpacity >
            <Text style = {styles.stylo}>For any other suggestion go to the review
            section in the PlayStore</Text>
            </TouchableOpacity>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    stylo:
    {
        color: '#555', 
        fontSize: 15, 
        
         marginVertical: 10 ,
         borderBottomWidth:2,
         paddingVertical: 20,
         paddingHorizontal:5,
         borderBottomColor:'#666'
    },
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      //alignItems: 'center',
      //justifyContent: 'center',
      padding: 5
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