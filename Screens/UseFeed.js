import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const UseFeed = (props) => {
    const[feedtext, setFeed] = useState("More details, the better!");

    const savefeedback = () => {
        //Once we set up database, this function will save feedback to database.
        console.log(feedtext);
        setFeed("More details, the better!");
    }
    return (
        <View style ={{backgroundColor: "#F0F0F0"}}>
            <View style ={{width: "10%"}}> 
                <Button title= "map" onPress={props.setShowMap}/>
            </View>
            <Text style = {{textAlign: "center", fontSize: "30px"}}> User Feedback</Text>
            <Text style = {{marginHorizontal: "5%", marginTop: "5%"}}>Please describe your issue:</Text>
            <View style ={{backgroundColor: "white", marginHorizontal: "5%", marginVertical: "2.5%"}}>
            <TextInput multiline
            numberOfLines={4} style = {{}} 
                value={feedtext} onChangeText={setFeed}/>
            </View>
            <View style = {{}}> 
                <Button title= "Submit" onPress={savefeedback} value={feedtext}/>
            </View>
        </View>
    );
};

export default UseFeed;