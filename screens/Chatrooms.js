import React from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, SafeAreaView, FlatList,  Image} from 'react-native';
import User from '../User';
import {Title, Text, Avatar} from 'react-native-paper';
import database from '@react-native-firebase/database';
//import Icon from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-community/async-storage';
const f = require("./Images");

//import { FlatList } from 'react-native-gesture-handler';

export default class Chatrooms extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            users: [],
        }
    }

    UNSAFE_componentWillMount(){
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.forceUpdate();
          });
        
        let deb = database().ref('users/'+ User.id + '/chatrooms');
        deb.on('child_added', (value) => {
            let person = value.val();
                person.id = value.key;
                // console.log("while addinh")
                // console.log(this.state.users)
                this.setState((prevState) => {
                    return{
                        users: [person, ...prevState.users]
                    }
                })
                
        })
        
        let deb3 = database().ref('users/'+ User.id + '/chatrooms');
        deb3.on('child_removed', (value) => {
            let person = value.val();
                person.id = value.key;
                this.setState((prevState) => ({users: prevState.users.filter(perso => perso.id !== person.id) }))
        })

        let deb2 = database().ref('users/'+ User.id + '/chatrooms');
        deb2.on('child_changed', (value) => {
            let use = value.val();
            //console.log(this.state.users)
            use.id = value.key;
            let updated = value.child('updated').val()
            let seen = value.child('seen').val()

            if(seen === false){
                this.setState((prevState) => ({users: prevState.users.filter(perso => perso.id !== use.id) }))
                use.seen = false
                database().ref('users/'+ User.id + '/chatrooms/' + use.id).update({'updated': 'no'})
                this.setState((prevState) => {
                    return{
                            users: [use, ...prevState.users]
                        }
                })
            }
            if(seen === true){
                this.setState((prevState) => ({users: prevState.users.filter(perso => perso.id !== use.id) }))
                use.seen = true
                database().ref('users/'+ User.id + '/chatrooms/' + use.id).update({'updated': 'no'})
                this.setState((prevState) => {
                    return{
                            users: [use, ...prevState.users]
                        }
                })
            }
            if(updated === "yes"){
                // console.log(updated + "kppp")
                // console.log(this.state.users.length)
                this.setState((prevState) => ({users: prevState.users.filter(perso => perso.id !== use.id) }))
                use.seen = false
                database().ref('users/'+ User.id + '/chatrooms/' + use.id).update({'updated': 'no'})
                this.setState((prevState) => {
                    return{
                            users: [use, ...prevState.users]
                        }
                })
                
                
            }
            
        })

    }
    im = (i) =>{
        let g
        f.default.find(function(e){
            //console.log((i + " " + e.src))
            if (e.id == i) 
                g = e
            })

            return g;
    }
    renderRow = ({item}) => {
        return (
            <TouchableOpacity
                onPress ={() => this.props.navigation.navigate('ChatScreen', item)} 
                style = {{padding: 15, borderBottomColor: '#999', borderBottomWidth:1}}
                >
                <View style = {{alignItems: 'flex-start', flexDirection:'row'}}>
                <Avatar.Image source = { (this.im(item.avatar)).src
                        }
                    size = {50}
                    
                    />
                <Text style = {{fontSize: 25, fontFamily:'DancingScript-Bold', marginLeft: '5%'}}>{item.name}</Text>
                  {!item.seen && <Text style = {{fontSize: 10, marginLeft: '10%', marginTop: '2%'}}>new message</Text>} 
                  </View>
            </TouchableOpacity>
        )
        
    }
    movebac = () =>{
        this.props.navigation.goBack();
    }
    render(){
        return (
            <SafeAreaView style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                    <Icon name = "arrow-left" size={30} color="#ccc" onPress = {this.movebac}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,
                    fontFamily:'DancingScript-Bold'}}>Fantasy chat</Title>
                    {/* <Icon name = "edit" size={30} color="#ccc" style = {{marginLeft: "30%"}}/> */}
                </View>
            <FlatList
                data = {this.state.users}
                renderItem = {this.renderRow}
                keyExtractor = {(item) => item.id}
            />
            
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
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
        alignItems: 'center',
        backgroundColor:'#444',
        padding: 20,
        elevation: 9,
         
          shadowOffset: { width: 10, height: 10 },
          shadowColor: '#000',
          shadowOpacity: 0,
        
      },
  });