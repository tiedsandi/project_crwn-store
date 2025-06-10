import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBZR7MVgFRbhryXhFKng56jC00DJu91uFk",
  authDomain: "online-shop-899ee.firebaseapp.com",
  projectId: "online-shop-899ee",
  storageBucket: "online-shop-899ee.appspot.com",
  messagingSenderId: "772701867049",
  appId: "1:772701867049:web:a288d09cf76c1faacda038",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
