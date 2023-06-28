
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB66HHZSPdeEq-nUraAXZWOsLJR7gg37KQ",
    authDomain: "espacio-kazu.firebaseapp.com",
    projectId: "espacio-kazu",
    storageBucket: "espacio-kazu.appspot.com",
    messagingSenderId: "555900161109",
    appId: "1:555900161109:web:fb47a6be43528de73bd8dc",
    measurementId: "G-FD7Z7XETQL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);