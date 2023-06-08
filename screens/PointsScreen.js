import React, {PureComponent, useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-community/async-storage';
import Button from '../components/Button';
import {Title} from 'react-native-paper';
import axios from 'axios';
import stripe from 'tipsi-stripe';
import Icon from 'react-native-vector-icons/Feather';
import{ RewardSmaato, RewardSmaatoEvent,EventReward, } from 'react-native-smaato-ad';
import BannerAd from 'react-native-startapp-ads-module/BannerAd';
import Interstitial from 'react-native-startapp-ads-module/Interstitial';
  
 
// import admob, { MaxAdContentRating, BannerAdSize } from '@react-native-firebase/admob';
// import {  BannerAd, TestIds, RewardedAd, RewardedAdEventType } from '@react-native-firebase/admob';
let c = 0;
stripe.setOptions({
    publishableKey: 
    'pk_live_51GwbFNGjYeKl4xauzUwcmJXmHGOY8jtIK1cRpLBZMcjuIvEE5q30LOxQLwFKpHMi4txrJoxxkwmlydQZR1FmPymm00LNlEVSLv',
    merchantId: 'BCR2DN6TVOFLRAIN',
    androidPayMode: 'test', 
})
// 'pk_test_51GwbFNGjYeKl4xaujhbUrPpJchpFbNJl406eUO4ZE0t7eGirGvDVU6jatFeQLnR4uaCG1m3ZcZxho3O5EfKHO7BQ00CLBxzVvv'
// const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-7762031450585675/2019626355';

// const rewarded = RewardedAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true,
//   keywords: ['fashion', 'clothing'],
// });

function AppButton() {
  const [loaded, setLoaded] = useState(true);

useEffect(() => {
 
  RewardSmaatoEvent.addListener(EventReward.onAdFailedToLoad,(event) => {
    console.log(event)
  })
 
    RewardSmaato.showAd('132928062');
 
  }
  )



  // useEffect(() => {
  //   const eventListener = rewarded.onAdEvent((type, error, reward) => {
  //     if (type === RewardedAdEventType.LOADED) {
  //       setLoaded(true);
  //     }

  //     if (type === RewardedAdEventType.EARNED_REWARD) {
  //       let count = 0
  //           let t = database().ref("users/"+ User.id +"/chatleft")
  //           t.once('value', (value) =>{
  //           count = value.val()
  //           count = count + 14
  //           database().ref("users/"+ User.id).update({"chatleft":count})
  //             this.givealert();
            
            
  //           });
            
        
  //       setLoaded(false);
  //     }
      
  //   });

  //   // Start loading the rewarded ad straight away
  //   rewarded.load();

  //   // Unsubscribe from events on unmount
  //   return () => {
  //     eventListener();
  //   };
  // }, []);

  // No advert ready to show yet
  if (!loaded) {
    return (
      <TouchableOpacity style = {{borderWidth:1, borderRadius:5, backgroundColor:"#fff"}} 
      onPress = {() => {}}>
            <Text style={styles.instruction}>No ads yet, Try later
          
            </Text></TouchableOpacity>
    );
  }
  //rewarded.show(); setLoaded(false);
  return (
    <TouchableOpacity style = {{borderWidth:1, borderRadius:1, backgroundColor:"#fff"}} 
    onPress = {() => {if(loaded){ 
      Interstitial.load();
     // type = 'onReceiveAd' | 'onFailedToReceiveAd' | 'adDisplayed' | 'adNotDisplayed'| 'adHidden' | 'adClicked';
    Interstitial.addListener('onReceiveAd', () => {
      // show ad 
      Interstitial.show()
    
    }) 
      Interstitial.addListener('adClicked', () => {

        let count = 0
                  let t = database().ref("users/"+ User.id +"/chatleft")
                  t.once('value', (value) =>{
                  count = value.val()
                  count = count + 10
                  database().ref("users/"+ User.id).update({"chatleft":count})
                  Alert.alert('wonnnnnn')
      });
      setLoaded(false);
        })

      }}}>
        
            <Text style={styles.instruction}>Click here then click on ad to earn 10 Chats
          
            </Text></TouchableOpacity>
  );
}
export default class PointsScreen extends PureComponent {
    static title = 'Card Form'
  
    state = {
      loading: false,
      token: null,
      allowed: false,
      paise : false
    }
  // async UNSAFE_componentWillMount(){
  //   //const allowed = await stripe.canMakeNativePayPayments()
  //   const allowed = false;
  //    this.setState({ allowed })
  //   admob()
  //   .setRequestConfiguration({
  //     // Update all future requests suitable for parental guidance
  //     maxAdContentRating: MaxAdContentRating.PG,

  //     // Indicates that you want your content treated as child-directed for purposes of COPPA.
  //     tagForChildDirectedTreatment: true,

  //     // Indicates that you want the ad request to be handled in a
  //     // manner suitable for users under the age of consent.
  //     tagForUnderAgeOfConsent: true,
  //   })
  //   .then(() => {
  //     // Request config successfully set!
  //   });
  // }
    handleCardPayPress = async () => {
      try {
        this.setState({ loading: true, token: null })
        const token = await stripe.paymentRequestWithCardForm({
          // Only iOS support this options
          smsAutofillDisabled: true,
          requiredBillingAddressFields: 'full',
          prefilledInformation: {
            billingAddress: {
              name: 'Gunilla Haugeh',
              line1: 'Canary Place',
              line2: '3',
              city: 'Macon',
              state: 'Georgia',
              country: 'US',
              postalCode: '31217',
              email: 'ghaugeh0@printfriendly.com',
            },
          },
        })
        this.setState({ paise: false, loading: false, token })
      } catch (error) {
        this.setState({ loading: false })
      }
    }
    handleCardPayPress2 = async () => {
      try {
        this.setState({ loading: true, token: null })
        const token = await stripe.paymentRequestWithCardForm({
          // Only iOS support this options
          smsAutofillDisabled: true,
          requiredBillingAddressFields: 'full',
          prefilledInformation: {
            billingAddress: {
              name: 'Gunilla Haugeh',
              line1: 'Canary Place',
              line2: '3',
              city: 'Macon',
              state: 'Georgia',
              country: 'US',
              postalCode: '31217',
              email: 'ghaugeh0@printfriendly.com',
            },
          },
        })
        this.setState({ paise: true, loading: false, token })
      } catch (error) {
        this.setState({ loading: false })
      }
    }
    makePayment = async() =>{
        this.setState({loading:true})
        
        axios({
            method: 'POST',
            url:'https://us-central1-project-1-41542.cloudfunctions.net/completePaymentWithStripe',
            data:{
                amount: this.state.paise ? 550 : 140,
                currency: 'usd',
                token: this.state.token,
            },
        }).then(response =>{
            
            let count = 0
            let t = database().ref("users/"+ User.id +"/chatleft")
            t.once('value', (value) =>{
            count = value.val()
            let ty = 150
            if(this.state.paise){
              ty = 1400
            }
            count = count + ty
            database().ref("users/"+ User.id).update({"chatleft":count})
            if(ty == 150)
            Alert.alert('Congrats', 'You received 150 more Chats')
            else
            Alert.alert('Congrats', 'You received 1400 more Chats!!')
        })
            this.setState({loading: false});
        })
        .catch(error =>{
          this.setState({loading: false});
          Alert.alert('oops!', 'Something went wrong. Validate your card information please')
          //console.log(error);
      })
    };
    movebac = () =>{
      this.props.navigation.goBack();
  }
  // givealert = () =>{
  //   Alert.alert('wonnnnnn')

  // handleAndroidPayPress = async () => {
  //       try {
  //         this.setState({
  //           loading: true,
  //           token: null,
  //         })
  //         const token = await stripe.paymentRequestWithNativePay({
  //           total_price: '100.00',
  //           currency_code: 'USD',
  //           shipping_address_required: true,
  //           phone_number_required: true,
  //           shipping_countries: ['US', 'CA'],
  //           line_items: [{
  //             currency_code: 'USD',
  //             description: 'Whisky',
  //             total_price: '50.00',
  //             unit_price: '50.00',
  //             quantity: '1',
  //           }, {
  //             currency_code: 'USD',
  //             description: 'Tipsi',
  //             total_price: '20.00',
  //             unit_price: '20.00',
  //             quantity: '1',
  //           }],
  //         })
  //         this.setState({ loading: false, token })
  //       } catch (error) {
  //         this.setState({ loading: false })
  //       }
  //     }
    render() {
      const { loading, token } = this.state
  
      return (
        <View style={styles.container}>
          <View style = {styles.header}>
                    <Icon name = "arrow-left" size={30} color="#ccc" onPress = {this.movebac}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 30,marginLeft:30,fontFamily:'DancingScript-Bold'}}>Earn Chats</Title>
                    
                </View>
              
          <View style = {{margin:5}}>
          <Text style={{marginHorizontal:'10%', marginTop:50}}>
            No Subscription (One time payment)
          </Text>
          <View style = {{flexDirection: 'row'}}>
          <Button
          text = "$1.4 / 150 Chats"
            loading={loading}
            style = {{backgroundColor: "#bbb"}}
            onPress={this.handleCardPayPress}
          />
          <Button
          text = "$5.5 / 1400 Chats"
            loading={loading}
            style = {{backgroundColor: "#bbb", marginLeft: '1%'}}
            onPress={this.handleCardPayPress2}
          />
          </View>
          <View
            style={styles.token}
            >
            {token && (
                <>
              {}
              <Button 
              text = "Pay"
              style = {{backgroundColor: "#666"}}
              loading = {loading}
              onPress = {this.makePayment}/>
              </>
            )}
          </View>
          </View>
          <View>
          <View>
          <View style = {{margin:15,marginTop:50,}}>
          <AppButton/>
            </View>
        </View>
        {/* <View style = {{margin:15}}>
          <View style = {{borderWidth:1, borderRadius:5,backgroundColor:"#bbbb"}}>
            <Text style={styles.instruction}>Go to share it screen and Share this app with friends and earn 40 Chats
        </Text></View></View> */}
        </View>
        {/* ca-app-pub-7762031450585675/9672909188 */}
        <View style = {{alignContent:'center', marginTop:90}}>
        
   
   
        <BannerAd
            style={{ height: 250,width: 400}}
            adID={'132884232'}
            adsize={'XX_LARGE_320x50'}
          />

        {/* <BannerAd unitId = {__DEV__ ? TestIds.BANNER : 'ca-app-pub-7762031450585675/9672909188'} size = {BannerAdSize.SMART_BANNER}/> */}
        </View>
    </View>
      )
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      //justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor:'#ccc',
    padding:0
    },
    header: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instruction: {
      textAlign: 'center',
      color: '#333333',
      margin: 10,

    },
    token: {
      height: 10,
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
  })
  