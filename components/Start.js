import React from 'react';               
import { Button, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const image = require('../assets/backgroundImage.png');


export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', color: '' };
  }

  render() {
    return (
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.title}>GoChat</Text>
        <View style={styles.container}>
          <TextInput 
            style={styles.nameInput}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder='Your Name'
          />
          <Text style={styles.colorChoiceText}>Choose Background Color:</Text>
          <View style={styles.colorChoices}>
            <TouchableOpacity
              style={[styles.color, {backgroundColor: '#090C08'}]}
              onPress={() => { this.setState({color: '#090C08'}) }} 
            />
            <TouchableOpacity
              style={[styles.color, {backgroundColor: '#474056'}]}
              onPress={() => { this.setState({color: '#474056'}) }} 
            />
            <TouchableOpacity
              style={[styles.color, {backgroundColor: '#8A95A5'}]}
              onPress={() => { this.setState({color: '#8A95A5'}) }} 
            />
            <TouchableOpacity
              style={[styles.color, {backgroundColor: '#B9C6AE54'}]}
              onPress={() => { this.setState({color: '#B9C6AE54'}) }} 
            />
          </View>
          <View style={styles.chatButton} >
            <Button 
              color='#FFFFFF'
              title='Start Chatting' 
              onPress={() => {this.props.navigation.navigate('Chat', { name: this.state.name, color: this.state.color })}} 
            />
          </View>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  chatButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#757083',
    width: '88%',
    height: '21%',
    justifyContent: 'center',
    margin: 20
  },
  color: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    alignSelf: 'flex-start'
  },
  colorChoices: {
    flex: 4,
    flexDirection: 'row'
  },  
  colorChoiceText: {
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
    alignSelf: 'flex-start',
    paddingLeft: 20,
    marginBottom: 15
  },
  container: {
    flex: 1, 
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    height: '44%',
    width: '88%'
  },
  image: {
    flex: 1,
    resizeMode: 'cover'
  },
  nameInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '90%',
    height: '20%',
    marginBottom: 30,
    marginTop: 16,
    paddingLeft: 32,    
    borderColor: 'gray',
    borderWidth: 1,
    opacity: 50,
  },
  title: {
    flex:1,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    alignSelf: 'center',
    marginTop: 100
  }
})