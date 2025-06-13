import { useEffect, useState } from "react";

import { PRODUCTS } from "../../../../data";
import ProductCard from "../product-card/product-card.component";
import styles from "./category.module.css";
import { useParams } from "react-router";

const Category = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = PRODUCTS.filter(
      (product) => product.categoryId === category
    );
    setProducts(filteredProducts);
  }, [category]);

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
