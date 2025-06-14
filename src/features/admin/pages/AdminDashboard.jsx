import Chart from "./Chart.jsx";
import classes from "./dashboard.module.css";
import { useLoaderData } from "react-router";

const AdminDashboard = () => {
  const { transactions } = useLoaderData();

  const totalRevenue = transactions.reduce((sum, tx) => sum + tx.total, 0);
  const totalTransactions = transactions.length;

  const dailyDataMap = new Map();

  transactions.forEach((tx) => {
    const date = tx.createdAt?.toDate().toLocaleDateString() || "Unknown";
    dailyDataMap.set(date, (dailyDataMap.get(date) || 0) + 1);
  });

  const chartData = Array.from(dailyDataMap, ([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Admin Dashboard</h1>

      <div className={classes.summary}>
        <div className={classes.card}>
          <p>Total Revenue</p>
          <h2>${totalRevenue}</h2>
        </div>
        <div className={classes.card}>
          <p>Total Transactions</p>
          <h2>{totalTransactions}</h2>
        </div>
      </div>

      <div className={classes.chart}>
        <h2>Transactions per Day</h2>
        <Chart data={chartData} />
      </div>
    </div>
  );
};

export default AdminDashboard;
