import classes from "../admin.module.css";
import { useLoaderData } from "react-router";

const TransactionsDashboard = () => {
  const { transactions } = useLoaderData();

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Transaction Dashboard</h1>
      <table className={classes.table}>
        <thead>
          <tr className={classes.theadRow}>
            <th className={classes.th}>ID</th>
            <th className={classes.th}>User</th>
            <th className={classes.th}>Email</th>
            <th className={classes.th}>Total</th>
            <th className={classes.th}>Items</th>
            <th className={classes.th}>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td className={classes.td}>{tx.id}</td>
              <td className={classes.td}>{tx.userId}</td>
              <td className={classes.td}>{tx.userEmail}</td>
              <td className={classes.td}>${tx.total}</td>
              <td className={classes.td}>{tx.cartItems?.length} item(s)</td>
              <td className={classes.td}>
                {tx.createdAt?.toDate
                  ? tx.createdAt.toDate().toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsDashboard;
