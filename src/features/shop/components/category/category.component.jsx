import ProductCard from "../product-card/product-card.component";
import styles from "./category.module.css";
import { useLoaderData } from "react-router";

const Category = () => {
  const { products, category } = useLoaderData();

  return (
    <>
      <h2 className={styles.title}>{category.toUpperCase()}</h2>
      <div className={styles.categoryContainer}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Category;
