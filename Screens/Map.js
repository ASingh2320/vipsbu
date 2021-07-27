import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, FlatList } from 'react-native';
import MapView from 'react-native-maps'; 
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const Item = ({ title }) => (
    <View style={styles.itementry}>
      <Text>{title}</Text>
    </View>
  );

const Map = (props) => {
    const [showNav, toggleNav] = useState(false);
    const [long, editlong] = useState(-73.12369101313207);
    const [lat, editlat] = useState( 40.91258279022605);

    const [buildings, editbuild] = useState([{name: "Computer Science", id:"1", latitude: 40.91270136762428, longitude: -73.1236631969925}, 
    {name: "Humanities", id: "2", latitude: 40.91339704258264, longitude: -73.12011076714444}, 
    {name: "Physics", id: "3", latitude: 40.91572199812933, longitude: -73.12651056511166} ]);

    const [searchres, editsearch] = useState([]);
    const GOOGLE_MAPS_APIKEY = 'AIzaSyCT09DTa28xAoAIxHM-j2Wc_mSGwQdpKeU';
    const [showdirect, toggledirect] = useState(false);

    const [start, editstart] = useState("");
    const [target, edittarget] = useState("");

    const [destination, editdest] = useState("");
    const [origin, editorigin] = useState("");

    const [findend, editend] = useState(false);
    const [choosetrack, editchoose] = useState(false);
    
    let floors = [{name: 'Floor 1', id: '1'}, {name: 'Floor 2', id: '2'}, {name:'Floor 3', id: '3'},
    {name: 'Floor 4', id: '4'}, {name: 'Floor 5', id: '5'},];
    let rooms = [{name: '101', id: '1'}, {name: '102', id: '2'}, {name:'103', id: '3'},
    {name: '104', id: '4'}, {name: '105', id: '5'},];

    const [showpop, togglepop] = useState(false);
    const [floorname, editfname] = useState("");
    const [searchroom, togglesr] = useState(false);

    const [roomtext, editroomtxt] = useState("");
    const [roomdest, editroomdest] = useState("");
    const toggle = () => {
        toggleNav(!showNav);
    }
    
   
    const updatedest = () =>{
        for(let i = 0; i < buildings.length; i++){
            if(buildings[i].name == target){
                editdest(target);
                //editchoose(true);
                editlat(buildings[i].latitude);
                editlong(buildings[i].longitude);
                togglepop(true);
            }
        }
    }
    const enterend = () => {
        editchoose(false);
        //editend(true);
    }
    const floorselected = async (name) => {
        togglepop(false);
        togglesr(true);
        editfname(name);
    }
    const updateroom = async () => {
        for(let i = 0; i < rooms.length; i++){
            if(roomtext == rooms[i].name){
                props.setShowIndoor();
            }
        }
        
    }
    const renderItem = ({ item }) => (
        <Button  title = {item.name} onPress={() => floorselected(item.name)}>
        </Button>
      );
    return (
        <View>
            <View>
                <View style={styles.container}>
                <Text>Search for building:</Text>
                <TextInput value={target} onChangeText={edittarget}/>
                </View>
                <Button
                title="Find Building"
                onPress={updatedest}/>
                {choosetrack && 
                <View style={styles.container}>
                    <Button
                    title="Enter Location"
                    onPress={enterend}/>
                    <Button
                    title="Use My Location"
                    />
                </View>}
                {findend &&
                <View>
                 <View style={styles.container}>
                 <Text>Enter Starting Location:</Text>
                 <TextInput value={start} onChangeText={editstart}/>
                 </View>
                 <Button
                 title="Find Building"
                 />
                 </View>}
                <FlatList
                    data={searchres}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
                <MapView style={styles.map} 
                region = {{
                    latitude: lat,
                    longitude:   long,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                    <Marker
                    coordinate = {{
                        latitude: lat,
                        longitude: long,
                    }} 
                    />
                    {showdirect && <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        />} 
                </MapView>
                </View>
            {showpop && 
                <View style={styles.buildpop}>
                    <Text style={styles.poptext}>{"IMAGE"}</Text>
                    <Text style= {styles.buildtext}>{destination}</Text>
                    <FlatList
                    data={floors}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{overflow: 'scroll'}}
                />
             </View>}
             {searchroom &&
                <View style={styles.buildpop}> 
                <Text style={styles.poptext}>{"IMAGE"}</Text>
                <Text style= {styles.buildtext}>{destination + " " + floorname}</Text>
                <View style={styles.roomsearch}>
                    <Text>Room Name:</Text>
                    <TextInput value={roomtext} onChangeText={editroomtxt}/>
                </View>
                <Button
                title="Find Room"
                onPress={updateroom}/>
             </View>}
        </View>
    );
};
const styles = StyleSheet.create({
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    container: {
        
        paddingTop: 40,
        flexDirection: 'row',
      },
    inputline: {
          
    },
    buildpop:{
        position: 'absolute',
        zIndex: 1,
        top: Dimensions.get('window').height - 200,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#c4c4c4',
        opacity: 0.7,
    },
    poptext:{
        left: '30%',
        top: '1%',
        fontSize: 50
    },
    buildtext:{
        left: '40%',
        fontSize: 25
    },
    itementry:{
        fontSize: 20,
        backgroundColor: 'white',
    },
    roomsearch:{
        flexDirection: 'row',
        backgroundColor: "white",
    }
  });
export default Map;
/*
const styles = StyleSheet.create({
   
  });
*/