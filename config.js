import { initializeApp } from "firebase/app";
import { Auth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGEGyzDF4vqVHEOt1PvCvjdpSqP0BkaqA",
  authDomain: "react-native-my-hw.firebaseapp.com",
  databaseURL: "https://react-native-my-hw-default-rtdb.firebaseio.com",
  projectId: "react-native-my-hw",
  storageBucket: "react-native-my-hw.appspot.com",
  messagingSenderId: "982199767607",
  appId: "1:982199767607:ios:39849d509b96f563d425b2",
  measurementId: "G-XV8NJQTGEL",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const db = getFirestore(app);
export const storage = getStorage(app);
