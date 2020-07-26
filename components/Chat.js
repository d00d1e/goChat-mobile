import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Chat extends Component {
  constructor() {
    super();
    this.state = { name: '' };
  }

  //set Nav title
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name
    };
  };

  render() {
    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ name: name });
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text>Hello, {name}!</Text>
        <Text>Chat goes here</Text>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }

})