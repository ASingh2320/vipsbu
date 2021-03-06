import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Picker, TextInput } from 'react-native';

const UseFeed = (props) => {
    const[feedtext, setFeed] = useState("");

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
    ];

    return (
        <View style ={{backgroundColor: "#F0F0F0", paddingTop: "10%",}}>
            <View style ={{width: "20%"}}> 
                <Button title= "map" onPress={props.setShowMap}/>
            </View>
            <Text style = {styles.titleText}> User Feedback</Text>
            <View>
            {/* FlatList goes here*/}
            <View>
                <Text style = {styles.baseText}>Select your issue:</Text>
                <Picker placeholder = "Select an option">
                    <Picker.Item label = "Outdoor Navigation" value="Outdoor Navigation"/>
                    <Picker.Item label="Indoor Navigation" value ="Indoor Navigation"/>
                    <Picker.Item label="Logging In" value ="Logging In"/>
                    <Picker.Item label="Other" value ="Other"/>
                </Picker>
            </View>    
            <Text style = {styles.baseText}>Please describe your issue:</Text>
            <TextInput style={styles.textBox} multiline numberOfLines={10} //Update value for TextInput
                value={feedtext} onChangeText={setFeed} placeholder="Enter text here"/>
            </View>
            <View style = {{}}> 
                <Button title= "Submit" onPress={savefeedback} value={feedtext}/>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    baseText: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: 21
    },
    titleText: {
      textAlign: 'center',
      fontSize: 30,
      fontWeight: "bold",
      paddingBottom: 10
    },
    textBox: {
        height: 175,
        borderWidth: 1.5,
        borderRadius: 10,
        borderColor: 'black',
        padding: 10,
        paddingTop: 10,
        margin: 10,
        marginLeft: 20,
        width: 350
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