import AuthPage from "../features/auth/pages/Auth";
import CategoriesPreview from "../features/shop/components/shop/category-preview/category-preview.component";
import Category from "../features/shop/components/shop/category/category.component";
import CheckoutPage from "../features/checkout/pages/Checkout";
import HomePage from "../features/home/pages/Home";
import Navigation from "../components/navigation/navigation.component";
import ShopPage from "../features/shop/pages/Shop";
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
