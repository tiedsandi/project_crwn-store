import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "@/utils/firebase";

export const getProductsByCategory = async (categoryId) => {
  const q = query(
    collection(db, "products"),
    where("categoryId", "==", categoryId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
