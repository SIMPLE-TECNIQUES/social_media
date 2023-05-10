
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import {getStorage} from "firebase/storage"; 
import {getFirestore} from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyCXyJAggdftc1y1gcUu-SWlgwe-TaThP_A",
  // authDomain: "instagram-clone-6fa4d.firebaseapp.com",
  // projectId: "instagram-clone-6fa4d",
  // storageBucket: "instagram-clone-6fa4d.appspot.com",
  // messagingSenderId: "717508443850",
  // appId: "1:717508443850:web:f9eee947387c9d1f82fe33",
  
  apiKey: "AIzaSyAlAbnZHdUrTdLy9mFshXzvliZtcoh8Rqg",
  authDomain: "auth-production-db92f.firebaseapp.com",
  projectId: "auth-production-db92f",
  storageBucket: "auth-production-db92f.appspot.com",
  messagingSenderId: "4788682258",
  appId: "1:4788682258:web:5cb6e65292902dbae562cb"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage=getStorage(app);
const db=getFirestore(app);
export {db,auth,storage};
