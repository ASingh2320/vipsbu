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
  const [showMap, toggleMap]     = useState(false);
  const [showSettings, toggleSettings] = useState(false);
  const [menu, toggleMenu] = useState(true);
  const [showIndoor, toggleIndoor] = useState(false);
  const [indoormap, editimap] = useState({
    building: "",
    floor: "",
    rooms: [],
    path: [],});
  const [infloors, editifloor] = useState([]);
  const [indoorbuilding, editbuild] = useState("");
  const [indoorfloor, editfloor] = useState("");
  const [indoorooms, editroom] = useState("");
  //const [indoor]

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
  
  const setShowIndoor = (name, map, floors) => {
    setEntr(name);
    editifloor(floors);
    editimap(prevState => ({
      ...prevState,
      building: map.building,
      floor: map.floor,
      rooms: map.rooms,
      path: map.path,
    }));
    //console.log(indoormap);
		toggleLogin(false);
    toggleFeed(false);
    toggleMap(false);
    toggleSettings(false);
    toggleMenu(false);
    toggleIndoor(true);
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
    {showIndoor && <IndoorMap entered={entr} inmap={indoormap} floors={infloors} setShowIndoor={setShowIndoor} />}
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40
  },
});
