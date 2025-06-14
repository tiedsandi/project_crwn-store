import { getAllTransactions } from "../../services/transcation.firebase";

export async function transactionsLoader() {
  const transactions = await getAllTransactions();
  return { transactions };
}
