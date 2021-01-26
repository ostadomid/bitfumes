import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDrTIzc4ft8ryqZiMJTwH10T7IoPQyCUIU",
    authDomain: "authserver-react.firebaseapp.com",
    projectId: "authserver-react",
    storageBucket: "authserver-react.appspot.com",
    messagingSenderId: "622081823681",
    appId: "1:622081823681:web:0c569c75084381d7381540"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
