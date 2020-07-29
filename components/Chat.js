import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// for Android only
import KeyboardSpacer from 'react-native-keyboard-spacer';


export default class Chat extends Component {
  constructor() {
    super();
    this.state = { 
      messages: [], 
      name: '',
    };
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: this.props.route.params.name + ' has entered the chat!',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Admin',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: 'This is system message',
          createdAt: new Date(),
          system: true
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: { backgroundColor: '#A3E4D7' },
          left: { backgroundColor: '#C39BD3' }
        }}
      />
    )
  }

  render() {
    //set state for color/name from chatButton
    let { name, color } = this.props.route.params;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text> Hello {name}</Text>
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* Keyboard spacer for android  */}
        {/* {Platform.OS === 'android' ? <KeyboardSpacer /> : null } */}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})