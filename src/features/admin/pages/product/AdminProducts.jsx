import { useEffect, useState } from "react";

import ProductTable from "../../components/Product-table.component";
import { getAllProducts } from "../../services/product.firebase";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import { useSelector } from "react-redux";
import { useToastQuery } from "@/hooks/useToastQuery";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const auth = useSelector(selectCurrentUser);
  useToastQuery();
  useEffect(() => {
    if (!auth) return;

    const unsubscribe = getAllProducts(setProducts);
    return unsubscribe;
  }, [auth]);

  return (
    <div>
      <h1>📦 Manage Products</h1>
      <ProductTable products={products} />
    </div>
  );
}
