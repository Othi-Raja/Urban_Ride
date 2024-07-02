// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDYhC3EUInXw9uJKzRrdl1gxE1mFwVz5j8",
  authDomain: "urbanrider-5870e.firebaseapp.com",
  databaseURL: "https://urbanrider-5870e-default-rtdb.firebaseio.com",
  projectId: "urbanrider-5870e",
  storageBucket: "urbanrider-5870e.appspot.com",
  messagingSenderId: "453678174047",
  appId: "1:453678174047:web:09d8c013338d10f81e70ea",
  measurementId: "G-8X0GTE79VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;