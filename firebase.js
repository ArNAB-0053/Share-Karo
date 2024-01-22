import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBZCAlM7x0nOuMGvjGw_Ro3c-eqgTsId00",
  authDomain: "sharekaro-f7a3d.firebaseapp.com",
  projectId: "sharekaro-f7a3d",
  storageBucket: "sharekaro-f7a3d.appspot.com",
  messagingSenderId: "285855038145",
  appId: "1:285855038145:web:2e839ab78c0c222299f240"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage }