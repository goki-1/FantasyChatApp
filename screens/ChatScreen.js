import * as React from 'react';
import {FlatList, StyleSheet, View, Text, SafeAreaView, Dimensions, ActivityIndicator,
    Animated, Platform, Keyboard, KeyboardAvoidingView, TouchableOpacity,TextInput, Alert, Modal} from 'react-native';

import {Title, Button, Avatar, Caption} from 'react-native-paper';
import database from '@react-native-firebase/database';

import User from '../User';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import {TypingAnimation} from 'react-native-typing-animation';
import NetInfo from "@react-native-community/netinfo";
//import Icon1 from 'react-native-vector-icons/Entypo';

const f = require("./Images");
const isIOS = Platform.OS === 'ios';

 export default class HomeScreen extends React.Component{
    
    
    constructor(props){
        super(props);
        
        const {name} = props.route.params;
        const {id} = props.route.params;
        const {avatar} = props.route.params;
        this.state = {
            acceptthis: false,
            acceptother: false,
            seen: true,
            textMessages:'',
            person: {
                namee: name,
                idd: id,
                avatarr:avatar,
            },
            messageList: [],
            othertyping: false,
            isConnected: false,
            a: "55",
            modal: false,
        }

        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(60);
    }
    
    
    UNSAFE_componentWillMount(){
        let p = 'users/' + User.id + '/chatrooms/' + this.state.person.idd;
        let bh = database().ref(p)
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            bh.update({"seen": true})
          });

        let bg = database().ref("users/" + User.id + "/chatrooms/" + this.state.person.idd + "/avatar")
        bg.on('value', (value) =>{
            console.log(value.val() + " poiu")
            this.setState({a: value.val()})
        })
        
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true));
        this.keyboardHideListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e,false));
            let vx = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/acceptother"
            let dbRef = database().ref(vx);
            
            dbRef.on('value', (value)=>{
                if(value.val() === "no"){
                    this.setState({acceptother: false})  
                }
                if(value.val() === "yes"){
                    this.setState({acceptother: true})
                }

            })

            let vx2 = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/acceptthis"
            let dbRef2 = database().ref(vx2);
            dbRef2.on('value', (value)=>{
                if(value.val() === "no"){
                    this.setState({acceptthis: false})
                }
                if(value.val() === "yes"){
                    this.setState({acceptthis: true})
                }
                   
            })
            
        let g = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/typing"
        let db2 = database().ref(g)
        db2.on('value', (valu)=>{
            if(valu.val() === "no"){
                this.setState({othertyping : false})
            }
            if(valu.val() === "yes"){
                this.setState({othertyping : true})
            }
        })
        let v4 = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/messages"
        let dbReff = database().ref(v4);
        dbReff.on('child_added', (value)=>{
            this.setState((prevState)=> {
                return{
                    messageList: [...prevState.messageList, value.val()]
                }
            })
        })
        const unsubscribe = NetInfo.addEventListener(state => {
            this.setState({isConnected: state.isConnected});
          });
        

    }
    handleChange = key => val => {
        this.setState({[key]: val})
            if(val.length > 0){
                const s = "users/" + this.state.person.idd + "/chatrooms/" + User.id;
                database().ref(s).update({"typing":"yes"})
            }
            else{
                const s = "users/" + this.state.person.idd + "/chatrooms/" + User.id;
                database().ref(s).update({"typing":"no"})
            }    
    }
    
    componentWillUnmount(){
        this.keyboardHideListener.remove();
        this.keyboardShowListener.remove();
        
    }
    keyboardEvent = (event, isShow) => {
        let heightOS = isIOS ? 60 : 20;
        let bottomOS = isIOS ? 120 : 140;
        Animated.parallel([
            Animated.timing(this.keyboardHeight, {
                duration: event.duration,
                useNativeDriver: false,
                toValue: isShow ? heightOS : 0
            }),
            Animated.timing(this.bottomPadding,{
                duration: event.duration,
                useNativeDriver: false,
                toValue:isShow ? bottomOS : 60
            })
        ]).start();
    }
    disconnect = () => {
        let v1 = "users/"+ User.id + "/chatrooms" ;
        let updates = {};
        let updates2 = {};
        updates[this.state.person.idd] = null;
        database().ref(v1).update(updates)
        updates2[User.id] = null
        let v2 = "users/" + this.state.person.idd + "/chatrooms";
        database().ref(v2).update(updates2)
        this.props.navigation.navigate('Chatroom');
    }

    accept = () =>{
        this.setState({acceptthis: true})
        let v2 = "users/" + User.id + "/chatrooms/" + this.state.person.idd;
        database().ref(v2).update({"acceptthis": "yes"})
        let v3 = "users/" + this.state.person.idd + "/chatrooms/" + User.id;
        database().ref(v3).update({"acceptother": "yes"})
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if(c.getDay() !== d.getDay()){
            result = d.getDay() + ' ' + d.getMonth() + ' ' + result;
        }
        return result;
    }
    sendMessage = async () => {
        if(this.state.textMessages.length > 0){
            let v5 = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/messages"
            
            let msgId = database().ref(v5).push().key;
            let updates = {};
            let updatess = {};
            let message = {
                message: this.state.textMessages,
                time: database.ServerValue.TIMESTAMP,
                from: User.id
            }
            let b1 = "users/"+ User.id + "/chatrooms/" + this.state.person.idd + "/messages";
            updates[msgId] = message;
            let b2 = "users/"+ this.state.person.idd + "/chatrooms/" + User.id + "/messages";
            updatess[msgId] = message;
            database().ref(b1).update(updates);
            database().ref(b2).update(updatess);
            const s = "users/"+ User.id + "/chatrooms/" + this.state.person.idd;
            database().ref(s).update({"typing":"no"})
            
            database().ref(s).update({"updated":"yes"})
            const s3 = "users/"+ this.state.person.idd + "/chatrooms/" + User.id;
            database().ref(s3).update({"updated":"yes"})
            database().ref(s3).update({"seen":false})
            this.setState({textMessages: ''})
        }
    }
    ope = () =>{
        this.props.navigation.openDrawer();
    }
    showModal = () => {
        this.setState({modal:true})
    }
    im = () =>{
        let g
        let j = this.state.a
        //console.log("ppppppp")
        f.default.find(function(e){
            
            if (e.id == j)
                g = e
                
            })

            return g;
    }
    renderRow = ({item}) => {
        return(
            <View style = {{
                flex : 1,
   
                alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
                marginBottom: 5}}>
                <View>
                        {item.from !== User.id && <Text style = {{fontSize: 10}}>{this.state.person.namee}</Text>}
                </View>
            <View style = {{
                flexDirection: 'row',
                maxWidth:'60%',
                alignItems: 'center',
                justifyContent: 'center',
                flex : 1,
                //padding:2,
                alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
                marginBottom: 5}}>
                
                <Avatar.Image source={
                        this.im().src}
                    size={item.from === User.id ? 0: 40}
                    
                    />
            <View style = {{
                
                marginLeft: 5,
                justifyContent:'center',
                backgroundColor: item.from === User.id ? '#333': '#777',
                borderRadius: 7,
                //paddingRight: 4
            }}>
                <View style = {{padding: 7}}>
                <Text style = {{color: item.from === User.id ? '#bbb': '#000', fontSize: 13,}}>
                    {item.message}
                </Text>
                </View>
                <View style = {{padding: 3}}>
                <Text style = {{color: item.from === User.id ? '#bbb': '#000', fontSize: 8, }}>
                    {this.convertTime(item.time)}
                </Text>
                </View>
            </View>
            </View>

            </View>
        )
    }
    op = () =>{
        this.props.navigation.goBack();
    }
    render(){
        let {height} = Dimensions.get('window');
        if(this.state.acceptother && !this.state.acceptthis){
        return(
            <SafeAreaView style = {{backgroundColor:"#ccc", flex: 1, paddingBottom:'20%'}}>
                <View style = {styles.header}>
                    <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {this.op}/>
                <View style = {{maxWidth:200, minWidth:200}}>
                    <Text style= {{marginLeft: 15, color: "#ccc", fontSize: 21,fontFamily:'DancingScript-Bold'}}>
                        {this.state.person.namee}</Text>
                    </View>
                    {/* <Avatar.Image source={(this.im()).src}
                size={item.from === User.id ? 0: 40}
            /> */}
                    <Icon name = "edit" size={30} color="#ccc" style = {{marginStart:'13%',}}/>
                </View> 
                <FlatList></FlatList>
                <View style = {{flexDirection: 'row',}}>
                <Button style = {styles.buttt} onPress = {this.disconnect} mode = "contained" color = "#555">
                Decline
                </Button>
                <Button style = {styles.buttt} onPress = {this.accept} mode = "contained" color = "#555">
                Accept
                </Button>
                </View>
            </SafeAreaView>
        )
        
    }
    else if(this.state.acceptother && this.state.acceptthis){
        return(
        <KeyboardAvoidingView behavior = "height" style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {this.op}/>
                <View style = {{maxWidth:200, minWidth:200}}>
                <Text style= {{marginLeft: 15, color: "#ccc", fontSize: 21,fontFamily:'DancingScript-Bold'}}>
                    {this.state.person.namee}</Text>
                    </View>
                    {/* <Avatar.Image source={(this.im()).src}
                size={40}
            /> */}
                    <Icon name = "edit" size={30} color="#ccc" style = {{marginStart: "13%"}} onPress = {this.showModal}/>
                </View> 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <TouchableOpacity color = "#777" onPress={this.disconnect}>
                        <Caption style = {{fontSize:15}}>Delete the chatroom</Caption>
                        </TouchableOpacity>
                    <TouchableOpacity color = "#777" onPress={this.disconnect} style = {{marginVertical: 10}}>
                        <Caption style = {{fontSize:15}}>Report the User</Caption>
                        </TouchableOpacity>
                        <Button color = "#777" mode = "outline" style = {{marginHorizontal: 35, }}
                        onPress={() => {
                            this.setState({modal:false});
                        }}>
                        X
                        </Button>
                    </View>
                    </View>
                </Modal>
                <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, marginBottom:65, marginRight:"90%"}]}>
                {this.state.othertyping && <TypingAnimation style = {{marginBottom: 5,}} dotRadius={5} dotColor="#777"
        dotMargin={10}/>}
                </Animated.View>
                <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, backgroundColor: "#ccc",}]}>
                
                {/* <TouchableOpacity style = {{paddingBottom:10, marginLeft: 1}} onPress = {() => {}}>
                <Icon name = "retweet" size={35} color="#555"/>
                </TouchableOpacity>   */}
                <TextInput
                style = {{marginLeft:"9%", marginRight: "15%", width: "65%", borderWidth:1, borderRadius:10, height: 45}}
                value = {this.state.textMessages}
                placeholder = 'Type message...'
                onChangeText = {this.handleChange('textMessages')}
                />
                <TouchableOpacity style = {{paddingBottom:10, marginRight: 20}} onPress = {this.sendMessage}>
                <Icon name = "aircraft-take-off" size={35} color="#555"/>
                </TouchableOpacity>
                </Animated.View>
                <FlatList
                    ref= {ref => this.flatList = ref}
                    onContentSizeChange = {() => this.flatList.scrollToEnd({animated : true})}
                    onLayout = {() => this.flatList.scrollToEnd({animated: true})}
                    style = {{paddingTop: 10, paddingHorizontal: 5, marginBottom:10}}
                    data = {this.state.messageList}
                    renderItem = {this.renderRow}
                    keyExtractor = {(item, index) => index.toString()}
                    ListFooterComponent = {<Animated.View style={{height: this.bottomPadding}} />}
                />

                
        </KeyboardAvoidingView>
        )
    }
    else
        return(
                
                <SafeAreaView style = {{backgroundColor:"#ccc", flex: 1}}>
                <View style = {styles.header}>
                <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {this.op}/>
                <Text style= {{marginLeft: 15, color: "#ccc", fontSize: 21,fontFamily:'DancingScript-Bold'}}>
                    {this.state.person.namee}</Text>
                    <Icon name = "edit" size={30} color="#ccc" style = {{marginRight: "3%"}}/>
                </View>
                <Button style = {styles.butt} onPress = {this.disconnect} mode = "contained" color = "#555">
                Delete the request
                </Button>
                </SafeAreaView>
                
        )
    
}
}

 
const styles = StyleSheet.create({
  
    header: {
      width: '100%',
      height: 60,
      flexDirection: 'row',
      //alignItems: 'center',
      backgroundColor:'#444',
      padding: 15,
      elevation: 9,
       
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 0,
      
    },
    butt:{
        borderRadius: 10,
        //padding:30,
        //backgroundColor:'#444',
        height:40,
        marginTop:'130%',
        marginHorizontal: '5%',
        //alignItems: 'center',
        justifyContent: 'center',
        elevation: 9,
        //marginLeft:20,
        //marginRight:20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
    },
    buttt:{
        borderRadius: 10,
        //padding:30,
        //backgroundColor:'#444',
        height:40,
        width: 150,
        marginHorizontal: '5%',
        //alignItems: 'center',
        justifyContent: 'center',
        elevation: 9,
        //marginLeft:20,
        //marginRight:20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: '#000',
        shadowOpacity: 0.5,
    },
    input:{
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 5
    },
    bottombar:{
        
        flexDirection: 'row', 
        alignItems: 'center', 
        padding:5,
        justifyContent: 'center',
        position:'absolute',
        bottom:0,
        left: 1,
        right: 0,
        zIndex: 2,
        
    },
    centeredView: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15%",
        marginLeft:"30%"
      },
      modalView: {
        margin: 20,
        paddingHorizontal: 10,
        backgroundColor: "#eee",
        borderRadius: 20,
        paddingVertical: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      
      
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
})

