import Directory from "../components/Home/directory/Directory.component";
import { Outlet } from "react-router";

export default function HomePage() {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
}
