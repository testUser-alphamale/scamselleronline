import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBfC5WGBd2DQDLEWrBMf3XNCP2PgHxbRMU",
  authDomain: "chechlatestui.firebaseapp.com",
  projectId: "chechlatestui",
  storageBucket: "gs://chechlatestui.appspot.com",
  messagingSenderId: "1043608714745",
  appId: "1:1043608714745:web:c5a5774218619f0c125128",
  measurementId: "G-X6MRV7TY1K"
 //firebase   chechlatestui
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 const auth=getAuth(app)
 const database = getDatabase(app);
const storage = getStorage(app);
 export {auth,database,storage};
