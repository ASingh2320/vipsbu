import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps'; 

const Map = (props) => {
    const [showNav, toggleNav] = useState(false);
    const toggle = () => {
        toggleNav(!showNav);
    }
    return (
        <View>
            <View>
                <MapView style={styles.map} 
                region = {{
                    latitude: 40.904706981915076,
                    longitude:  -73.1238790709138,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}/>
            </View>
            
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });
export default Map;
/*

*/