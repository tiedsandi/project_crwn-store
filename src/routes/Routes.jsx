import CategoriesPreview from "../components/Shop/category-preview/category-preview.component";
import Category from "../components/Shop/category/category.component";
import Home from "./Home";
import Navigation from "../components/navigation/navigation.component";
import Shop from "./Shop";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "shop",
        element: <Shop />,
        children: [
          { index: true, element: <CategoriesPreview /> },
          { path: ":category", element: <Category /> },
        ],
      },
      { path: "auth", element: <h1>auth</h1> },
      { path: "checkout", element: <h1>checkout</h1> },
    ],
  },
]);

export default router;
