import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAflCshehOcuxrfTkWwJ1xhD6zFAfIlifo",
  authDomain: "mymovieauthapp.firebaseapp.com",
  projectId: "mymovieauthapp",
  storageBucket: "mymovieauthapp.firebasestorage.app",
  messagingSenderId: "437092535322",
  appId: "1:437092535322:web:f7910c226611efe4bfd5a3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
