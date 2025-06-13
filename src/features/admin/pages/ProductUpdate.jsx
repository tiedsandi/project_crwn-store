// edit.jsx

import { getProductById, updateProduct } from "../product.firebase";
import { redirect, useLoaderData } from "react-router";

import ProductForm from "../components/product-form.component";

export default function ProductEditPage() {
  const product = useLoaderData();
  return <ProductForm existingProduct={product} />;
}

export async function loader({ params }) {
  const product = await getProductById(params.id);
  console.log(product);

  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }

  return product;
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData.entries());
  updatedData.price = Number(updatedData.price);
  updatedData.qty = Number(updatedData.qty);

  await updateProduct(params.id, updatedData);
  return redirect("/admin/products");
}
