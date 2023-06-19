const app = require ("firebase/app");
const database = require("firebase/database");
const firebaseAuth = require("firebase/auth");
require("dotenv").config();


const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const firebase = app.initializeApp(firebaseConfig);
const realtimeDatabase = database.getDatabase(firebase);
const auth = firebaseAuth.getAuth(firebase);

module.exports = {
    realtimeDatabase,
    auth
};