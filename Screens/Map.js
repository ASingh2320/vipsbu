import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const Map = (props) => {
    const [showNav, toggleNav] = useState(false);
    const toggle = () => {
        toggleNav(!showNav);
    }
    return (
        <View>
            {showNav ?
            <View
                style={{
                flexDirection: "row",
                backgroundColor: "grey",
                paddingTop: "10%",
                }}
            >
                <Button title="Login" onPress={props.setShowLogin}/>
                <Button title="UseFeed" onPress={props.setShowFeed}/>
                <Button title="Settings" onPress={props.setShowSet}/>
                <Button title="X" onPress={toggle}/>
            </View>
            :
            <View
                style={{
                flexDirection: "row",
                backgroundColor: "grey",
                paddingTop: "10%",
                }}
            >
                <Button title="+" onPress={toggle}/>
            </View>
            }
        </View>
    );
};

export default Map;