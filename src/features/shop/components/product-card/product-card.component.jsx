import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/button/button.component";
import { addItemToCart } from "@/features/cart/cartSlice";
import classes from "./product-card.module.css";
import { selectCurrentUser } from "@/features/auth/auth.selector";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));
  return (
    <div className={classes.productCard}>
      <img src={imageUrl} alt={name} className={classes.productImage} />
      <div className={classes.footer}>
        <span className={classes.name}>{name}</span>
        <span className={classes.price}>${price}</span>
      </div>
      {!currentUser?.email.includes("admin") && (
        <Button buttonType="inverted" onClick={addProductToCart}>
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default ProductCard;
