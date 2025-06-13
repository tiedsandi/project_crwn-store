import { Timestamp, addDoc, collection } from "firebase/firestore";

import { db } from "@/utils/firebase"; // pastikan db = getFirestore(app)

export const createTransaction = async ({ user, cartItems, total }) => {
  const transactionData = {
    userId: user.uid,
    userEmail: user.email,
    cartItems: cartItems.map(({ id, name, quantity, price }) => ({
      id,
      name,
      quantity,
      price,
    })),
    total,
    createdAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, "transactions"), transactionData);
  return docRef.id;
};
