
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBTpuTrMf7TRbE3UZBaTdY2JC6xCjBcRJg",
  authDomain: "intern-gallery-project.firebaseapp.com",
  projectId: "intern-gallery-project",
  storageBucket: "intern-gallery-project.firebasestorage.app",
  messagingSenderId: "79081910288",
  appId: "1:79081910288:web:f3a29f424084ae66c4da95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();