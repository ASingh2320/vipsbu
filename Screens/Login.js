import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import {auth} from "./firebase";
import MenuStack from '../components/MenuStack';

const Login = (props) => {
    const[emailtext, setEmail] = useState("");
    const[pwtext, setPW] = useState("");
    const[failed, setFail] = useState(false);

    const checkLogin = () => {
        setFail(true);
        return auth.createUserWithEmailAndPassword(emailtext, pwtext);
    }
    const [showNav, toggleNav] = useState(false);
    const toggle = () => {
        toggleNav(!showNav);
    }
    const toset = () => {
        props.setShowSet();
    }
    return (
        <View style= {styles.container}>
            <Text>Login</Text>
            <View style= {styles.inputline}>
            <Text>Email:</Text>
            <TextInput value={emailtext} onChangeText={setEmail}/>
            </View>
            <View style= {styles.inputline}>
            <Text>Password:</Text>
            <TextInput value={pwtext} onChangeText={setPW}/>
            </View>
            <Button title="Submit" onPress={checkLogin}/>
            {
                failed && <Text>{emailtext}</Text>
            }
            <View>
            {showNav ?
            <View
                style={{
                flexDirection: "row",
                backgroundColor: "grey"
                }}
            >
                {/* <Button title="Login" onPress={props.setShowLogin}/>
                <Button title="UseFeed" onPress={props.setShowFeed}/>
                <Button title="Settings" onPress={props.setShowSet}/> 
                <Button title="X" onPress={toggle}/> */}
                <MenuStack toggleMenu={toggle}  gotoSettings={props.setShowSet} 
                gotoMap={props.setShowMap} gotoFeed={props.setShowFeed}/>
            </View>
            :
            <View
                style={{
                flexDirection: "row",
                backgroundColor: "grey",
                }}
            >
                <Button title="+" onPress={toggle}/>
            </View>
            }
        </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      paddingTop: 40
    },
    inputline: {
        flexDirection: 'row',
    }
  });
export default Login;