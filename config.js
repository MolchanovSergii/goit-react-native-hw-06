// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

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

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
