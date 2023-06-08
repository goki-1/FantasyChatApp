import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback,Keyboard, Alert, BackHandler, SafeAreaView } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import {Title, TextInput, Button, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
export default class FriendScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            code: '',
            chatleft: 0,
            allowed: 0,
            sharesallowed:0
          }
          
    }
    UNSAFE_componentWillMount() {
        let td = "users/" + User.id + "/chatleft"
            let t = database().ref(td)
            t.on('value', (value) => {
                console.log(value.val())
                this.setState({chatleft : value.val()})
                console.log(this.state.chatleft);
            })

        let td2 = "sharesallowed"
        let t2 = database().ref(td2)
        t2.on('value', (value) => {
            this.setState({sharesallowed: value.val()})
        })

        let td1 = "users/" + User.id + "/allowed"
        let t1 = database().ref(td1)
        t1.on('value', (value) => {
            this.setState({allowed: value.val()})
        })
    }
    handleChange = key => val => {
        this.setState({[key]: val})
      }
    Fema = () =>{
        if(this.state.code.length > 2){
            
        
        if(this.state.allowed < this.state.sharesallowed)
        {
                let db = database().ref("giveaways")
                db.once('value', (value)=> {
                    if(value.child(this.state.code).exists())
                    {                        
                        let t = this.state.chatleft + 40;
                        let r = this.state.allowed + 1;
                        database().ref("users/" + User.id).update({"chatleft": t})
                        database().ref("users/" + User.id).update({"allowed": r})
                        let upd = {}
                        upd[this.state.code] = null
                        database().ref("giveaways").update(upd)
                        this.setState({code: ''})
                    }
                    else{
                        Alert.alert('error', 'Either Code is used or it is uncorrect!!!')
                    }
                })
        }
            else{
                Alert.alert('Sorry', 'You can only earn chats by sharing with two friends yet!!!')
            }
        
        }
        else{
            Alert.alert('error', 'Type valid Code!!!')
        }
        
    }
    render(){
        return (
            <TouchableWithoutFeedback style = {{flex: 1, backgroundColor:"#ccc"}} onPress = {Keyboard.dismiss}>
        <View style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                    <Icon name = "arrow-left" size={30} color="#ccc" onPress = {() =>{this.props.navigation.goBack()
                    }} />
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 25,fontFamily:'DancingScript-Bold'}}>Share with friends</Title>
                    
                </View>
                <View style = {styles.container}>
            <Text style = {{color: '#555', fontSize: 16, marginTop: 50}}>Tell your friend about the app. When they download it,
                 and get the code. Type the code here within 1 minute of downloading it and you will get free chats.</Text>
        <Caption style = {{marginVertical: 20, fontSize: 19,fontFamily:'DancingScript-Bold'}}>Your current Chats left {this.state.chatleft}</Caption>
            <TextInput
                label = 'Earn Chats'
                placeholder = "Type your code...."
                value = {this.state.code}
                onChangeText = {this.handleChange('code')}
                underlineColor = "#999"
            />
            <Button style = {{ marginVertical: 50, marginHorizontal:50}} onPress = {this.Fema} mode = "contained" color = '#777'>
          Check !!</Button>
          </View>
            </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      //alignItems: 'center',
      //justifyContent: 'center',
      padding: 20
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