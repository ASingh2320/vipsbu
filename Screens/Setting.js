import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Setting() {
    
    const [fontSize, toggleFontSize] = useState(false); 
    const [darkMode, toggleDarkMode] = useState(false);

    const setFontSize = () => {
        toggleFontSize(!fontSize)
        toggleDarkMode(false);
    }

    const setDarkMode = () => {
        toggleFontSize(false);
        toggleFeed(!darkMode);
    }

    return (
        <View>
            <Button title="Dark Mode" onPress={setDarkMode}/>
            <Button title="Font Size" onPress={setFontSize}/>
        </View>
    )
    
}
