import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import AdminLayout from "@/features/admin/layout/AdminLayout";
import AuthPage from "../features/auth/Auth";
import CategoriesPreview from "../features/shop/components/category-preview/category-preview.component";
import Category from "../features/shop/components/category/category.component";
import CheckoutPage from "../features/checkout/Checkout";
import HomePage from "../features/home/Home";
import Navigation from "../components/navigation/navigation.component";
import ProductCreatePage from "@/features/admin/pages/product/ProductCreate";
import ProductUpdatePage from "@/features/admin/pages/product/ProductUpdate";
import ProductsPage from "@/features/admin/pages/product/AdminProducts";
import RequireAdminAuth from "@/middlewares/RequireAdminAuth";
import ShopPage from "../features/shop/Shop";
import TransactionsPage from "@/features/admin/pages/AdminTranscation";
import { createBrowserRouter } from "react-router";
import { productCreateAction } from "@/features/admin/pages/actions/ProductCreate.action";
import { productUpdateAction } from "@/features/admin/pages/actions/ProductUpdate.action";
import { productUpdateLoader } from "@/features/admin/pages/loaders/ProductUpdate.loader";

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
  {
    path: "/admin",
    element: (
      <RequireAdminAuth>
        <AdminLayout />
      </RequireAdminAuth>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/create",
        element: <ProductCreatePage />,
        action: productCreateAction,
      },

      {
        path: "products/update/:id",
        element: <ProductUpdatePage />,
        loader: productUpdateLoader,
        action: productUpdateAction,
      },
      { path: "transactions", element: <TransactionsPage /> },
    ],
  },
]);

export default router;
