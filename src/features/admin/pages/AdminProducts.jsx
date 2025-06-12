import ProductTable from "../components/Product-table.component";

export default function ProductsPage() {
  return (
    <div>
      <h1>📦 Kelola Produk</h1>
      <ProductTable products={[]} setProducts={() => {}} />
    </div>
  );
}
