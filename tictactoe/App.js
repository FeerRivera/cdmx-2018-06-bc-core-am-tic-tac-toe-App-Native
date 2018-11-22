import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert, Button}  from 'react-native';
import { Constants } from 'expo';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      gameState:[
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ],
      currentPlayer: 1,
    }
  }
  componentDidMount(){
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0,0,0],
        [0,0,0],
        [0,0,0]
      ], 
      currentPlayer: 1,
    });
  }
  getWinner = () => {
    const NUM_TILES = 3;
    const arr = this.state.gameState;
    let sum;
    for (let i = 0; i< NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return 1;//-1
      }      
    }
    for (let i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum == 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }      
    }
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }   
    sum = arr[2][0] + arr[1][1] + arr[0][2];
    if (sum == 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    } 
    return 0;
  }
  ontilePress = (row, col) => {
    const value = this.state.gameState[row][col];
    if (value !== 0) {

      return;
    }
    const currentPlayer = this.state.currentPlayer;
    const arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr})

    const nextPlayer = (currentPlayer == 1) ? -1: 1;
    this.setState({currentPlayer: nextPlayer})

    const winner = this.getWinner();
    if (winner == 1) {
      Alert.alert('Gana jugador 1');
      this.initializeGame();
    } else if (winner == -1){
      Alert.alert('Gana jugador 2');
      this.initializeGame();
    }
  }
  onNewGamePress =  () => {
    this.initializeGame();
  }
  renderIcon = (row, col) =>{
    let value = this.state.gameState[row][col];
    switch(value)
    {
      case 1: return <Icon name='close' style={styles.tileX} />;
      case -1: return <Icon name='close' style={styles.tileO} />
      default:return <View />;
    }
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.ontilePress(0,0)} style={[styles.tile, { borderLeftWidth:0, borderTopWidth:0}]}>
            {this.renderIcon(0,0)}
           </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(0,1)} style={[styles.tile, {borderTopWidth:0} ]}>
            {this.renderIcon(0,1)}
           </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(0,2)} style={[styles.tile, {borderTopWidth:0, borderRightWidth:0} ]}>
            {this.renderIcon(0,2)}
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.ontilePress(1,0)} style={[styles.tile, {borderLeftWidth:0,} ]}> 
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(1,1)} style={[styles.tile, {} ]} >
            {this.renderIcon(1,1)} 
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(1,2)} style={[styles.tile, {borderRightWidth:0,} ]} >
            {this.renderIcon(1,2)} 
          </TouchableOpacity>
        </View>

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity onPress={()=>this.ontilePress(2,0)} style={[styles.tile, {borderBottomWidth:0, borderLeftWidth:0,} ]}> 
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(2,1)} style={[styles.tile, {borderBottomWidth:0,} ]}> 
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.ontilePress(2,2)} style={[styles.tile, {borderBottomWidth:0, borderRightWidth:0,} ]}> 
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={{paddingTop:50}} />
        <Button title="Nuevo Juego" onPress={this.onNewGamePress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile:{
    borderWidth:10, 
    width:100,
    height:100,
  },
  tileX:{
    color:'red',
    fontSize:60,    
  },
  tileO:{
    color:'green',
    fontSize:60,    
  }
});