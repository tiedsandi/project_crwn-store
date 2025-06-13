import { getProductById } from "../../services/product.firebase";

export async function productUpdateLoader({ params }) {
  const product = await getProductById(params.id);
  if (!product) {
    throw new Response("Product not found", { status: 404 });
  }
  return product;
}
