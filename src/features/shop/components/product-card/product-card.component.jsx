import Button from "@/components/UI/button/button.component";
import { addItemToCart } from "@/features/cart/cartSlice";
import classes from "./product-card.module.css";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));
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
