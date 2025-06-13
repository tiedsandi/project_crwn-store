import { Form, useNavigation } from "react-router";

import Button from "@/components/UI/button/button.component";
import Input from "@/components/UI/input/Input.component";
import styles from "../Admin.module.css";

const categoryOptions = ["hats", "sneakers", "jackets", "mens", "womens"];

export default function ProductForm({ existingProduct }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={styles.formContainer}>
      <h3>{existingProduct ? "Edit Product" : "Add Product"}</h3>

      {existingProduct && (
        <input type="hidden" name="id" value={existingProduct.id} />
      )}

      <Input
        label="Name"
        id="product-name"
        name="name"
        defaultValue={existingProduct?.name || ""}
        required
      />
      <Input
        label="Image URL"
        id="product-image"
        name="imageUrl"
        defaultValue={existingProduct?.imageUrl || ""}
        required
      />
      <Input
        label="Price"
        id="product-price"
        name="price"
        type="number"
        defaultValue={existingProduct?.price || ""}
        required
      />
      <Input
        label="Quantity"
        id="product-qty"
        name="qty"
        type="number"
        defaultValue={existingProduct?.qty || ""}
        required
      />
      <div className={styles.selectGroup}>
        <label htmlFor="product-category">Category</label>
        <select
          id="product-category"
          name="categoryId"
          defaultValue={existingProduct?.categoryId || "hats"}
          className={styles.selectInput}
        >
          {categoryOptions.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? "Saving..."
          : existingProduct
          ? "Update Product"
          : "Add Product"}
      </Button>
    </Form>
  );
}
