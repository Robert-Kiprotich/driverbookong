// Import the functions you need from the SDKs you need
import { initializeApp,getApp} from "firebase/app";
//import 'firebase/auth';
import {initializeAuth, auth,getAuth,getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDG_nBrWEVdkThVBo1lGwEVrZV6Qr-EEco",
  authDomain: "driver-app-8f120.firebaseapp.com",
  projectId: "driver-app-8f120",
  storageBucket: "driver-app-8f120.appspot.com",
  messagingSenderId: "435779818732",
  appId: "1:435779818732:web:590f90843c1433f5e241c9",
  measurementId: "G-2X8H75HNKF"
}


const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app,getApp, getAuth };