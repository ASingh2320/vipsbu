import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect }  from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Svg, { Circle, Rect, Path, Polyline } from 'react-native-svg';

const IndoorMap = (props) => {
    const rooms = [
        [10, 310], [35, 335], [60, 335], [85, 335], [110, 335], [135, 335],
        [160, 335], [185, 335], [210, 335], [235, 335], [260, 335], [285, 335],
        [310, 335], [335, 310], [35, 285], [60, 285], [85, 285], [110, 285], [135, 285],
        [160, 285], [185, 285], [210, 285], [235, 285], [260, 285], [285, 285],
        [285, 260], [285, 235], [285, 210],
        [285, 185], [285, 160], [285, 135], [285, 110],
        [285, 85], [285, 60], [285, 35], [310, 10], 
        [335, 260], [335, 235], [335, 210],
        [335, 185], [335, 160], [335, 135], [335, 110],
        [335, 85], [335, 60], [335, 35], [335, 285], 
    ];
    const path = [
        [10, 310], [35, 310], [60, 310], [85, 310],
        [110, 310], [135, 310], [160, 310], [185, 310],
        [210, 310], [235, 310], [260, 310], [285, 310], [310, 310],
        [310, 10], [310, 35], [310, 60], [310, 85],
        [310, 110], [310, 135], [310, 160], [310, 185],
        [310, 210], [310, 235], [310, 260], [310, 285]
    ]
    const [printer, editprint] = useState("Printer");
    const [adjacenylist, editlst] = useState([])
    
    //TODO: Make this function follow DRY principle
    const printadjlst = () => {
        let graph = [];
        path.forEach(x => graph.push(x));
        rooms.forEach(x => graph.push(x));
        let adjlst = [];
        for(let i = 0; i < graph.length; i++){
            adjlst.push([graph[i]]);

            //look right
            let findx = graph[i][0] + 25;
            let findy = graph[i][1] + 0;
            let found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottomright
            findx = graph[i][0] + 25;
            findy = graph[i][1] + 25;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottom
            findx = graph[i][0] + 0;
            findy = graph[i][1] + 25;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look bottomleft
            findx = graph[i][0] - 25;
            findy = graph[i][1] + 25;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look left
            findx = graph[i][0] - 25;
            findy = graph[i][1] - 0;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look topleft
            findx = graph[i][0] - 25;
            findy = graph[i][1] - 25;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look top
            findx = graph[i][0] - 0;
            findy = graph[i][1] - 25;
            found = graph.find(x => (x[0] == findx) && (x[1] == findy));
            if(found){
                adjlst[i].push(found)
            }
            //look topright
            findx = graph[i][0] + 25;
            findy = graph[i][1] - 25;
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
  
        editlst(adjlst);
        //editprint(printstmt);    
    }
    const[route, editroute] = useState("");
    const pathfind = () =>{
        let start = [10, 310];
        let target = [210, 285];
        let queue = [];
        let path = [start];
        queue.push(path);
      
        while(queue.length != 0){
          path = queue.shift();
          if(path[path.length-1][0] == target[0] && path[path.length-1][1] == target[1]){
            let result = "";
            for(let i = 0; i < path.length; i++){
                if(i == 0){
                    result = result + "M" + path[i][0] + " " + path[i][1] + " ";
                }
                else{
                    result = result + "L" + path[i][0] + " " + path[i][1] + " ";
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
    return (
        <View style={styles.container}>
            <Text>{rooms.length}</Text>
            <Button title="print" onPress={printadjlst}></Button>
            <Button title="search" onPress={pathfind}></Button>
            <Text>{route}</Text>
            <Svg height="100%" width="100%">
                
                {
                 rooms.map(room => <Rect x={room[0] + ""} y={room[1] + ""} width="20" height="20" fill="blue"></Rect>)
                }
                
                <Path d={route} stroke="green" strokeWidth="5" fill="none" />
                
            </Svg>
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
  });


export default IndoorMap;
