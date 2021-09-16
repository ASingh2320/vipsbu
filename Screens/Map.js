
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput, FlatList } from 'react-native';
import MapView from 'react-native-maps'; 
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Feather } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import buildcoor, {indoordata} from './mapdata';
/*
    This class renders the outdoor map.
    TODO: Add geolocation services, outdoor navigation
*/
const Map = (props) => {
    const [showNav, toggleNav] = useState(false); //Hook to show popup with building info
    const [long, editlong] = useState(-73.12369101313207); //map's default longitude
    const [lat, editlat] = useState( 40.91258279022605); //map's default latitude
    const [buildingname, editbname] = useState(""); //name of building that is centered
    const [indata, editin] = useState({});


    const buildings = buildcoor;
    const GOOGLE_MAPS_APIKEY = '';

    const [target, edittarget] = useState(""); //Hook that records what the user is typing in searchbar

    const [destination, editdest] = useState(""); //Hook to be used when navigation is put in
    const [searchroom, togglesr] = useState(false);
    
   const [entrances, editenter] = useState([]);

    /*
        Searches for matching building name from text submitted from the searchbar
    */
    const updatedest = () =>{
        for(let i = 0; i < buildings.length; i++){
            if(buildings[i].name == target){
                editdest(target);
                editbname(buildings[i].name); //Saves name of building
                editlat(buildings[i].entrances[0].latitude); //Sets latitude of building
                editlong(buildings[i].entrances[0].longitude); //Sets longitude of building
                editenter(buildings[i].entrances); //Sets entrances of building
                togglesr(true);//toggles popup
            }
        }
    }
    
    /*
        @param name: name of entrance that user clicked

        Changes screen to indoor screen (IndoorMap.js) and passes it the map data and name of entrance 
        that user went in through
    */
    const updateroom = (name) => {
        let floors = [];
        for(let i = 0; i < indoordata.length; i++){
            if(buildingname == indoordata[i].building){
                floors.push(indoordata[i]);
            }
        }
        props.setShowIndoor(name, floors[0], floors);
    }
    
    return (
        <View>
            <View>
                {/*This is the Map component that renders the react native map*/}
                <MapView style={styles.map} 
                region = {{
                    //default positioning of the map when it is rendered
                    latitude: lat,
                    longitude:   long,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                    {   //renders all of the entrances
                        entrances.map(x =>  
                        <Marker
                            coordinate = {{
                                latitude: x.latitude,
                                longitude: x.longitude,
                            }} 
                            onPress={() => updateroom(x.name)}
                            >
                            <FontAwesome5 name="door-open" size={24} color="black" 
                                style ={{backgroundColor: "red", borderRadius: 5,}}/>
                         </Marker>)
                    }
                    {/*Tentative code for when directions for routing are added
                    showdirect && <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        />*/} 
                </MapView>
                <View style={styles.container}> 
                    {/*Renders the searchbar where target building is going to be typed*/}
                    <Feather name="search" size={24} color="#FFFFFF" 
                    style= {{left: 20,}}/>
                    <TextInput value={target} 
                        onChangeText={edittarget} 
                        placeholder="Search for building"
                        returnKeyType="search"
                        onSubmitEditing={updatedest}
                        placeholderTextColor='#FFFFFF'
                        style={{marginHorizontal:60, color: '#FFFFFF'}}/>
                    <MaterialIcons name="gps-not-fixed" size={24} color="#FFFFFF" style= {{ right: 20,}}/>
                </View>
            </View>
             {/*Renders the popup which shows the image of the building and other information about the building*/
             searchroom &&
                <View style={styles.buildpop}> 
                <Text style={styles.poptext}>{"IMAGE"}</Text>
                <Text style= {styles.buildtext}>{destination}</Text>
                <Text style={styles.reminder}>Once you reach the building select the entrance you enter from.</Text>
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
        zIndex: 1,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#c4c4c4',
        height: 49,       
        top: 42,
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
      container2: {
        zIndex: 1,
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#c4c4c4',
        height: 49,       
        top: 105,
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        borderRadius: 1000,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      },
    inputline: {
        
    },
    buildpop:{
        position: 'absolute',
        flexDirection: "column",
        zIndex: 1,
        top: Dimensions.get('window').height - 200,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#c4c4c4',
        opacity: 0.7,
        alignItems: 'center'
        //justifyContent: 'center',
    },
    poptext:{
        fontSize: 50,
    },
    buildtext:{
        fontSize: 25
    },
    itementry:{
        fontSize: 20,
        backgroundColor: 'white',
    },
    roomsearch:{
        flexDirection: 'row',
        backgroundColor: "white",
    },
    reminder:{
        marginHorizontal: 50,
    }
  });
export default Map;
/*
const styles = StyleSheet.create({
   
  });
*/