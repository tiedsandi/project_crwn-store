import { ChevronLeft, ChevronRight, Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import Button from "@/components/UI/button/button.component";
import ConfirmModal from "@/components/UI/confirm-modal/ConfirmModal";
import { deleteProduct } from "../services/product.firebase";
import styles from "../Admin.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function ProductTable({ products }) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (id) => navigate(`update/${id}`);
  const onNavigateHandler = () => navigate("create/");

  const handleDeleteClick = (id) => {
    setProductToDelete(id);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    const deletingToast = toast.loading("Deleting product...");

    try {
      await deleteProduct(productToDelete);
      toast.update(deletingToast, {
        render: "🗑️ Product deleted successfully",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      setIsModalOpen(false);
      setProductToDelete(null);
      navigate("/admin/products", { replace: true });
    } catch {
      toast.update(deletingToast, {
        render: "❌ Failed to delete product",
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

  const sortedAndFilteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [products, searchTerm, sortConfig]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredProducts.slice(start, start + itemsPerPage);
  }, [sortedAndFilteredProducts, currentPage]);

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  return (
    <div>
      <div className={styles.tableHeader}>
        <h3>Product List</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className={styles.input}
          />
          <Button onClick={onNavigateHandler}>Add Product</Button>
        </div>
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th onClick={() => handleSort("categoryId")}>Category</th>
            <th onClick={() => handleSort("price")}>Price ($)</th>
            <th onClick={() => handleSort("qty")}>Qty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length === 0 && (
            <tr>
              <td colSpan="6">No products found.</td>
            </tr>
          )}
          {paginatedProducts.map((product) => (
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
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => handleEdit(product.id)}
                    title="Edit"
                    className={styles.iconButton}
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    title="Delete"
                    className={styles.iconButton}
                  >
                    <Trash2 size={18} color="red" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight />
          </button>
        </div>
      )}

      <ConfirmModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
