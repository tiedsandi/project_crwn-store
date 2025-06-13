import ProductForm from "../../components/product-form.component";
import { useLoaderData } from "react-router";

export default function ProductEditPage() {
  const product = useLoaderData();
  return <ProductForm existingProduct={product} />;
}
