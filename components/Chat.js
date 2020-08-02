import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// for Android only
import KeyboardSpacer from 'react-native-keyboard-spacer';

// Firebase
const firebase = require('firebase');
require('firebase/firestore');


export default class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      uid: '',
      loggedInText: 'Logging in...',
      user: {
        _id: '',
        name: '',
        avatar: '',
      } 
    };
    
    // Firebase config 
    if (!firebase.apps.length){
      firebase.initializeApp({
        apiKey: "AIzaSyAbzKOZQuOLrovdwfbRLgmUWMcuVLrxiWM",
        authDomain: "gochatdb.firebaseapp.com",
        databaseURL: "https://gochatdb.firebaseio.com",
        projectId: "gochatdb",
        storageBucket: "gochatdb.appspot.com",
        messagingSenderId: "990477693385",
        appId: "1:990477693385:web:1273864ae174a63744b818",
        measurementId: "G-C3J34L1VQB"
      });
    }
    this.referenceUser = null;
    // references messages document
    this.referenceMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // Firestore anonymous auth
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async(user) => {
      if (!user) {
        try { 
          await firebase.auth().signInAnonymously();
        } catch (err) {
          console.log(err);
        }
      }
      //update user state with currently active user data
      this.setState({
        uid: user.uid,
        loggedInText: this.props.route.params.name + ' has entered the chat',
        messages: [],
        user: {
          _id: user.uid,
          // name: this.props.navigation.state.params.name,     <=========== REVIEW
          avatar: 'https://placeimg.com/140/140/any',
        },
      });
      // create a reference to the active user's messges
      this.referenceUser = firebase.firestore().collection('messages').where("uid", "==", this.state.uid);
      // this.referenceUser = firebase.firestore().collection('messages').orderBy('createdAt', 'desc');     <=========== REVIEW

      // listen for collection changes for current user
      this.unsubscribeUser = this.referenceUser.onSnapshot(this.onCollectionUpdate);
    });
  }


  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeUser();
  }


  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text.toString(),
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        }
      });
    });
    this.setState({
      messages,
    });
  };


  // FirebaseDB: add message to messages collection
  addMessages() {
    const message = this.state.messages[0];
    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '', 
      createdAt: message.createdAt,
      user: message.user
    });
  }

    
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      this.addMessages();
    });
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
        <Text style={styles.loggedInText}>{this.state.loggedInText}</Text>
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
  },
  loggedInText: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#fff'
  }
})