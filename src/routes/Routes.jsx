import AuthPage from "./Auth";
import CategoriesPreview from "../components/Shop/category-preview/category-preview.component";
import Category from "../components/Shop/category/category.component";
import CheckoutPage from "./Checkout";
import HomePage from "./Home";
import Navigation from "../components/navigation/navigation.component";
import ShopPage from "./Shop";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    errorElement: <h1>Error</h1>,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "shop",
        element: <ShopPage />,
        children: [
          { index: true, element: <CategoriesPreview /> },
          { path: ":category", element: <Category /> },
        ],
      },
      { path: "auth", element: <AuthPage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
]);

export default router;
