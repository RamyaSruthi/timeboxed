import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBMI8G08yLQFB2tHuS9dINW5oGt-P0ipPE",
  authDomain: "timeboxed-b250d.firebaseapp.com",
  projectId: "timeboxed-b250d",
  storageBucket: "timeboxed-b250d.firebasestorage.app",
  messagingSenderId: "1066210489913",
  appId: "1:1066210489913:web:40c94876d4a10c19607fe8",
  measurementId: "G-6QFZW1WTWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);
// Export the app as well in case you need it elsewhere
export default app;