import Firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDgYzb7QqHY1VvHEGOnetz_DT7ejV2Mq_c",
  authDomain: "ionic-3e984.firebaseapp.com",
  databaseURL: "https://ionic-3e984.firebaseio.com",
  projectId: "ionic-3e984",
  storageBucket: "ionic-3e984.appspot.com",
  messagingSenderId: "199930820105"
};

export const firebase = Firebase.initializeApp(config);
