import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler, SafeAreaView } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import {Title, TextInput, Button, Caption} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
export default class VoteFree extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            number: 0,
            voted:false
          }
        
          
          
    }
    UNSAFE_componentWillMount() {
        let g = "users/" + User.id + "/votefree" 
        let gf = database().ref(g)
        gf.on('value', (value) => {
            this.state.voted = value.val();
        })

        
    }
    movebac = () =>{
        this.props.navigation.goBack();
    }
    move2 = () =>{
        if(this.state.voted){
            let g = "vote/free"
            let gf = database().ref(g)
            gf.once('value', (value) => {
                this.state.number = value.val()
                let h = 1 + this.state.number
                let updates = {}
                updates["free"] = h
                database().ref("vote").update(updates)
            })
            database().ref("users/" + User.id).update({"votefree": false})
        }
        else{
            Alert.alert('You have Voted', 'Ask your friends to vote for the cause too')
        }
    }

    render(){
        return (
            <SafeAreaView style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                    <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {this.movebac}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 25, fontFamily:'DancingScript-Bold'}}>Free App</Title>
                    
                </View>
                <View style = {styles.container}>
            <TouchableOpacity style ={{marginTop:60}}>
            <Text style = {{ paddingVertical: 20,color: '#555',marginBottom:40, fontSize: 15, marginTop: 20 ,borderBottomWidth: 2,
        borderTopWidth:2,borderColor:'#999'}}>To deal with the cost of database
            and servers we cannot have app free. Either it could be Free but with ads OR there will be in-app purchases 
            and there will be no Ads. If you choose NOT to vote, you support the in-app purchase feature. 
            Your view will be counted soon</Text>
            </TouchableOpacity>
            <Button onPress = {this.move2} color = "#555">
            <Text style = {{fontSize:14,}}>Make App free</Text>
            </Button>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 0,
      backgroundColor: '#ccc',
      //alignItems: 'center',
      justifyContent: 'center',
      padding: 10
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