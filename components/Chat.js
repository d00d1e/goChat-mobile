import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Button, Image } from 'react-native';
import NetInfo from "@react-native-community/netinfo";

//Gifted Chat
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import CustomActions from './CustomActions.js'
import MapView from 'react-native-maps';

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
      isConnected: '',
      user: {
        _id: '',
        name: '',
        avatar: '',
      }, 
      image: null,
      location: null
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
    // check online/offline status
    NetInfo.fetch().then(isConnected => {
      if (isConnected) {
        // ONLINE, fetch messages from Firebase
        console.log('Online');
        this.setState({ isConnected: true });
        // Firebase anonymous authentication
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
              name: this.props.route.params.name,    
              avatar: 'https://placeimg.com/140/140/any',
            },
          });
          // create a reference to the active user's messges
          this.referenceUser = firebase.firestore().collection('messages').orderBy('createdAt', 'desc');
          // listen for collection changes for current user
          this.unsubscribeUser = this.referenceUser.onSnapshot(this.onCollectionUpdate);
        });
      } else {
        // OFFLINE- fetch messages from asyncStorage 
        console.log('Offline');
        this.setState({ isConnected: false });
        this.getMessages();
        
      }
    });
  }


  componentWillUnmount() {
    // stop listening to authentication
    this.authUnsubscribe();
    // stop listening for changes
    this.unsubscribeUser();
  }


  // disables text input bar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected == false) {
      return (
        <Text>You are offline</Text>
      )
    } else {
      return (
        <InputToolbar
        {...props}
        />
      );
    }
  }


  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text || '',
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar,
        },
        image: data.image || '',
        location: data.location || null 
      });
    });
    this.setState({
      messages,
    });
  };


  // delete stored messages during development
  async deleteMessages() {
    try {
      await AsyncStorage.removeItem('messages');
    } catch (err) {
      console.log(err.message);
    }
  }


  // save messages to asyncStorage
  async saveMessages() {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(this.state.messages));
    } catch (err) {
      console.log(err.message);
    }
  }
  

  // retrieves messages from asyncStorage 
  async getMessages() {
    let messages = '';
    try {
      // reads messages in storage
      messages = await AsyncStorage.getItem('messages') || []; 
      this.setState({ messages: JSON.parse(messages) });
    } catch (err) {
      console.log(err.message);
    }
  };


  // FirebaseDB: add message to messages collection
  addMessages() {
    const message = this.state.messages[0];

    this.referenceMessages.add({
      _id: message._id,
      text: message.text || '', 
      createdAt: message.createdAt,
      user: message.user,
      image: message.image || '',
      location: message.location || null,
    });
  }

    
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }), () => {
      // add to database
      this.addMessages();
      // add to asyncstorage
      this.saveMessages();
    });
  }


  // render custom action buttons
  renderCustomActions = (props) => {
    return <CustomActions {...props} />;
  };


  // render map view if message obj contains location data
  renderCustomView(props) {
    const { currentMessage } = props;
    
    if (currentMessage.location) {
      return (
        <MapView
          style={{width: 150, height: 100, borderRadius: 13, margin: 3}}
          region={{latitude: currentMessage.location.latitude, longitude: currentMessage.location.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
        />
      );
    }
    return null;
  }


  // render chat bubble
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
        {this.state.image && 
          <Image source={{uri: this.state.image.uri}} style={{width: 200, height: 200}} />
        }
        <GiftedChat
          renderCustomView={this.renderCustomView.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={this.state.user}
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