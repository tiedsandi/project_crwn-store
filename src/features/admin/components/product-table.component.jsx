import Button from "@/components/UI/button/button.component";
import ConfirmModal from "@/components/UI/confirm-modal/ConfirmModal"; // pastikan path sesuai
import { deleteProduct } from "../services/product.firebase";
import styles from "../Admin.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function ProductTable({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEdit = (id) => {
    navigate(`update/${id}`);
  };

  const onNavigateHandler = () => navigate("create/");

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    const deletingToast = toast.loading("Menghapus produk...");

    try {
      await deleteProduct(productToDelete);
      toast.update(deletingToast, {
        render: "🗑️ Produk berhasil dihapus",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setIsModalOpen(false);
      setProductToDelete(null);
      navigate("/admin/products", { replace: true });
    } catch (err) {
      toast.update(err, {
        render: "❌ Gagal menghapus produk",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <div className={styles.tableHeader}>
        <h2>Product List</h2>
        <Button onClick={onNavigateHandler}>Add Product</Button>
      </div>
      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price ($)</th>
            <th>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          )}
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "6px",
                    }}
                  />
                ) : (
                  <span style={{ fontStyle: "italic", color: "#aaa" }}>
                    No image
                  </span>
                )}
              </td>
              <td>{product.name || "-"}</td>
              <td>{product.categoryId || "-"}</td>
              <td>{product.price}</td>
              <td>{product.qty ?? 0}</td>
              <td>
                <Button onClick={() => handleEdit(product.id)}>Edit</Button>
                <Button
                  buttonType="inverted"
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ConfirmModal
        isOpen={isModalOpen}
        message="Yakin ingin menghapus produk ini?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
