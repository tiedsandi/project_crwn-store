import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/utils/firebase";

const productsRef = collection(db, "products");

export const getAllProducts = (callback) => {
  // const q = query(productsRef, orderBy("createdAt", "desc"));
  const q = query(productsRef, orderBy("name"));
  return onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(items);
  });
};

export const getProductById = async (id) => {
  const productDoc = doc(db, "products", id);
  const docSnap = await getDoc(productDoc);

  if (!docSnap.exists()) return null;

  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export const addProduct = async (product) => {
  await addDoc(productsRef, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const deleteProduct = async (id) => {
  const productDoc = doc(db, "products", id);
  await deleteDoc(productDoc);
};

export const updateProduct = async (id, updatedData) => {
  const productDoc = doc(db, "products", id);
  await updateDoc(productDoc, updatedData);
};
