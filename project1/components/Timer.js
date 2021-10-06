import React from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {vibrate} from '../utils'


const PauseButton = props => (
    <Pressable  onPress={props.action} >
      <FontAwesome name={props.mode} size={60} color="gray"/>
    </Pressable>
)


export default class Timer extends React.Component {

  counter

  constructor(){
    super()
    this.state = {
      timer: 1500,
      workMode: true,
      isPaused: false,
      workInterval: 1500,
      breakInterval: 300,
    }
  }

  componentDidMount(){
    this.counter = setInterval(this.dec, 1000)
  }

  render() {
    return (
        <View>
        <Text style={[styles.text, this.state.workMode && styles.workTime, !this.state.workMode && styles.restTime]}>
          {formatTimeMMSS(this.state.timer)}
        </Text>
          <View style={styles.buttonsContainer}>
            <Pressable onPress={this.reset} style={styles.button}>
              <FontAwesome name="repeat" size={60} color="gray" />
            </Pressable>
            <PauseButton style={styles.button} action={this.pauseOrResume} mode={this.state.isPaused ? 'play' : 'pause'}/>
          </View>
        </View>

    );
  }

  dec = () => {

    if(this.state.timer === 1) {
      this.setState(prevState => ({workMode: !prevState.workMode}))
      this.reset()
      vibrate()
      return
    }

    if(!this.state.isPaused) this.setState(prevState =>({
      timer: prevState.timer - 1
    }))
  }

  reset = () => {
    resetValue = this.state.workMode ? this.state.workInterval : this.state.breakInterval
    this.setState({
      timer: resetValue,
    })
  }

  pause = () => {
    this.setState({
      isPaused: true,
    })
  }

  resume = () => {
    this.setState({
      isPaused: false,
    })
  }

  pauseOrResume = () => {
    return this.state.isPaused ? this.resume() : this.pause()
  }

}



const styles = StyleSheet.create({
  text: {
    fontSize: 90,
    fontWeight: 'bold',
  },
  workTime: {
    color: '#505050',
  },
  restTime: {
    color: '#009000',
  },
  pausedtime: {

  },
  buttonsContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-around'
  },
  button: {
  }
});


function formatTimeMMSS(seconds){
  return new Date(seconds * 1000).toISOString().substr(14, 5);
}
