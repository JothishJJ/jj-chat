import { getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqaTtH2xVKIac-Vk2YeQPwXBCOGDkq96w",
  authDomain: "chat-jj.firebaseapp.com",
  projectId: "chat-jj",
  storageBucket: "chat-jj.appspot.com",
  messagingSenderId: "765173453026",
  appId: "1:765173453026:web:b4e8746426f3604c334ebb",
  measurementId: "G-FEBZRZGNFC"
};

if(getApps().length < 1)
  initializeApp(firebaseConfig);

export const auth = getAuth();
