import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/utils/firebase";
import { doc, setDoc } from "firebase/firestore";

export const syncUserToFirestore = async (user) => {
  const userRef = doc(db, "users", user.uid);

  await setDoc(
    userRef,
    {
      uid: user.uid,
      displayName: user.displayName || "No Name",
      email: user.email,
      photoURL: user.photoURL || "",
      lastLogin: new Date(),
    },
    { merge: true }
  );
};

// Signup user
export const signUpUser = async ({ email, password, displayName }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });

  await syncUserToFirestore({
    ...user,
    displayName,
  });

  return {
    uid: user.uid,
    email: user.email,
    displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
  };
};

// Signin user
export const signInUser = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await syncUserToFirestore(user);
  console.log(user);

  return user;
};

// Login with Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const { user } = await signInWithPopup(auth, provider);

  await syncUserToFirestore(user);
  console.log(user);
  return user;
};
