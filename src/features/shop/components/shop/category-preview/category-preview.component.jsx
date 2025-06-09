import { CATEGORIES, PRODUCTS } from "../../../../../data";

import { Link } from "react-router";
import ProductCard from "../product-card/product-card.component";
import classes from "./category-preview.module.css";

const CategoryPreviewItem = ({ title, id, products }) => {
  return (
    <div className={classes.categoryPreviewContainer}>
      <h2>
        <Link className={classes.title} to={id}>
          {title}
        </Link>
      </h2>
      <div className={classes.preview}>
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default function CategoriesPreview() {
  return (
    <>
      {CATEGORIES.map((category) => {
        const { id, title } = category;
        const products = PRODUCTS.filter(
          (product) => product.categoryId === id
        );
        return (
          <CategoryPreviewItem
            key={id}
            id={id}
            title={title}
            products={products}
          />
        );
      })}
    </>
  );
}
