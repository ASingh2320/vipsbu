import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

const UseFeed = (props) => {
    const[feedtext, setFeed] = useState("More details, the better!");

    const savefeedback = () => {
        //Once we set up database, this function will save feedback to database.
        console.log(feedtext);
        setFeed("More details, the better!!!");
    }

    const options = [
        {
            id: '1',
            title: 'Outdoor Navigation'
        },
        {
            id: '2',
            title: 'Indoor Navigation'
        },
        {
            id: '3',
            title: 'Logging In'
        },
        {
            id: '4',
            title: 'Other'
        }
    ]

    return (
        <View style ={{backgroundColor: "#F0F0F0", paddingTop: "10%",}}>
            <View style ={{width: "20%"}}> 
                <Button title= "map" onPress={props.setShowMap}/>
            </View>
            <Text style = {styles.titleText}> User Feedback</Text>
            <Text style = {styles.baseText}>Please describe your issue:</Text>
            <View>
            <TextInput multiline
            numberOfLines={4} 
                value={feedtext} onChangeText={setFeed}/>
            </View>
            <View style = {{}}> 
                <Button title= "Submit" onPress={savefeedback} value={feedtext}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    baseText: {
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });
/*
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
*/

export default UseFeed;