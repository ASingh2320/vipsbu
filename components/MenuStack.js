import React  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert,Image, ProgressViewIOSComponent} from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather, Ionicons, AntDesign} from '@expo/vector-icons'; 

// MenuStack: returns a view that is a horizontal stack with Profile, Bug, Map, Settings, and Exit options.
// Parameters: toggleMenu -> used to close the menu.
const MenuStack = ({toggleMenu, gotoSettings, gotoMap, gotoFeed}) => {
    return (
      <View style={styles.container}>

      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="face-profile" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-bug" size={24} color="black" onPress={gotoFeed}/>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-map" size={24} color="black" onPress={gotoMap}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-settings" size={24} color="black" onPress={gotoSettings}/>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <Ionicons name="ios-close" size={24} color="black" />
      </TouchableOpacity>

      </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    button: {
      padding: 5
    }
  });
export default MenuStack;