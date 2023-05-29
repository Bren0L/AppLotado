const app = require ("firebase/app");
const database = require("firebase/database");
const firebaseAuth = require("firebase/auth");
const dotenv = require("dotenv").config();

const firebaseConfig = {
  apiKey: "AIzaSyCAk39jqSMuPWt11qZqihOu7yw4lPccP3E",
  authDomain: "onibus-fb557.firebaseapp.com",
  databaseURL: "https://onibus-fb557-default-rtdb.firebaseio.com",
  projectId: "onibus-fb557",
  storageBucket: "onibus-fb557.appspot.com",
  messagingSenderId: "830589986262",
  appId: "1:830589986262:web:f4d4b0a25e50180f8bb077",
  measurementId: "G-N7ST7SGZM0"
};

const firebase = app.initializeApp(firebaseConfig);
const realtimeDatabase = database.getDatabase(firebase);
const auth = firebaseAuth.getAuth(firebase);

module.exports = {
    realtimeDatabase,
    auth
};