import Header from "../components/header/Header.component";
import Home from "./Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <Home /> },
      { path: "shop/*", element: <h1>shop</h1> },
      { path: "auth", element: <h1>auth</h1> },
      { path: "checkout", element: <h1>checkout</h1> },
    ],
  },
]);

export default router;
