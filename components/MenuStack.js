import React  from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert,Image, ProgressViewIOSComponent} from 'react-native';
import { Entypo, MaterialCommunityIcons, Feather, Ionicons, AntDesign} from '@expo/vector-icons'; 

// MenuStack: returns a view that is a horizontal stack with Profile, Bug, Map, Settings, and Exit options.
// Parameters: toggleMenu -> used to close the menu.

const MenuStack = ({toggleMenu, gotoSettings, gotoMap, gotoFeed, screenName}) => {
    return (
      <View style={styles.container}>
    
    {/* if screen is 'login' then do not load the login icon */}
    {(screenName != 'login') && 
      <TouchableOpacity style={styles.button}>
        <MaterialCommunityIcons name="face-profile" size={24} color="black" />
      </TouchableOpacity>
    } 

    {/* if screen is 'bug' then do not load the bug icon */}
    {(screenName != 'bug') && 
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-bug" size={24} color="black" onPress={gotoFeed}/>
      </TouchableOpacity>
    }
    
    {/* if screen is 'map' then do not load the map icon */}
    {(screenName != 'map') &&
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-map" size={24} color="black" onPress={gotoMap}/>
      </TouchableOpacity>
    }

    {/* if screen is 'settings' then do not load the settings icon */}
    {(screenName != 'settings') &&
      <TouchableOpacity style={styles.button}>
        <Ionicons name="ios-settings" size={24} color="black" onPress={gotoSettings}/>
      </TouchableOpacity>
    }

      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <Ionicons name="ios-close" size={24} color="black" />
      </TouchableOpacity>

      </View>
    );
};

// styling
const styles = StyleSheet.create({
    container: {
      flexDirection: 'row'
    },
    button: {
      padding: 5
    }
  });
export default MenuStack;