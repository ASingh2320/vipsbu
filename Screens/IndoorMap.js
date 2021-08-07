import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, Dimensions } from 'react-native';
import Svg, { Circle, Rect, Path, Polyline, Text as Textsvg, ForeignObject } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons'; 

const IndoorMap = (props) => {
    const rooms = [
        [60, 10, "ENTR 0"], 
        [10, 60, "100"], [10, 110, "101"], [10, 160, "102"], [10, 210, "103"], [10, 260, "104"],
        [10, 310, "105"], [10, 360, "106"], [10, 410, "107"], [10, 460, "108"], [10, 510, "109"],  
        [60, 560, "ENTR 1"],
        [110, 60, "110"], [110, 110, "111"], [110, 160, "112"], [110, 210, "113"],
        [110, 310, "114"], [110, 360, "115"], [110, 410, "116"], [110, 460, "117"], [110, 510, "118"],
        [160, 210, "119"], [160, 310, "120"], [210, 260, "ENTR 2"]
    ];
    const path = [
        [60, 60], [60, 110], [60, 160], [60, 210], [60, 260],
        [60, 310], [60, 360], [60, 410], [60, 460],
        [110, 260], [160, 260],
    ]
    const [printer, editprint] = useState("Printer");
    const [begin, editbegin] = useState(props.entered);
    const [dest, editdest] = useState("");
    const [adjacenylist, editlst] = useState([])
    const boxsize = 50;
    
    //TODO: Make this function follow DRY principle
    const makeadjlst = () => {
        let graph = [];
        path.forEach(x => graph.push(x));
        rooms.forEach(x => graph.push(x));
        let adjlst = [];
        for(let i = 0; i < graph.length; i++){
            adjlst.push([graph[i]]);

            //look right
            let findx = graph[i][0] + boxsize;
            let findy = graph[i][1] + 0;
            let found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottomright
            findx = graph[i][0] + boxsize;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottom
            findx = graph[i][0] + 0;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottomleft
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] + boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look left
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] - 0;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look topleft
            findx = graph[i][0] - boxsize;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look top
            findx = graph[i][0] - 0;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look topright
            findx = graph[i][0] + boxsize;
            findy = graph[i][1] - boxsize;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
        }
        let printstmt = "Adjacency list created\n";
        
        for(let i = 0; i < adjlst.length; i++){
            for(let j = 0; j < adjlst[i].length; j++){
                printstmt= printstmt + adjlst[i][j] + " ";
            }
            printstmt = printstmt + "\n";
        }
        printstmt= printstmt + "end\n";
        editlst(adjlst);
        //console.log(printstmt);
        //editprint(printstmt);    
    }
    const[route, editroute] = useState("");
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
    const pathfind = (start, target) =>{
        let queue = [];
        let path = [start];
        queue.push(path);
      
        while(queue.length != 0){
          path = queue.shift();
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
            editroute(result);
            return 0;
          }
          let adjnodes = [];
          for(let i = 0; i < adjacenylist.length; i++){
            if(path[path.length-1][0] == adjacenylist[i][0][0] && path[path.length-1][1] == adjacenylist[i][0][1]){
              //adjnodes = adjacenylist[i];
              adjacenylist[i].forEach(x => adjnodes.push(x));
              adjnodes.shift();
            }
          }
          for(let i = 0; i < adjnodes.length; i++){
            let checked = false;
            for(let j = 0; j < path.length; j++){
              if(path[j][0] == adjnodes[i][0] && path[j][1] == adjnodes[i][1]){
                checked = true;
              }
            }
            if(checked == false){
              let newpath = [];
              path.forEach(x => newpath.push(x));
              newpath.push(adjnodes[i]);
              queue.push(newpath);
            }
      
          }
          //let adjnodes = adjacenylist[0].find(checkmatch);
          //console.log(adjnodes);
        }
    }
    const getRoute = () => {
        makeadjlst();
        let start = []
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i][2] == begin){
                start = rooms[i];
            }
        }
        for(let i = 0; i < rooms.length; i++){
            if(rooms[i][2] == dest){
                target = rooms[i];
            }
        }
        //console.log(start[2] + "/" + target[2]);
        pathfind(start, target);
    }
    return (
        <View style={styles.container}>
            
            <View style={styles.searchbox}>
                <Text>Start: </Text>
                <Text style={{marginLeft: 60, marginRight: 10}}>{begin}</Text>
                <AntDesign name="downcircle" size={24} color="black" />
             </View>
             <View style={styles.searchbox2}>
                <Text style={{marginLeft: 80}}>Destination: </Text>
                <TextInput style={{marginLeft: 25}} placeholder="Enter Room Here"
                returnKeyType="search"
                placeholderTextColor='#FFFFFF'
                onChangeText={editdest}
                onSubmitEditing={getRoute}
                />
             </View>
            <ScrollView directionalLockEnabled={false} horizontal={true}>
            <ScrollView vertical={true}>
            <Svg height="900" width="900">
                
                
                {rooms.map(room => <View>
                    <Rect x={room[0] + ""} y={room[1] + ""} width="45" height="45" fill="#FF3333"/>
                    <Textsvg x={(room[0]) + ""} y={(room[1] + 35) + ""} 
                    fontSize="13" text-anchor="middle" fontWeight="bold" fill="black">{room[2]}</Textsvg>
                </View>)}
                <Path d={route} stroke="green" strokeWidth="5" fill="none" />
                
            </Svg>
            </ScrollView>
            </ScrollView>  
            
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
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
        marginVertical: 10,
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
    }
  });


export default IndoorMap;
/*
                 rooms.map(room => <Rect x={room[0] + ""} y={room[1] + ""} width="20" height="20" fill="blue">
                     <Textsvg x="12.5" y="25" text-anchor="middle" fontWeight="bold" fill="black">lol</Textsvg>
                 </Rect>)
                */
