import ProductForm from "../../components/product-form.component";
import { addProduct } from "../../services/product.firebase";
import { redirect } from "react-router";

export default function ProductCreatePage() {
  return <ProductForm />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const product = Object.fromEntries(formData.entries());

  product.price = Number(product.price);
  product.qty = Number(product.qty);
  console.log(product);

  await addProduct(product);
  return redirect("/admin/products");
}
