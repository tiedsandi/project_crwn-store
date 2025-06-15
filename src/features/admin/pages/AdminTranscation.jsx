import * as XLSX from "xlsx";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format, isAfter, subDays } from "date-fns";
import { useMemo, useState } from "react";

import Button from "@/components/UI/button/button.component";
import classes from "../admin.module.css";
import { matchSorter } from "match-sorter";
import { saveAs } from "file-saver";
import { useLoaderData } from "react-router";

const TransactionsDashboard = () => {
  const { transactions } = useLoaderData();
  const [globalFilter, setGlobalFilter] = useState("");
  const [dayRange, setDayRange] = useState("all");

  // 🔎 Filtering by date range
  const filteredData = useMemo(() => {
    if (dayRange === "all") return transactions;
    const days = parseInt(dayRange, 10);
    const fromDate = subDays(new Date(), days);

    return transactions.filter((tx) =>
      tx.createdAt?.toDate ? isAfter(tx.createdAt.toDate(), fromDate) : false
    );
  }, [transactions, dayRange]);

  // 📋 Define columns
  const columns = useMemo(
    () => [
      { header: "ID", accessorKey: "id" },
      { header: "User", accessorKey: "displayName" },
      { header: "Email", accessorKey: "userEmail" },
      { header: "Total", accessorKey: "total" },
      {
        header: "Items",
        accessorFn: (row) => `${row.cartItems?.length || 0} item(s)`,
      },
      {
        header: "Date",
        accessorFn: (row) =>
          row.createdAt?.toDate
            ? format(row.createdAt.toDate(), "dd MMM yyyy HH:mm")
            : "N/A",
      },
    ],
    []
  );

  // 🧠 Table instance
  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      globalFilter,
    },
    globalFilterFn: (row, columnId, filterValue) =>
      matchSorter([row.getValue(columnId)], filterValue).length > 0,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  // ⬇️ Download CSV
  const handleDownloadCSV = () => {
    const exportData = table.getRowModel().rows.map((row) => {
      const rowData = {};
      row.getVisibleCells().forEach((cell) => {
        const header = cell.column.columnDef.header;
        rowData[header] = cell.getValue();
      });
      return rowData;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const csv = XLSX.utils.sheet_to_csv(worksheet);

    const now = format(new Date(), "yyyy-MM-dd_HH-mm");
    let label = "";
    if (dayRange === "1") label = "last-1-day";
    else if (dayRange === "7") label = "last-7-days";
    else if (dayRange === "30") label = "last-30-days";
    else label = "all";

    const fileName = `transactions-${label}-${now}.csv`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fileName);
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.heading}>Transaction Dashboard</h1>

      <div className={classes.controls}>
        <input
          className={classes.input}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search by email, user ID..."
        />

        <select
          className={classes.select}
          value={dayRange}
          onChange={(e) => setDayRange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="1">Last 1 Day</option>
          <option value="7">Last 7 Days</option>
          <option value="30">Last 30 Days</option>
        </select>

        <Button onClick={handleDownloadCSV} buttonType="inverted">
          {" "}
          Export CSV
        </Button>
      </div>

      <table className={classes.productTable}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classes.th}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                  {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                className={classes.td}
                colSpan={columns.length}
                style={{ textAlign: "center", padding: "1rem" }}
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className={classes.td}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsDashboard;
