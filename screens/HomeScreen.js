import * as React from 'react';
import {FlatList, StyleSheet, View, Text, SafeAreaView, Dimensions, ActivityIndicator, ScrollView,
    Animated, Platform, Keyboard, KeyboardAvoidingView, TouchableOpacity,TextInput, Alert, BackHandler, Modal, ViewPropTypes} from 'react-native';
import {chatbotfunc} from '../Function';
import {reset1} from '../Function';
import {Title, Button, Avatar, Caption} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {chatbotfunc2} from '../Function2';
import {reset2} from '../Function2';
import User from '../User';
//import {MoPubBanner, MoPubInterstitial} from 'react-native-mopub';
// import admob, { MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
// import { RewardedAd, RewardedAdEventType, BannerAd, TestIds } from '@react-native-firebase/admob';
import Icon from 'react-native-vector-icons/Entypo';
import {TypingAnimation} from 'react-native-typing-animation';
import NetInfo from "@react-native-community/netinfo";
//import Profiles from './Images';
import AsyncStorage from '@react-native-community/async-storage';
const f = require('./Images');
//import Icon1 from 'react-native-vector-icons/Entypo';
let ttt = false
const isIOS = Platform.OS === 'ios';
let timee;

// import StartappAds from "react-native-startapp-ads-module";
// StartappAds.initialize('208339630', true);
// import BannerAd from 'react-native-startapp-ads-module/BannerAd';

import { BannerAd } from 'react-native-smaato-ad';

  //StartappAds.initialize('app id', 'return ads');
  

// import {
//     AppodealBanner
// } from 'react-native-appodeal';


//import { InterstitialAdManager } from 'react-native-ads-facebook';

//const BANNERL_UNIT_ID = '961f7d59a6b347018a7c77eb5899bda7';
 export default class HomeScreen extends React.Component{
    
    constructor(props){
        super(props);
        
        
        this.state = {
            production: false,
            chitchat: false,
            face: null,
            connected: false,
            textMessages:'',
            instruction: Math.floor(Math.random()*3 + 1),
            person: {
                name: '066',
                id: '0',
                avatar: null,
            },
            messageList: [],
            waiting: false,
            othertyping: false,
            chatbot : false,
            chatleft : 0,
            isConnected: false,
            pushid : "",
            randomchat: false,
            gender: null,
            modal: false,
            mycountry: User.country,
            othercountry: "",
            anotherdisconnected: false,
            modal2: false,
            modalcolor: ""
        }
        this.baseState = this.state;
        this.keyboardHeight = new Animated.Value(0);
        this.bottomPadding = new Animated.Value(60);
        
    }
    
    im = (i) => {
        let g;
        f.default.find(function(e){
            
            if (e.id == i) 
                g = e
            })
            return g.src;
        }
    UNSAFE_componentWillMount(){
        
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            BackHandler.addEventListener("hardwareBackPress", this.backAction);
          });
          setInterval(()=>{
        
            this.setState({instruction:  (this.state.instruction + 1)%3 + 1})},4000)

          this._unsubscriber = this.props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener("hardwareBackPress", this.backAction);
          });
          let zxc = database().ref("production")
          zxc.on("value", (value) =>{
              this.state.production = value.val()
          })
          let qer = database().ref("users/" + User.id + "/chitchat")
          qer.on("value", (value) => {
              this.state.chitchat = value.val()
          })
          if(!this.state.randomchat && !this.state.chatbot){
            console.log(this.state.person.id + "id112222222222222222222222222222")
            if(this.state.person.id === User.id){
                
                this.setState({connected:false})
                console.log("1111111111111111111111111111111111111111111111")
                const s = "users/" + User.id + "/tts";
                database().ref(s).update({"talking":"no"})
                database().ref(s).update({"messages":null})
            }
        }
        
        this.keyboardShowListener = Keyboard.addListener(isIOS ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => this.keyboardEvent(e, true));
        this.keyboardHideListener = Keyboard.addListener(isIOS ? 'keyboardWillHide' : 'keyboardDidHide',
            (e) => this.keyboardEvent(e,false));
            let vx = "users/"+ User.id + "/tts/talking"
            let dbRef = database().ref(vx);
            let td = "users/" + User.id + "/chatleft"
            let t = database().ref(td)
            t.on('value', (value) => {
                this.state.chatleft = value.val()
            })
            dbRef.on('value', (value)=>{
                
                console.log(value.val());
                if(value.val() === "no"){

                    // this.setState({connected: false})
                    this.setState({waiting: false })
                    this.setState({anotherdisconnected:true})
                }
                if(value.val() === "yes"){
                    this.setState({connected: true})
                    this.setState({waiting: false})
                    this.setState({anotherdisconnected:false})
                    let v1 = "users/" + User.id + "/tts/device"
                    let dbn = database().ref(v1)
                    dbn.on('value', (value)=>{
                        console.log(value.val() + "kkk")
                        this.state.person.id = value.val();  
                    
                    if(!this.state.randomchat && !this.state.chatbot){
                        console.log(this.state.person.id + "id33333333333333333333333")
                        
                        let v2 = "users/" + this.state.person.id + "/name"
                        let v3 = "users/" + this.state.person.id + "/avatar"
                        let v4 = "users/" + this.state.person.id + "/country"

                        let dbn3 = database().ref(v2)
                        dbn3.on('value', (value)=>{
                            
                            this.state.person.name = value.val();
                            console.log(this.state.person.name + "name")  
                        })
                        let dbn4 = database().ref(v4)
                        dbn4.on('value', (value)=>{
                            
                            this.state.othercountry = value.val();
                            console.log(this.state.othercountry + "country")  
                        })
                        let dbn2 = database().ref(v3)
                        dbn2.on('value', (value)=>{
                            let n = value.val();
                            console.log(n + "avatar");
                            this.state.face = n
                            let ops = this.im(n)
                            //console.log(ops + " ops")
                            this.state.person.avatar = ops
                        })
                    }
                    else{
                       // this.state.person.id = 11;
                        if(this.state.randomchat){
                            console.log("wrong one")
                            let a = chatbotfunc2("your avatar")
                            let n = chatbotfunc2(" name ..")
                            this.state.othercountry = chatbotfunc2("countryyy")
                            this.state.person.name =  n;
                            this.state.face = a
                            this.state.person.avatar = this.im(a);
                        }
                        else{
                            console.log("right one")
                            let n = chatbotfunc(" name ..")
                            let a = chatbotfunc("your avatar")
                            this.state.othercountry = chatbotfunc("countryyy")
                            this.state.person.name =  n;
                            this.state.face = a
                            this.state.person.avatar = this.im(a);
                        }
                    }
                })
            }
            })
            
        let g = "users/" + User.id + "/tts/typing"
        let db2 = database().ref(g)
        db2.on('value', (valu)=>{
            if(valu.val() === "no"){
                console.log(valu.val())
                this.setState({othertyping : false})
            }
            if(valu.val() === "yes"){
                console.log(valu.val())
                this.setState({othertyping : true})
            }
        })
        let v4 = User.id + "/tts/messages"
        let dbReff = database().ref("users").child(v4);
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
        let gen = "users/" + User.id + "/gender"
        let genOn = database().ref(gen)
        genOn.on('value', (value)=>{
            if(value.val() === "f")
            {
                this.setState({gender: "f"})
            }
            if(value.val() === "m")
            {
                this.setState({gender: "m"})
            }
        })

    }
    handleChange = key => val => {
        this.setState({[key]: val})
        if(!this.state.chatbot && !this.state.randomchat){
            if(val.length > 0){
                const s = "users/" + this.state.person.id + "/tts";
                database().ref(s).update({"typing":"yes"})
            }
            else{
                const s = "users/" + this.state.person.id + "/tts";
                database().ref(s).update({"typing":"no"})
            }
        }
        
    }
    
    backAction = () =>{
        Alert.alert("hold on!", "Are you sure you want to go back?",[
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {text : "YES", onPress: () => {
                const s = "users/" + User.id + "/tts";
                database().ref(s).update({"talking":"no"})
                database().ref(s).update({"messages":null})
                
                const x = "users/" + this.state.person.id + "/tts";
                database().ref(x).update({"talking":"no"})

                this.setState(this.baseState)
                BackHandler.exitApp()}
            }
        ]);
        return true;
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
        this.setState({anotherdisconnected: false})
        this.setState({modal:false})
        this.setState({connected:false})
        const s = "users/" + User.id + "/tts";
        database().ref(s).update({"talking":"no"})
        database().ref(s).update({"messages":null})
        
        const x = "users/" + this.state.person.id + "/tts";
        database().ref(x).update({"talking":"no"})
        this.state.person.id = 0
        this.setState({chatbot: false})
        this.setState({randomchat: false})
        
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
            let rt = this.state.textMessages
            rt = rt.replace(/penis/gi,"pen!s")
            rt = rt.replace(/cock/gi,"c0ck")
            rt = rt.replace(/dick/gi,"d!ck")
            rt = rt.replace(/ass/gi,"a$s")
            rt = rt.replace(/vagina/gi,"v@g!na")
            rt = rt.replace(/boob/gi,"b00b")
            rt = rt.replace(/fuck/gi,"fuc<")
            rt = rt.replace(/clint/gi,"cl!nt")
            rt = rt.replace(/pussy/gi,"pu$$y")
            rt = rt.replace(/dildo/gi,"d!ldo")
            rt = rt.replace(/porn/gi,"p0rn")
            rt = rt.replace(/blowjob/gi,"bl0wj0b")
            rt = rt.replace(/masterbat/gi,"ma$terbate")

            
            let v5 = User.id + "/tts/messages"
            let msgId = database().ref("users").child(v5).push().key;
            console.log(msgId);
            let updates = {};
            let updatess = {};
            let message = {
                message: rt,
                time: database.ServerValue.TIMESTAMP,
                from: User.id
            }
            let b1 = 'users/' + User.id + '/tts/messages';
            updates[msgId] = message;
            let b2 = 'users/' +  this.state.person.id + '/tts/messages';
            updatess[msgId] = message;
            database().ref(b1).update(updates);
            database().ref(b2).update(updatess);
            const s = "users/" + this.state.person.id + "/tts";
            database().ref(s).update({"typing":"no"})
            
        }
    }
    sendtochatbot = () =>{
        
        if((this.state.chatbot === true || this.state.randomchat === true) &&
         (this.state.textMessages.length > 0) && this.state.isConnected){
            let str;
            let con = false
            clearTimeout(timee);
            if(this.state.chatbot){
                str = chatbotfunc(this.state.textMessages)
            }
            else{
                str = chatbotfunc2(this.state.textMessages)
            }
            if(str.length == 0){
                this.setState({textMessages : ''});
                return;
            }
            timee = setTimeout(()=>{
                const s = "users/" + User.id + "/tts";
                this.setState({anotherdisconnected:true})
                database().ref(s).update({"talking":"no"})
                database().ref(s).update({"messages":null})
                this.setState({chatbot: false})
                this.setState({randomchat: false})
                con = true
                return;
            },60000)

            let arr = str.split("#")
            for(let i = 0; i < arr.length; i++){
                let io = (Math.floor(Math.random() * 4) + 1) * 1000
                let timm = Math.floor(Math.random()*1500) + io
                setTimeout(()=>{
                    const s = "users/" + User.id + "/tts";
                    database().ref(s).update({"typing":"yes"})
                    let tim = 0
                    let mnd = arr[i]
                    if(arr[i].length > 15){
                        let q = Math.floor(Math.random() * 2) + 4
                        tim = (arr[i].length * 1000) / q
                    }
                    else{
                        let q = Math.floor(Math.random() * 2) + 2
                        tim = (arr[i].length * 1000) / q
                    }
                    if(mnd.includes("%")){
                        setTimeout(()=>{
                            const s = "users/" + User.id + "/tts";
                            this.setState({anotherdisconnected:true})
                            database().ref(s).update({"talking":"no"})
                            database().ref(s).update({"messages":null})
                            this.setState({chatbot: false})
                            this.setState({randomchat: false})
                            return;
                        },50000)
                    }
                    else{
                        let rt = mnd
                        rt = rt.replace(/penis/gi,"pen!s")
                        rt = rt.replace(/cock/gi,"c0ck")
                        rt = rt.replace(/dick/gi,"d!ck")
                        rt = rt.replace(/ass/gi,"a$s")
                        rt = rt.replace(/vagina/gi,"v@g!na")
                        rt = rt.replace(/boob/gi,"b00b")
                        rt = rt.replace(/fuck/gi,"fuc<")
                        rt = rt.replace(/clint/gi,"cl!nt")
                        rt = rt.replace(/pussy/gi,"pu$$y")
                        rt = rt.replace(/dildo/gi,"d!ldo")
                        rt = rt.replace(/porn/gi,"p0rn")
                        rt = rt.replace(/blowjob/gi,"bl0wj0b")
                        rt = rt.replace(/masterbat/gi,"ma$terbate")

                        mnd = rt
                    if(arr[i].charAt(arr[i].length-1) == "~" || arr[i].charAt(0) == "~"){
                        mnd = arr[i].split("~").join("")
                    }
                    setTimeout(()=>{
                        if(mnd.includes("exit")){
                            const s = "users/" + User.id + "/tts";
                            this.setState({anotherdisconnected:true})
                            database().ref(s).update({"talking":"no"})
                            database().ref(s).update({"messages":null})
                            this.setState({chatbot: false})
                            this.setState({randomchat: false})
                            return;
                        }
                        let v5 = User.id + "/tts/messages"
                        let msgId = database().ref("users").child(v5).push().key;
                        let updates = {};
                        let message = {
                            message: mnd,
                            time: database.ServerValue.TIMESTAMP,
                            from: "#####"
                        }
                        let b1 = 'users/' + User.id + '/tts/messages';
                        updates[msgId] = message;
                        database().ref(b1).update(updates);
                        database().ref(s).update({"typing":"no"})
    
                    },tim)
                }
                },timm)   
            }
        }
        this.setState({textMessages : ''});
    }
    thischat = async () =>{
        
        let ar = await AsyncStorage.getItem('array');
        console.log(ar)
        if (ar !== null) {
            ar = JSON.parse(ar)
        }
        if(ar == null){
            let ran = Math.floor(Math.random()*4) + 3
            ar = ["false","true","false","false","false","false","false","false","false","false","false","false","false"]
            ar[ran] = "true"
            await AsyncStorage.setItem('array',JSON.stringify(ar));
        }
        if(ar.length == 0){
            let ran = Math.floor(Math.random()*10)
            ar = ["false","false","false","false","false","false","false","false","false","false","false","false","false","false","false","false"]
            ar[ran] = "true"
            await AsyncStorage.setItem('array',JSON.stringify(ar));
        }
        let c = ar.shift()
        await AsyncStorage.setItem('array',JSON.stringify(ar));
        
        if(!this.state.chitchat){
        c = "false";
        }
        if(c == "true")
        ttt = true
        else    
        ttt = false;
        
    }
    notWait = () => {
        setTimeout(()=> {
            if(this.state.waiting){
                if(this.state.gender === "m"){
                let v1 = "strangerchat/strangers"
                let updates = {}
                updates[this.state.pushid] = null
                let dbref = database().ref(v1).update(updates)
                }
                else
                {
                    let v1 = "strangerchat/strangersfemale"
                let updates = {}
                updates[this.state.pushid] = null
                let dbref = database().ref(v1).update(updates)
                }
                let q = "users/" + User.id + "/tts";
                let u = User.id
                this.setState({randomchat: true})
                database().ref(q).update({"device": u})
                database().ref(q).update({"talking": "yes"})    
            }
        }, 7000)
    }
    notWaitFemale = () => {
        
        // // let ti = setTimeout(()=> {
        //     let k
        //     if(this.state.waiting){
        //         let v1 = "strangerchat/strangersfemale"
        //         let updates = {}
        //         updates[this.state.pushid] = null
        //         let dbref = database().ref(v1).update(updates)
        //         k = database().ref("strangerchat/strangers").push().key;
        //         this.setState({pushid : k})
        //         let updatess = {}
        //         updatess[k] = User.id;
        //         database().ref("strangerchat/strangers").update(updatess)  
        //     }
        //     //clearTimeout(ti)   
        // // }, 4000)
        
        let ti2 = setTimeout(()=> {
            if(this.state.waiting){
                
                let v1 = "strangerchat/strangers"
                let updates4 = {}
                updates4[k] = null
                console.log(updates4+"     0007656uyghjbjuky")
                database().ref(v1).update(updates4)
                let q = "users/" + User.id + "/tts";
                let u = User.id
                this.setState({randomchat: true})
                database().ref(q).update({"device": u})
                database().ref(q).update({"talking": "yes"})    
            }
            
        }, 8000)
        
    }
    connect = async () => {
        
        if(this.state.isConnected){
        this.setState({chatbot:false})
        this.setState({othercountry:""})
        this.setState({anotherdisconnected:false})
        this.setState({textMessages : ''});
        let qpo = "users/" + User.id + "/tts";
        database().ref(qpo).update({"typing": "no"})
            reset2()
            reset1()
        clearTimeout(timee);
        if(this.state.chatleft > 0){
            const s = "users/" + User.id + "/tts";
            database().ref(s).update({"messages":null})
            this.setState({messageList: []});
            let ch = "users/" + User.id;
            let p = this.state.chatleft - 1
            database().ref(ch).update({"chatleft": p})

            if(this.state.gender === "m"){
                this.thischat()
                
                if(ttt){
                    this.setState({waiting: true});
                    setTimeout(()=>{
                        let q = "users/" + User.id + "/tts";
                        this.setState({chatbot:true})
                        let u = User.id
                        database().ref(q).update({"device": u})
                        database().ref(q).update({"talking": "yes"})
                    }, 2000)
                    
                }
                else{
                    this.setState({waiting: true});
                    let k = database().ref("strangerchat/strangers").push().key;
                    this.setState({pushid : k})
                    let updates = {}
                    updates["strangerchat/strangers/" + k] = User.id;
                    database().ref().update(updates)
                    
                }
            }
            else{
                this.setState({waiting: true});
                    let k = database().ref("strangerchat/strangers").push().key;
                    this.setState({pushid : k})
                    let updates = {}
                    updates["strangerchat/strangers/" + k] = User.id;
                    database().ref().update(updates)
            }
        }
        else{
            let ch = "users/" + User.id;
            let p = this.state.chatleft + 15
            database().ref(ch).update({"chatleft": p})
            Alert.alert('Congratulations !!', 'You got free Chats this time')
        }
    }
    else {
        Alert.alert('No internet', 'Please check your internet connection')
    }
    
    }
    
    
    renderRow = ({item}) => {
        if(!this.state.randomchat && !this.state.chatbot){
            
            // if(this.state.person.id === User.id){
            //     console.log(this.state.person.id + "id")
            //     //this.setState({connected:false})
            //     const s = "users/" + User.id + "/tts";
            //     database().ref(s).update({"talking":"no"})
            //     database().ref(s).update({"messages":null})
            // }
        }
        return(
        
            <View style = {{
            flex : 1,
            //padding:2,
            alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
            marginBottom: 5}}>
            <View>
                    {item.from !== User.id && <Text style = {{fontSize: 10}}>{this.state.person.name}</Text>}
            </View>
            <View style = {{
                flexDirection: 'row',
                
                alignItems: 'center',
                justifyContent: 'center',
                flex : 1,
                //padding:2,
                alignSelf: item.from === User.id ? 'flex-end' : 'flex-start',
                marginBottom: 5}}>
                    
                <View>
                
                    <Avatar.Image source={
                        this.state.person.avatar}
                    size={item.from === User.id ? 0: 40}
                    
                    />
                    
                </View>
               
            <View style = {{
                maxWidth:'60%',
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

    addchatroom = () => {
        
        let t = "users/" + User.id + "/chatrooms/" + this.state.person.id;
        database().ref(t).update({
            avatar : this.state.a,
            name: this.state.person.name,
            acceptthis: "yes",
            acceptother: "no",
            seen: true,
            updated: "yes",
            typing: "no",
        }) 
        if(!this.state.randomchat && !this.state.chatbot){
            
            let t1 = "users/" + this.state.person.id + "/chatrooms/" + User.id;
            database().ref(t1).update({
            avatar : User.avatar,
            name: User.name,
            acceptthis: "no",
            acceptother: "yes",
            seen: true,
            updated: "yes",
            typing: "no",
        }) 
        }
    }

    ope = () =>{
        this.props.navigation.openDrawer();
    }
    showModal = () => {
        this.setState({modal:true})
    }
    disconnect3 = () => {
        this.disconnect()
        let we = database().ref("users/"+ User.id).update({"chitchat": false})
    }
    disconnect1 = () => {
        Alert.alert("Hold on!", "Are you sure you want to disconnect the chat?",[
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {text : "YES", onPress: () => this.disconnect}
        ]);
    }


    
    render(){
        let {height} = Dimensions.get('window');
        
        if(!this.state.connected && !this.state.waiting){
        return(
            <SafeAreaView style = {{flex: 1, backgroundColor:"#ccc", paddingBottom:'40%' }}>
                <View style = {styles.header}>
                <Icon name = "menu" size={35} color="#ccc" onPress = {this.ope}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,
                    fontFamily:'DancingScript-Bold'}}>Fantasy chat</Title>
                    
                </View>
                <View style = {{margin:'10%',marginTop:'30%', padding:'1%'}} >
        {this.state.instruction == 3 && <View><Text style = {{fontSize: 20, color:'#444', 
                    fontFamily:'DancingScript-Bold'}}>Click the button below and meet people</Text></View> }
        {this.state.instruction == 2 && <View><Text style = {{fontSize: 20, color:'#444', 
                    fontFamily:'DancingScript-Bold'}}>You are completely hidden on this app</Text></View> }
        {this.state.instruction == 1 && <View><Text style = {{fontSize: 20, color:'#444', 
                    fontFamily:'DancingScript-Bold'}}>Inappropriate language is prohibted</Text></View> }
        </View>
                <FlatList></FlatList>
                <Animated.View style ={[styles.bottombar,  {bottom: this.keyboardHeight, marginBottom:0}]}>
                    <View  style = {{flex:1, alignItems: 'stretch',flexDirection: 'column',}} >

                    {/* SKYSCRAPER_120x600'
  | 'LEADERBOARD_728x90'
  | 'MEDIUM_RECTANGLE_300x250 */}

                    <BannerAd
            style={{ height:  30,width: 400}}
            adID={'132884231'}
            adsize={'LEADERBOARD_728x90'}
            //onAdFailedToLoad={() => console.log('clickhhhhhhhhh')}
          />
         

                    {/* <BannerAd style={{height: 10}} /> */}

                <TouchableOpacity style = {styles.butt} onPress = {this.connect} 
                // mode = "contained" color = "#555"
                >
                    
                <Text style = {{fontSize: 30, color:'#444', 
                    fontFamily:'DancingScript-Bold'}}>Start Chatting</Text>
                </TouchableOpacity>
               

                
                {/* <AppodealBanner
                    style = {{
                        height: 50,
                        width: '100%',
                        backgroundColor: 'hsl(0, 0%, 97%)',
                        alignContent: 'stretch',
                    }}
                    adSize = 'phone'
                    
/> */}
                {/* <BannerView
                    placementId="957272558447686_957277115113897"
                    type="standard"
                    onPress={() => console.log('click')}
                    onError={(err) => console.log('error', err)}
                /> */}
               
                {/* </Animated.View>
                <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, marginBottom:0}]}> */}
                {/* <View style = {{height:70, width:'100%'}}> */}

                {/* <MoPubBanner 
                    adUnitId={BANNERL_UNIT_ID}
                    autoRefresh={true}
                    
                />
                <BannerAd unitId = {__DEV__ ? TestIds.BANNER : 'ca-app-pub-7762031450585675/9672909188'} size = {BannerAdSize.SMART_BANNER}/> */}
                {/* </View>   */}
                </View>
                </Animated.View>
                
            </SafeAreaView>
        )
        
    }
    else if(this.state.connected && !this.state.waiting){
        return(
        <KeyboardAvoidingView behavior = "height" style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                <Icon name = "menu" size={35} color="#ccc" onPress = {this.ope}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,
                    fontFamily:'DancingScript-Bold'}}>Fantasy chat</Title>
                    <Icon name = "edit" size={30} color="#ccc" style = {{marginLeft: "18%"}} onPress = {this.showModal}/>
                </View> 
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modal}
                >
                    <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <TouchableOpacity color = "#777" onPress={() => {this.setState({modal: false})
                this.setState({modal2:true})}  }>
                        <Caption style = {{fontSize:15}}>Report the User</Caption>
                        </TouchableOpacity>
                    <TouchableOpacity color = "#777" onPress={this.addchatroom} style = {{marginVertical: 10}}>
                        <Caption style = {{fontSize:15}}>Add to Chatrooms</Caption>
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
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal2}
                >
                    <View style={{justifyContent: "center",alignItems: "center",marginTop: "100%",marginVertical:"30%"}}>
                    <View style={styles.modalView2}>
                    <Button color = {this.state.modalcolor == "1" ? "#777" : "#ddd"}style = {{margin: 2}} mode = "contained"
                    onPress={() => {this.setState({modalcolor: "1"})}}>
                        <Caption style = {{fontSize:12}}>The gender is fake</Caption>
                        </Button>
                        <Button color = {this.state.modalcolor == "2" ? "#777" : "#ddd"} style = {{margin: 2}}mode = "contained"
                        onPress={() => {this.setState({modalcolor: "2"})}}>
                        <Caption style = {{fontSize:12}}>Asks for inappropriate pictures</Caption>
                        </Button>
                        <Button color = {this.state.modalcolor == "3" ? "#777" : "#ddd"} style = {{margin: 2}} mode = "contained"
                        onPress={() => {this.setState({modalcolor: "3"})}}>
                        <Caption style = {{fontSize:12}}>User talking about sexual content</Caption>
                        </Button>
                        <View style = {{flexDirection:"row"}}>
                        <Button color = "#777" mode = "outline" style = {{marginHorizontal: 35, marginTop:2 }}
                        onPress={() => {
                            
                            this.setState({modalcolor:""})
                            this.setState({modal2:false})
                            
                        }}>
                        Cancel
                        </Button>
                        <Button disabled = {this.state.modalcolor == "" ? true : false} color = "#777" mode = "contained" style = {{marginHorizontal: 35,marginTop:2 }}
                        onPress={() => {
                            if(this.state.modalcolor == "3"){
                            this.disconnect3()
                            this.setState({modalcolor:""})
                            this.setState({modal2:false});
                            }
                            else{
                                this.disconnect()
                                this.setState({modalcolor:""})
                                this.setState({modal2:false});
                            }
                        }}>
                        Report
                        </Button>
                        </View>
                    </View>
                    </View>
                </Modal>
            
            
                {!this.state.anotherdisconnected && <>
                    <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, marginBottom:70}]}>
                    <BannerAd
            style={{ height:1,width: 400}}
            adID={'132884231'}
            adsize={'LEADERBOARD_728x90'}
            //onAdFailedToLoad={() => console.log('clickhhhhhhhhh')}
          /> 
                        {/* <MoPubBanner 
                        adUnitId={BANNERL_UNIT_ID}
                        autoRefresh={true}
                        
                    />
                <BannerAd unitId = {__DEV__ ? TestIds.BANNER : 'ca-app-pub-7762031450585675/9672909188'} size = {BannerAdSize.SMART_BANNER}/>
                */}
                </Animated.View>
                <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, marginBottom:65, marginRight:"90%"}]}>

                {this.state.othertyping && <TypingAnimation style = {{marginBottom: 5,}} dotRadius={5} dotColor="#777"
        dotMargin={10}/>}
                </Animated.View>
                

                <Animated.View style ={[styles.bottombar, {bottom: this.keyboardHeight, backgroundColor: "#ccc",}]}>
                
                <TouchableOpacity style = {{paddingBottom:10, marginLeft: 1}} onPress= {this.disconnect}>
                <Icon name = "retweet" size={35} color="#555"/>
                </TouchableOpacity>  
                <TextInput
                style = {{marginLeft:"3%", marginRight: "5%", width: "65%", borderWidth:1, borderRadius:10, height: 45}}
                value = {this.state.textMessages}
                placeholder = 'Type message...'
                onChangeText = {this.handleChange('textMessages')}
                />
                <TouchableOpacity style = {{paddingBottom:10, marginRight: 20}} onPressIn = {this.sendMessage} onPressOut = {this.sendtochatbot}>
                <Icon name = "aircraft-take-off" size={35} color="#555"/>
                </TouchableOpacity>
                </Animated.View></>}
                
                <FlatList
                    ref= {ref => this.flatList = ref}
                    onContentSizeChange = {() => this.flatList.scrollToEnd({animated : true})}
                    onLayout = {() => this.flatList.scrollToEnd({animated: true})}
                    style = {{paddingTop: 3, paddingHorizontal: 5, marginBottom:20}}
                    data = {this.state.messageList}
                    renderItem = {this.renderRow}
                    keyExtractor = {(item, index) => index.toString()}
                    ListFooterComponent = {<Animated.View style={{
                        height: this.bottomPadding}} />}
                    ListHeaderComponent = {
            
                        <View style = {{justifyContent: "center",alignItems: "center",}} >
                                    <Text>
                                    User from {this.state.othercountry}</Text></View>
                        }
                />
                <Animated.View style ={[styles.bottombar, 
                    {bottom: 0, marginBottom:0, marginRight:"0%", }]}>
                      
            {this.state.anotherdisconnected && <TouchableOpacity style = {{marginTop:'10%',marginHorizontal: '10%',
                alignItems: 'center',justifyContent: 'center', }} onPress = {() => {
                this.setState({connected:false})}}>
                    <Text style = {{fontSize: 25, color:'#444', 
                    fontFamily:'DancingScript-Bold'}}>User disconnected</Text></TouchableOpacity>}
                </Animated.View>
        </KeyboardAvoidingView>
        )
    }
    else{
        if(!this.state.production){
            this.notWait()
        }
        return(
                
                <SafeAreaView style = {{backgroundColor:"#ccc", flex: 1, paddingBottom: '40%'}}>
                <View style = {styles.header}>
                <Icon name = "menu" size={35} color="#ccc" onPress = {this.ope}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,
                    fontFamily:'DancingScript-Bold'}}>Fantasy chat</Title>
                    
                </View>
                <ActivityIndicator/>
                <View>
                <Text style = {{margin:"15%"}}>Waiting for someone to connect</Text>
                </View>
                </SafeAreaView>
                
        )
    }
}
}

 
const styles = StyleSheet.create({
  
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
    butt:{
        padding: 0,
        //backgroundColor:'#444',
        //height:80,
        marginBottom:'5%',
        marginHorizontal: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        //shadowOffset: { width: 2, height: 2 },
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
        padding:15,
        backgroundColor: "#eee",
        borderRadius: 20,
        paddingTop: 20,
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
      modalView2: {
        margin: 20,
        padding:5,
        backgroundColor: "#ddd",
        borderRadius: 20,
        paddingTop: 20,
        alignItems: "center",
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

