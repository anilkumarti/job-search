// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
 
const firebaseConfig = {
  apiKey: "AIzaSyAfv4Q9W_oP_zFVNs5oS3FWsZtpwruj6Wk",
  authDomain: "online-job-project.firebaseapp.com",
  projectId: "online-job-project",
  storageBucket: "online-job-project.firebasestorage.app",
  messagingSenderId: "794032504362",
  appId: "1:794032504362:web:0560fed1c40046f9b80d53",
  measurementId: "G-QH96L27R7Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db=getFirestore(app);
export {db};  