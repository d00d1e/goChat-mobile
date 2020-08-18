# goChat 💬
>Native mobile chat application developed with React Native, Expo and Google Firestore Database

## React Native
[React Native](https://reactnative.dev/docs/getting-started) is a JavaScript framework used for building native applications for iOS and Android. You will need either an iOS/Android simulator/emulator to run the app on your computer. You will use [Expo](https://expo.io/learn) to develop and test this app, [GiftedChatUI](https://github.com/FaridSafi/react-native-gifted-chat) to create the chat interface, and lastly, [Google Firebase](https://firebase.google.com/) to store sent/recieved messages. Go chat!

## Available Scripts
* `npm i`
* `npm start`
* `npm start --ios`
* `npm start --android`

## Setup
### Expo Development Tools
Sign-up for Expo: [Expo sign-up page](https://expo.io/signup)

Expo CLI
* `npm install expo-cli --global`
* `npm start`

Download [Expo Client](https://expo.io/tools) on your device 

### iOS simulator
XCode - available to download from the [App](https://apps.apple.com/us/app/xcode/id497799835?mt=12) store 
* `npm run ios`

### Android Emulator
Android Studio - available from The Official Android IDE: [Android Studio](https://developer.android.com/studio/?gclid=CjwKCAjw1ej5BRBhEiwAfHyh1GQJhX5OJkiC2ElYb8_eHWOiJikIB7CuBwiqNZe-bEnlHwouJHEBwBoCY5MQAvD_BwE&gclsrc=aw.ds)
* `npm run android`

### Firestore Database
1. Install Firestore via npm:
* `npm install --save firebase@7.9.0`
```
const firebase = require('firebase');
require('firebase/firestore');
```

2. Integrate your *own* Firebase configuration info into App.js file:
```
const firebaseConfig = {
    apiKey: "AIzaSyCYhM7ZWoVZLLUD5xzpcepyID3B5w1sfuE",
    authDomain: "test-8b82a.firebaseapp.com",
    databaseURL: "https://test-8b82a.firebaseio.com",
    projectId: "test-8b82a",
    storageBucket: "test-8b82a.appspot.com",
    messagingSenderId: "202131758796"
  }

if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
  }
 ```

### Gifted Chat
* `npm install react-native-gifted-chat --save`

Refer to [Message object](https://github.com/FaridSafi/react-native-gifted-chat#message-object) for correct format!

## Screenshots
<img src="assets/mainView.png" width="300"> | <img src="assets/chatView.png" width="300"> | <img src="assets/keyboard.png" width="300"> 
