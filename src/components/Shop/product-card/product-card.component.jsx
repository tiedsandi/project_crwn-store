import Button from "../../UI/button/button.component";
import classes from "./product-card.module.css";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const addProductToCart = () => console.log("tambah");
  return (
    <div className={classes.productCard}>
      <img src={imageUrl} alt={name} className={classes.productImage} />
      <div className={classes.footer}>
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addProductToCart}>
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;
