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
            <View style={{
                width: 135
                }}>
                <View style={styles.temp}>
                <MenuStack toggleMenu={toggle}  gotoSettings={props.setShowSet} 
                gotoMap={props.setShowMap} gotoFeed={props.setShowFeed} screenName={'login'}/>
                </View>
            </View>
            : 
            <View style={{
                width: 30,
                position: 'absolute',
                left: 100
                }}>
                <View style={styles.temp}>
                <Button title="+" onPress={toggle}/>
                </View>
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
    },
    temp:{
       flexDirection: "row",
       backgroundColor: "grey",  
       justifyContent: 'center',
       alignItems: 'center',
       position: 'absolute',
       bottom: -680,
       left: 250
    },

  });
export default Login;