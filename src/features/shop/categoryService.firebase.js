import { collection, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export async function getAllProducts() {
  const productsCol = collection(db, "products");
  const productSnapshot = await getDocs(productsCol);
  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}
