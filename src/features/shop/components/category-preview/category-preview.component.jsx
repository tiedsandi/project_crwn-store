import { Link, useLoaderData } from "react-router";

import { CATEGORIES } from "../../../../data"; // tetap pakai data lokal
import ProductCard from "../product-card/product-card.component";
import classes from "./category-preview.module.css";

const CategoryPreviewItem = ({ title, id, products }) => (
  <div className={classes.categoryPreviewContainer}>
    <h2>
      <Link className={classes.title} to={id}>
        {title}
      </Link>
    </h2>
    <div className={classes.preview}>
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default function CategoriesPreview() {
  const { products } = useLoaderData();

  if (!Array.isArray(products)) {
    return <p>Loading or data error...</p>;
  }

  return (
    <>
      {CATEGORIES.map(({ id, title }) => {
        const filteredProducts = products.filter(
          (product) => product.categoryId === id
        );

        return (
          <CategoryPreviewItem
            key={id}
            id={id}
            title={title}
            products={filteredProducts}
          />
        );
      })}
    </>
  );
}
