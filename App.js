
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import NameScreen from './screens/NameScreen';
import HomeScreen from './screens/HomeScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import Conditions from './screens/Conditions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import PointsScreen from './screens/PointsScreen';
import Chatrooms from './screens/Chatrooms';
import AvatarScreen from './screens/AvatarScreen';
import ProfileScreen from './screens/ProfileScreen';
import FriendScreen from './screens/FriendScreen';
import ChatScreen from './screens/ChatScreen';
import {DrawerContent} from './screens/DrawerContent';
import GiveScreen from './screens/GiveScreen';
import Vote from './screens/Vote';
import VoteFree from './screens/VoteFree';
import VoteImage from './screens/VoteImage';
import Terms from './screens/Terms';
import IntroScreen from './screens/IntroScreen';
import Privacy from './screens/Privacy';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
  
  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
          <Stack.Screen name="IntroScreen" component={IntroScreen} />
          <Stack.Screen name="HomeScreen" component={draw} />
          <Stack.Screen name="NameScreen" component={NameScreen} />
          <Stack.Screen name="GiveScreen" component={GiveScreen} />
          <Stack.Screen name="Conditions" component={stacc} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  
  const draw = () =>
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} initialRouteName = "HomeDrawer">
          <Drawer.Screen name="HomeDrawer" component={HomeScreen} />
          <Drawer.Screen name="PointsScreen" component={PointsScreen} />
          <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
          <Drawer.Screen name="AvatarScreen" component={AvatarScreen} />
          <Drawer.Screen name="Chatrooms" component={anotherstac} />
          <Drawer.Screen name="FriendScreen" component={FriendScreen} />
          <Drawer.Screen name="VoteScreen" component={onestac} />
    </Drawer.Navigator>

const stacc = () =>
  <Stack.Navigator initialRouteName="Condition" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Condition" component={Conditions} />
    <Stack.Screen name="Terms" component={Terms} />
    <Stack.Screen name="Privacy" component={Privacy} />
  </Stack.Navigator>

const anotherstac = () =>
  <Stack.Navigator initialRouteName="Chatroom" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Chatroom" component={Chatrooms} />
    <Stack.Screen name="ChatScreen" component={ChatScreen} />
  </Stack.Navigator>

const onestac = () =>
  <Stack.Navigator initialRouteName="Vote" screenOptions={{headerShown: false}}>
    <Stack.Screen name="Vote" component={Vote} />
    <Stack.Screen name="VoteImage" component={VoteImage} />
    <Stack.Screen name="VoteFree" component={VoteFree} />
  </Stack.Navigator>

