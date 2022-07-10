// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBJyC6zvzoj3MuEWVslSUXD9dWMirACpmE",
  authDomain: "twitter-clone-238fd.firebaseapp.com",
  projectId: "twitter-clone-238fd",
  storageBucket: "twitter-clone-238fd.appspot.com",
  messagingSenderId: "469450904067",
  appId: "1:469450904067:web:91e264c4e3c0bb217bf436",
};

const App = !getApps.length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const db = getFirestore();

export default App;
export { storage, db };
