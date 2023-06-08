import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert , Image, SafeAreaView, FlatList} from 'react-native';
import User from '../User';
import {Title} from 'react-native-paper'; 
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Entypo';
import Profiles from './Images';
//const Profiles = require('./Images');
import Icon2 from 'react-native-vector-icons/Feather';

export default class AvatarScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            gender: "o",
        }
        
    }

    UNSAFE_componentWillMount(){
        // let yyy = database().ref("users/" + User.id + "/gender")
        // yyy.once("value",(value)=>{
        //     this.setState({gender: value.val()})
        // })
        this.setState({gender: User.gender})
        }
            
    pre = (i) =>{
        let d = i + ""
        database().ref("users/" + User.id).update({"avatar": d});
        //await AsyncStorage.setItem('useravatar', d);
        User.avatar = d
    }

    renderRow = ({item}) => {
        return (
            
            <TouchableOpacity style = {{borderWidth: 2, borderColor: '#ccc'}} onPress = {() => {this.pre(item.id)}}>
                
                {this.state.gender === "f" && item.id <= 34 && 
                <Image style = {{width: 110, height: 110, resizeMode: 'stretch'}} source={item.src}/>}
                {this.state.gender === "m" && item.id > 34 && 
                <Image style = {{width: 110, height: 110, resizeMode: 'stretch'}} source={item.src}/>}
                {this.state.gender === "o" && 
                <Image style = {{width: 110, height: 110, resizeMode: 'stretch'}} source={item.src}/>}
            </TouchableOpacity>
        )
        
    }
    movebac = () =>{
        this.props.navigation.goBack()
    }
    render (){
        return (
            <View style = {{flex: 1, backgroundColor:"#ccc", justifyContent:'center'}}>
                <View style = {styles.header}>
                    <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {this.movebac} />
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,
                    fontFamily:'DancingScript-Bold'}}>Avatar</Title>
                    
                </View>
            <FlatList
                contentContainerStyle = {styles.grid}
                data = {Profiles}
                renderItem = {this.renderRow}
                keyExtractor = {(item, index) => item.id}
                horizontal = {false}
                numColumns = {3}   
            />
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    grid:{
        //flexDirection: 'row',
        //flex: 1,
        justifyContent: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        //alignItems: 'center',
        backgroundColor:'#444',
        padding: 10,
        elevation: 9,
         
          shadowOffset: { width: 10, height: 10 },
          shadowColor: '#000',
          shadowOpacity: 0,
        
      },
  });