import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Setting() {
    const [showLogin, toggleLogin] = useState(false); 
    const [darkMode, toggleDarkMode] = useState(false);
    const [manageAccount, toggleManageAccount] = useState(false);
    const [userFeedback, toggleUserFeedback] = useState(false);

    const setManageAccount = () => {
        toggleLogin(false);
        toggleFeed(false);
        toggleManageAccount(!manageAccount)
    }

    const setDarkMode = () => {
        toggleLogin(false);
        toggleFeed(!darkMode);
        toggleManageAccount(false)
    }

    const setUserFeedback = () => {
        toggleLogin(false);
        toggleFeed(false);
        toggleManageAccount(false);
        toggleUserFeedback(!userFeedback);
    }

    const setShowLogin = () => {
        toggleLogin(false);
        toggleDarkMode(false);
        toggleManageAccount(false)
    }

    return (
        <View>
            <Button title="Manage Account" onPress={setManageAccount}/>
            <Button title="Dark Mode" onPress={setDarkMode}/>
            <Button title="User Feedback" onPress={setUserFeedback}/>
            <Button title="Logout" onPress={setShowLogin}/>
        </View>
    )
}
