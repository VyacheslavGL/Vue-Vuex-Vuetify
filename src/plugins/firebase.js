import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD7AQIBY5U5FHzbGkF1ZIl0VKnAOEJUKNk",
    authDomain: "googl-dogs.firebaseapp.com",
    databaseURL: "https://googl-dogs.firebaseio.com",
    projectId: "googl-dogs",
    storageBucket: "googl-dogs.appspot.com",
    messagingSenderId: "1062752095551",
    appId: "1:1062752095551:web:bd91cbccc1e78d165ed78a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const db = firebase.storage();
export const auth = firebase.auth();