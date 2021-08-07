import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Login from './Screens/Login';
import UseFeed from './Screens/UseFeed';
import Setting from './Screens/Setting';
import Map from './Screens/Map';
import IndoorMap from './Screens/IndoorMap';
import MenuStack from './components/MenuStack';


export default function App() {
  const [entr, setEntr] = useState("ENTR 0");

  const [showLogin, toggleLogin] = useState(false); 
  const [showFeed, toggleFeed]   = useState(false);
  const [showMap, toggleMap]     = useState(true);
  const [showSettings, toggleSettings] = useState(false);
  const [menu, toggleMenu] = useState(false);
  const [showIndoor, toggleIndoor] = useState(false);

  const setShowLogin = () => {
		toggleLogin(!showLogin);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
    toggleIndoor(false);
	}

  const setShowFeed = () => {
		toggleLogin(false);
    toggleFeed(!showFeed);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
    toggleIndoor(false);
	}

  const setShowMap = () => {
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(!showMap);
    toggleSettings(false);
    toggleMenu(false);
    toggleIndoor(false);
	}

  const setShowSet = () => {
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(!showSettings);
    toggleMenu(false);
    toggleIndoor(false);
	}
  
  const setShowIndoor = (name) => {
    setEntr(name);
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
    toggleIndoor(!showIndoor);
	}

  return (
    <View>
    {
      menu &&
    <View style= {styles.container}>
    <Button title="Login" onPress={setShowLogin}/> 
    <Button title="UseFeed" onPress={setShowFeed}/>
    <Button title="Map" onPress={setShowMap}/>
    <Button title="Settings" onPress={setShowSet}/>
    </View>
    }
    {showLogin && <Login setShowSet={setShowSet} setShowMap={setShowMap} 
    setShowFeed={setShowFeed}/>}
    {showFeed && <UseFeed setShowMap={setShowMap}/>}
    {showMap && <Map setShowLogin = {setShowLogin} setShowFeed={setShowFeed} setShowSet={setShowSet} 
    setShowIndoor = {setShowIndoor}/>}
    {showSettings && <Setting/>}
    {showIndoor && <IndoorMap entered={entr}/>}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  },
});
