import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import User from '../User';
import database from '@react-native-firebase/database';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

const f = require("./Images");
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//import { database } from 'firebase-functions';

export function DrawerContent(props) {
    const [chat, chatt] = useState("0")
    let t = database().ref("users/"+ User.id +"/chatleft")
    t.on('value', (value) =>{
        chatt(value.val())
    })
    const [p, setp] = useState(require('../imag/3.jpg'));
    useEffect(() =>{
        let g = database().ref("users/"+ User.id + "/avatar")
        g.on('value', (value)=> {
            setp(f.default.find(function(e){

                if (e.id === (value.val())) 
                    return e
                }))

        })
    }) 
    

    return(
        <View style={{flex:1, backgroundColor:"#ccc"}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source = {  p.src
                                }
                                size = {45}
                                //style = {{width: 45, height: 45, borderRadius: 500, resizeMode: 'stretch'}}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{User.name}</Title>
                                {/* <Caption style={styles.caption}>@j_doe</Caption> */}
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>{chat}</Paragraph>
                                <Caption style={styles.caption}>   Chats left</Caption>
                            </View>
                            
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('HomeDrawer')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Avatar"
                            onPress={() => {props.navigation.navigate('AvatarScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="chat-processing" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Chatrooms"
                            onPress={() => {props.navigation.navigate('Chatrooms')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="settings-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('ProfileScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="coin" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Points"
                            onPress={() => {props.navigation.navigate('PointsScreen')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="share" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Share it"
                            onPress={() => {props.navigation.navigate('FriendScreen')}}
                        />
                        {/* <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="vote" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Vote"
                            onPress={() => {props.navigation.navigate('VoteScreen')}}
                        /> */}
                    </Drawer.Section>
                   
                        
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    
                    label="Review"
                    onPress = {() => {Linking.openURL('https://play.google.com/store/apps/details?id=com.fantasy.chat1549&hl=en')}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 20,
      marginTop: 3,
      fontFamily:'DancingScript-Bold'
    },
    caption: {
      fontSize: 17,
      lineHeight: 18,
      fontFamily:'DancingScript-Bold'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });