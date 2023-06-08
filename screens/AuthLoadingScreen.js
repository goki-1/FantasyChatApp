import React from 'react';
import {ActivityIndicator, StatusBar, View, Alert, Text} from 'react-native';
import User from '../User';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import CarrierInfo from 'react-native-carrier-info';
// import {
//     Appodeal,
//     AppodealAdType
// } from 'react-native-appodeal';

// const adTypes = AppodealAdType.INTERSTITIAL | AppodealAdType.REWARDED_VIDEO | AppodealAdType.BANNER;
// const consent = true;

export default class AuthLoadingScreen extends React.Component{
    constructor(props){
        super(props);
       
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        
        //await AsyncStorage.clear();
        let identity = DeviceInfo.getUniqueId()
        User.id = await AsyncStorage.getItem('userid');
        //Appodeal.initialize('89e13762b6816210cd4e3d6fe97e9144212caaed926ca56b', adTypes, consent)

        if((User.id === null) || (User.id !== identity)){
            //let identity = DeviceInfo.getUniqueId()
            User.id = identity
            let db = database().ref("users")
           
            db.once("value", (value) =>{
                let c = "" + identity
                if(value.hasChild(c))
                {
                    User.gender = value.child(c).child("gender").val()
                    User.name = value.child(c).child("name").val()
                    User.avatar = value.child(c).child("avatar").val()
                    User.countrycode = value.child(c).child("countrycode").val()
                    this.props.navigation.navigate('Conditions')
                }
                else{
                    CarrierInfo.mobileCountryCode()
                    .then((result) => {
                        User.countrycode = result
                    });
                    this.props.navigation.navigate('IntroScreen')
                }
            })
            
        }
        
        else{
            User.avatar = await AsyncStorage.getItem('useravatar');
            User.name = await AsyncStorage.getItem('username');
            User.gender = await AsyncStorage.getItem('usergender');
            User.countrycode = await AsyncStorage.getItem('usercountrycode');
            const s = "users/" + User.id + "/tts";
            database().ref(s).update({"talking":"no"})
            database().ref(s).update({"messages":null})
            this.props.navigation.navigate('HomeScreen')
        }
    };
    
    render(){
        
        return(
            <View style = {{flex: 1,
                margin:0,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ccc',
                padding: 10,
                
                }}>
                {/* <ActivityIndicator/> */}
                <View>
                <Text style = {{marginVertical:30,
        color: '#000',
        fontSize: 100,
        fontFamily:'DancingScript-Bold'}}>F</Text>
                </View>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}