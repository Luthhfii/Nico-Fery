
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDmuYWHSi985PU_2oyiiqJJI-rX0_0MaMQ",
    authDomain: "nicofery-0412.firebaseapp.com",
    databaseURL: "https://nicofery-0412-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "nicofery-0412",
    storageBucket: "nicofery-0412.firebasestorage.app",
    messagingSenderId: "849190998237",
    appId: "1:849190998237:web:bbe5c1613cb2c182f60b34",
    measurementId: "G-0Q38HXPL81"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, push, set, onValue };
