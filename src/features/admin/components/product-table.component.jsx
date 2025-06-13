import Button from "@/components/UI/button/button.component";
import { deleteProduct } from "../product.firebase";
import styles from "../Admin.module.css";
import { useNavigate } from "react-router";

export default function ProductTable({ products }) {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;
    await deleteProduct(id);
  };

  const handleEdit = (id) => {
    navigate(`update/${id}`);
  };

  const onNavigateHandler = () => navigate("create/");

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
                  onClick={() => handleDelete(product.id)}
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
