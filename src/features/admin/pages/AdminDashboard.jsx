import { isAfter, subDays } from "date-fns";
import { useMemo, useState } from "react";

import Chart from "./Chart.jsx";
import classes from "./dashboard.module.css";
import { useLoaderData } from "react-router";

const FILTERS = [
  { label: "1 Day", value: 1 },
  { label: "7 Days", value: 7 },
  { label: "30 Days", value: 30 },
  { label: "All", value: Infinity },
];

const AdminDashboard = () => {
  const { transactions } = useLoaderData();
  const [range, setRange] = useState(Infinity);

  const filteredTransactions = useMemo(() => {
    if (range === Infinity) return transactions;
    const fromDate = subDays(new Date(), range);
    return transactions.filter(
      (tx) => tx.createdAt?.toDate && isAfter(tx.createdAt.toDate(), fromDate)
    );
  }, [transactions, range]);

  const totalRevenue = filteredTransactions.reduce(
    (sum, tx) => sum + tx.total,
    0
  );
  const totalTransactions = filteredTransactions.length;

  const chartData = useMemo(() => {
    const map = new Map();
    filteredTransactions.forEach((tx) => {
      const date = tx.createdAt?.toDate().toLocaleDateString() || "Unknown";
      map.set(date, (map.get(date) || 0) + 1);
    });
    return Array.from(map, ([date, count]) => ({ date, count }));
  }, [filteredTransactions]);

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Admin Dashboard</h1>

      <div className={classes.filterButtons}>
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setRange(value)}
            className={range === value ? classes.activeFilter : ""}
          >
            {label}
          </button>
        ))}
      </div>

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
