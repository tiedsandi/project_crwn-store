import { redirect } from "react-router";
import { updateProduct } from "../../services/product.firebase";

export async function productUpdateAction({ request, params }) {
  const formData = await request.formData();
  const updatedData = Object.fromEntries(formData.entries());
  updatedData.price = Number(updatedData.price);
  updatedData.qty = Number(updatedData.qty);

  await updateProduct(params.id, updatedData);
  return redirect(
    "/admin/products?success=Produk+berhasil+diupdate&type=update"
  );
}
