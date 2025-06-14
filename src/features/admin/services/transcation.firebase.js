import { collection, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export async function getAllTransactions() {
  const transactionsRef = collection(db, "transactions");
  const snapshot = await getDocs(transactionsRef);
  const transactions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return transactions;
}
