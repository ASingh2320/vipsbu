import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './Screens/Login';
import UseFeed from './Screens/UseFeed';
import Setting from './Screens/Setting';
import Map from './Screens/Map';

export default function App() {
  const [showLogin, toggleLogin] = useState(false); 
  const [showFeed, toggleFeed]   = useState(false);
  const [showMap, toggleMap]     = useState(false);
  const [showSettings, toggleSettings] = useState(false);
  const [menu, toggleMenu] = useState(true);

  const setShowLogin = () => {
		toggleLogin(!showLogin);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
	}

  const setShowFeed = () => {
		toggleLogin(false);
    toggleFeed(!showFeed);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
	}

  const setShowMap = () => {
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(!showMap);
    toggleSettings(false);
    toggleMenu(false);
	}

  const setShowSet = () => {
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(!showSettings);
    toggleMenu(false);
	}

  return (
    <View>
    {
      menu &&
    <View>
    <Button title="Login" onPress={setShowLogin}/> 
    <Button title="UseFeed" onPress={setShowFeed}/>
    <Button title="Map" onPress={setShowMap}/>
    <Button title="Settings" onPress={setShowSet}/>
    </View>
    }
    {showLogin && <Login/>}
    {showFeed && <UseFeed/>}
    {showMap && <Map/>}
    {showSettings && <Setting/>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
