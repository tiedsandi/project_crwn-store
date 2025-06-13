import { getAllProducts } from "./categoryService.firebase";

export async function categoriesPreviewLoader() {
  const products = await getAllProducts();
  return { products };
}
