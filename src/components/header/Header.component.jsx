import { Outlet } from "react-router";

export default function Header() {
  return (
    <>
      <h1>Header</h1>
      <Outlet />
    </>
  );
}
