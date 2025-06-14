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
import Spinner from "@/components/UI/spinner/Spinner.component";
import TransactionsDashboard from "@/features/admin/pages/AdminTranscation";
import { categoriesPreviewLoader } from "@/features/shop/categoriesPreviewLoader";
import { categoryLoader } from "@/features/shop/CategoryLoader";
import { createBrowserRouter } from "react-router";
import { productCreateAction } from "@/features/admin/pages/actions/ProductCreate.action";
import { productUpdateAction } from "@/features/admin/pages/actions/ProductUpdate.action";
import { productUpdateLoader } from "@/features/admin/pages/loaders/ProductUpdate.loader";
import { transactionsLoader } from "@/features/admin/pages/loaders/transaction-dashboard.lodaer";

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
          {
            index: true,
            element: <CategoriesPreview />,
            loader: categoriesPreviewLoader,
            HydrateFallback: Spinner,
          },
          {
            path: ":category",
            element: <Category />,
            loader: categoryLoader,
            HydrateFallback: Spinner,
          },
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
      {
        index: true,
        element: <AdminDashboard />,
        loader: transactionsLoader,
        HydrateFallback: Spinner,
      },
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
      {
        path: "transactions",
        element: <TransactionsDashboard />,
        loader: transactionsLoader,
        HydrateFallback: Spinner,
      },
    ],
  },
]);

export default router;
