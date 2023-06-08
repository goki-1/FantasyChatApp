import React from 'react';
import { StyleSheet, Text, View,  SafeAreaView, ScrollView } from 'react-native';

import {Title, TextInput, Button, Caption} from 'react-native-paper';

import Icon2 from 'react-native-vector-icons/Feather';
import HTML from 'react-native-render-html';

export default class Privacy extends React.Component {

    render(){
        return (
            <SafeAreaView style = {{flex: 1, backgroundColor:"#ccc"}}>
                <View style = {styles.header}>
                    <Icon2 name = "arrow-left" size={30} color="#ccc" onPress = {() =>{this.props.navigation.goBack()}}/>
                    <Title style= {{margin: 20, color: "#ccc", fontSize: 25,
                    fontFamily:'DancingScript-Bold'}}>Privacy Policy</Title>
                    
                </View>
                <View style = {styles.container}>
                    <ScrollView>
            
            </ScrollView>
            </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: '#ccc',
      //alignItems: 'center',
      //justifyContent: 'center',
      padding: 5,

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