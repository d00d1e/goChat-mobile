import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class Chat extends Component {
  constructor() {
    super();
    this.state = { name: '' };
  }

  render() {
    //set state for color/name from ChatButton
    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });
    this.props.navigation.setOptions({ backgroundColor: color });

    return (
      <View style={[styles.container, {backgroundColor: color}]}>
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