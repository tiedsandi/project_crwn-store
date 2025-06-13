import { useEffect, useState } from "react";

import ProductTable from "../../components/Product-table.component";
import Spinner from "@/components/UI/spinner/Spinner.component";
import { getAllProducts } from "../../services/product.firebase";
import { selectCurrentUser } from "@/features/auth/auth.selector";
import { useSelector } from "react-redux";
import { useToastQuery } from "@/hooks/useToastQuery";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector(selectCurrentUser);
  useToastQuery();

  useEffect(() => {
    if (!auth) return;

    setLoading(true);
    const unsubscribe = getAllProducts((data) => {
      setProducts(data);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  return (
    <div>
      <h1>📦 Manage Products</h1>
      {loading ? <Spinner /> : <ProductTable products={products} />}
    </div>
  );
}
