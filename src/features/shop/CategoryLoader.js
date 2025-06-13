import { getProductsByCategory } from "./category.firebase";

// loader tanpa defer
export async function categoryLoader({ params }) {
  const { category } = params;
  const products = await getProductsByCategory(category);

  return { products, category };
}
