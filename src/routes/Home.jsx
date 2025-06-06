import Directory from "../components/Home/directory/Directory.component";
import { Outlet } from "react-router";

export default function Home() {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
}
