import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, off } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQel0Ia1xRsEmhpXMvp5q1kQxdEoVNyp4",
  authDomain: "weddingwishes-4c08d.firebaseapp.com",
  databaseURL: "https://weddingwishes-4c08d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "weddingwishes-4c08d",
  storageBucket: "weddingwishes-4c08d.firebasestorage.app",
  messagingSenderId: "1044014159797",
  appId: "1:1044014159797:web:70aa67651f81b6d3ea2bfc",
  measurementId: "G-X6F7R6ZX5J"
};
// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Realtime Database
const database = getDatabase(app);

export { database, ref, push, onValue, off };