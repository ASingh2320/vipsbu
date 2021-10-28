import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import Svg, { Circle, Rect, Path, Polyline, G, Text as Textsvg, ForeignObject } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';


const IndoorMap = (props) => {
    const [floorpaths, editflpaths] = useState([]);
    const [startfloor, editstfl] = useState(props.inmap.floor);
    const [rooms, changerooms] = useState(props.inmap.rooms);
    const [path, changepath] = useState(props.inmap.path);
    const [floornum, changefn] = useState(props.inmap.floor);
    const [floors, changefloors] = useState(props.floors);
    const [begin, editbegin] = useState(props.entered);
    const [dest, editdest] = useState("");
    const [dropdown, editdrop] = useState(false);
    const [entrs, editentr] = useState([]);
    const boxsize = 50;
    
    /* 
        @param path: array that represents a path that will be rendered

        This is a helper function the pathfind function that checks if a path found goes through any rooms except 
        for the first and last element in the path array
    */
    const validpath = (path) => {
        for(let i = 1; i < path.length - 1; i++){
            for(let j = 0; j < rooms.length; j++){
                if(path[i][0] == rooms[j][0] && path[i][1] == rooms[j][1]){
                    return false;
                }
            }
        }
        return true;
    }

    const multilevelsearch = () => {
        for(let i = 0; i < floors.length; i++){
            for(let j = 0; j < floors[i].rooms.length; j++){
                if(floors[i].rooms[j][2] == dest){
                    return floors[i];
                }
            }
        }
        return null;
    }
    
    /*
        This function creates the adjacency list that the path finding function uses

        TODO: Make this function follow DRY principle
              When backend code is added, put this in a useEffect
    */
    const makeflooradjlst = (floorpath, floorrooms) => {
        let graph = [];// variable that holds rooms and path nodes

        //Put path nodes and room nodes in graph
        floorpath.forEach(x => graph.push(x));
        floorrooms.forEach(x => graph.push(x));

        let adjlst = [];// Initialize adjacency list
        for(let i = 0; i < graph.length; i++){
            adjlst.push([graph[i]]);//push a node from the graph to start a new row 

            //look right
            let findx = graph[i][0] + boxsize;
            let findy = graph[i][1] + 0;
            let found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)//If an adjacent node is found push it into the row
            }
            /*look bottomright
            findx = graph[i][0] + boxsize;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }*/
            //look bottom
            findx = graph[i][0] + 0;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            /*look bottomleft
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }*/
            //look left
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] - 0;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            /*//look topleft
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }*/
            //look top
            findx = graph[i][0] - 0;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            /*//look topright
            findx = graph[i][0] + boxsize;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }*/
        }
        let printstmt = "Adjacency list created\n";
        
        for(let i = 0; i < adjlst.length; i++){
            for(let j = 0; j < adjlst[i].length; j++){
                printstmt= printstmt + adjlst[i][j] + " ";
            }
            printstmt = printstmt + "\n";
        }
        printstmt= printstmt + "end\n";
        return adjlst;    
    }
    //Helper function to see if the path loops at any point
    const nocycle = (path) =>{
        let lastoccur = [];
        for(let i = 0; i < path.length; i++){
            lastoccur[path[i]] = i;
        }
        //console.log("lolllllll\n");
        //console.log(lastoccur);
        for(let i = 0; i < path.length; i++){
            if(lastoccur[path[i]] != i)
                return false;
        }
        return true;
    }
    /*
        @param start: array that represents the node where the path starts
        @param target: array that represents the node where the path ends
        @param flooradjacencylist: adjacency list of the floor on which pathfinding is done

        @return String value that represents the path that will be rendered

        Breadth first pathfinding algorithm to generate a path between rooms, entrances, etc.
    */
    const floorpathfind = (start, target, flooradjacencylist) =>{
        let queue = []; //Initalize queue which keeps track of the paths generated
        let path = [start]; //Initialize a path with just the starting node
        queue.push(path); //Push the path with just the starting node into the queue
      
        while(queue.length != 0){
          path = queue.shift(); //Take out the first path in the queue

          //If the path ends with the target node and is valid path (only goes through path nodes), return that path
          if(path[path.length-1][0] == target[0] && path[path.length-1][1] == target[1] && validpath(path)){
            let result = "";
            for(let i = 0; i < path.length; i++){
                if(i == 0){
                    result = result + "M" + (path[i][0] + boxsize/2) + " " + (path[i][1] + boxsize/2) + " ";
                }
                else{
                    result = result + "L" + (path[i][0] + boxsize/2) + " " + (path[i][1] + boxsize/2) + " ";
                }
                
            }
            return result;
          }
          let adjnodes = [];//Initialize an array to store all of the adjacent nodes
          for(let i = 0; i < flooradjacencylist.length; i++){
            if(path[path.length-1][0] == flooradjacencylist[i][0][0] && path[path.length-1][1] == flooradjacencylist[i][0][1]){
              //Once the last node in the path is found in adjacency list push all adjacenct nodes into adjnodes 
              flooradjacencylist[i].forEach(x => adjnodes.push(x));
              adjnodes.shift();//Takes out the first node which is the last node of the path, so adjnodes only contains adjacent nodes
            }
          }
          //Loop through each of the adjnodes
          for(let i = 0; i < adjnodes.length; i++){
            let checked = false;
            //Loop though the path to see if the node is already in the path
            for(let j = 0; j < path.length; j++){
              if(path[j][0] == adjnodes[i][0] && path[j][1] == adjnodes[i][1]){
                checked = true;
              }
            }
            //If the node is not already in the path then we want to create a new path with tha node
            if(checked == false){
              let newpath = [];//Initialize newpath
              //Create a new path with the new adjacent node
              path.forEach(x => newpath.push(x));
              newpath.push(adjnodes[i]);
              if(nocycle(newpath))
                queue.push(newpath);//Push the new path into the queue to be checked
            }
      
          }
        }
    }

    const diagonalcalc = (a, b, c, d) =>{
        let x = (a - c) * (a - c);
        let y = (b - d) * (b - d);
        let z = Math.sqrt(x + y);
        return z;
    }
    /*
        This function gets the string to generate the path and uses its hook so it can be rendered.
        TODO: ADD proximity stair/ELevator search
    */
    const getBuildingRoute = () => {
        let secondfloor = multilevelsearch();
        if(secondfloor.floor == startfloor){
            let startone = [];
            for(let i = 0; i < secondfloor.rooms.length; i++){
                if(secondfloor.rooms[i][2] == begin){
                    startone = secondfloor.rooms[i];
                }
            }
            let secondone = [];
            for(let i = 0; i < secondfloor.rooms.length; i++){
                if(secondfloor.rooms[i][2] == dest){
                    secondone = secondfloor.rooms[i];
                }
            }
            let adjlst = makeflooradjlst(secondfloor.path, secondfloor.rooms);
            let flpath = floorpathfind(startone, secondone, adjlst);
            let floorpaths = [];
            floorpaths[secondfloor.floor] = flpath;
            editflpaths(floorpaths);
            return;
        }
        let floorchangemech = [];
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i][2].includes("ELE") || rooms[i][2].includes("STR")){
                floorchangemech.push(rooms[i]);
            }
        }
        let start = [];
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i][2] == begin){
                start = rooms[i];
            }
        }
        let distance = diagonalcalc(start[0], start[1], floorchangemech[0][0], floorchangemech[0][1]);
        let floorchange = floorchangemech[0];
        for(let i = 0; i < floorchangemech.length; i++){
            if(diagonalcalc(start[0], start[1], floorchangemech[i][0], floorchangemech[i][1]) < distance){
                floorchange = floorchangemech[i];
            }
        }
        
        let currentadjlst = makeflooradjlst(path, rooms);
        let currentflpath = floorpathfind(start, floorchange, currentadjlst);
        let floorpaths = [];
        floorpaths[floornum] = currentflpath;

        let secondstart = [];
        for(let i = 0; i < secondfloor.rooms.length; i++){
            if(secondfloor.rooms[i][2] == floorchange[2]){
                secondstart = secondfloor.rooms[i];
            }
        }

        let secondend = [];
        for(let i = 0; i < secondfloor.rooms.length; i++){
            if(secondfloor.rooms[i][2] == dest){
                secondend = secondfloor.rooms[i];
            }
        }
        
        let secondadjlst = makeflooradjlst(secondfloor.path, secondfloor.rooms);
        let secondpath = floorpathfind(secondstart, secondend, secondadjlst);
        floorpaths[secondfloor.floor] = secondpath;
        editflpaths(floorpaths);
    }
    

    const changestart = () => {
        console.log("toggle");
        let entrances = [];
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i][2].includes("ENTR")){
                entrances.push(rooms[i][2]);
            }
        }
        editentr(entrances);
        //editdrop(true);
        console.log(entrances);
    }
    const changeenter = (name) => {
        console.log(name);
        //editbegin()
    }

    const goupfloor = () => {
        let atfloor = 0;
        for(let i = 0; i < floors.length; i++){
            atfloor = i;
            if(floors[i].floor == floornum){
                break;
            }
        }
        changepath(floors[atfloor + 1].path);
        changefn(floors[atfloor + 1].floor);
        changerooms(floors[atfloor+1].rooms);
    }
    const godownfloor = () => {
        let atfloor = 0;
        for(let i = 0; i < floors.length; i++){
            atfloor = i;
            if(floors[i].floor == floornum){
                break;
            }
        }
        changepath(floors[atfloor-1].path);
        changefn(floors[atfloor - 1].floor);
        changerooms(floors[atfloor-1].rooms);
    }
    return (
        <View style={styles.container}>
             {/*Renders the bottom search bar which states the room the person needs to go to*/}
             <View style={styles.searchbox2}>
                <Text style={{marginLeft: 80}}>Start: </Text>
                <TextInput style={{marginLeft: 65}} 
                value={begin}
                returnKeyType="search"
                placeholderTextColor='#FFFFFF'
                onChangeText={editbegin}
                onSubmitEditing={getBuildingRoute}
                //onBlur={getBuildingRoute}
                />
             </View>
            {/*
            <View style={styles.searchbox}>
                <Text style={{top: 15, left: 120}}>Start: </Text>
             </View>
             
                    dropdown ? 
                    <View style={styles.drop2}>
                        {
                    entrs.map(x => 
                        <TouchableOpacity onPress={() => changeenter(x)}>
                        <View style={{backgroundColor: "red", 
                        width: 150, 
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#c0c0c0',
                        height: 49,
                        }}>
                            
                            <Text>{x}</Text>
                        </View>
                        </TouchableOpacity>)
                    }
                    </View>
                    
                    :
                    //Renders the top search bar which states the entrance that person came in through
                    <View style={styles.drop}>
                    <Text style={{marginLeft: 60, marginRight: 10}}>{begin}</Text>
                    <TouchableOpacity onPress={changestart}>
                        <AntDesign name="downcircle" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                */}
                {/*Renders the bottom search bar which states the room the person needs to go to*/}
             <View style={styles.searchbox2}>
                <Text style={{marginLeft: 80}}>Destination: </Text>
                <TextInput style={{marginLeft: 25}} placeholder="Enter Room Here"
                returnKeyType="search"
                placeholderTextColor='#FFFFFF'
                onChangeText={editdest}
                onSubmitEditing={getBuildingRoute}
                //onBlur={getBuildingRoute}
                />
             </View>
            {//Renders the indoor map based on the data that was saved
            <ScrollView directionalLockEnabled={false} horizontal={true}>
            <ScrollView vertical={true}>
            <Svg height="500" width="700">
                {rooms.map(room => <G>
                    <Rect x={room[0] + ""} y={room[1] + ""} width="45" height="45" fill="#FF3333" />
                    <Textsvg x={(room[0]) + ""} y={(room[1] + 35) + ""} 
                    fontSize="13" text-anchor="middle" fontWeight="bold" fill="black">{room[2]}</Textsvg>
                </G>)}
                {floorpaths[floornum] && <Path d={floorpaths[floornum]} stroke="green" strokeWidth="6" fill="none" />} 
                
            </Svg>
            </ScrollView>
            </ScrollView>  
                }
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={{fontSize: 30}}>Floor {floornum}</Text>
                <TouchableOpacity onPress={goupfloor}>
                    <AntDesign name="caretup" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity onPress={godownfloor}>
                    <AntDesign name="caretdown" size={40} color="black" />
                </TouchableOpacity> 
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
    },
    container: { 
        paddingTop: 40,
        overflow: "scroll"
      },
    searchbox: {
        flexDirection: "row",
        backgroundColor: '#c4c4c4',
        height: 49,
        borderRadius: 1000,
        //alignItems: 'center',
        //justifyContent: 'center',
        alignSelf: 'center',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        marginVertical: 10,
        zIndex: 1,
    },
    searchbox2: {
        flexDirection: "row",
        backgroundColor: '#c4c4c4',
        height: 49,
        borderRadius: 1000,
        alignItems: 'center',
        //justifyContent: 'center',
        alignSelf: 'center',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        marginVertical: 10,
    },
    drop: {
        flexDirection: 'row', 
        top: 65, 
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        left: 140, 
        zIndex: 1, 
        position: 'absolute'
    },
    drop2: {
        flexDirection: 'column', 
        top: 50, 
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        left: 210, 
        zIndex: 1, 
        position: 'absolute',
        //height: 20,
        overflow: 'scroll'
    }
  });


export default IndoorMap;
