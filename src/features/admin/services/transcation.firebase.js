import { collection, doc, getDoc, getDocs } from "firebase/firestore";

import { db } from "@/utils/firebase";

export async function getAllTransactions() {
  const transactionsRef = collection(db, "transactions");
  const snapshot = await getDocs(transactionsRef);

  const transactions = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const userIds = [...new Set(transactions.map((tx) => tx.userId))];

  const userMap = {};
  await Promise.all(
    userIds.map(async (uid) => {
      const userDoc = await getDoc(doc(db, "users", uid));
      console.log(userDoc);

      if (userDoc.exists()) {
        userMap[uid] = userDoc.data().displayName || "No Name";
      } else {
        userMap[uid] = "Unknown";
      }
    })
  );

  const transactionsWithNames = transactions.map((tx) => ({
    ...tx,
    displayName: userMap[tx.userId] || "Unknown",
  }));

  return transactionsWithNames;
}
