import Button from "@/components/UI/button/button.component";
import styles from "../Admin.module.css";

export default function ProductTable({ products, setProducts }) {
  // const handleDelete = async (id) => {
  //   const confirmed = window.confirm("Yakin ingin menghapus produk ini?");
  //   if (!confirmed) return;

  //   try {
  //     // TODO: Integrasikan delete dari Firebase
  //     console.log("Menghapus produk dengan id:", id);
  //     // setProducts(products.filter((product) => product.id !== id));
  //   } catch (err) {
  //     alert("Gagal menghapus produk.");
  //   }
  // };

  return (
    <div>
      <div className={styles.tableHeader}>
        <h2>Daftar Produk</h2>
        <Button onClick={() => alert("Form Tambah Produk belum dibuat")}>
          + Tambah Produk
        </Button>
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Qty</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="5">Tidak ada produk ditemukan.</td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name || "-"}</td>
              <td>{product.category || "-"}</td>
              <td>{product.price ? `Rp${product.price}` : "-"}</td>
              <td>{product.quantity ?? 0}</td>
              <td>
                <Button onClick={() => alert("Edit belum dibuat")}>Edit</Button>
                <Button
                  // onClick={() => handleDelete(product.id)}
                  buttonType="inverted"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
