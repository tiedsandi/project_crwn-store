import Button from "@/components/UI/button/button.component";
import { Link } from "react-router";
import styles from "./checkout.module.css";

export default function CheckoutSuccess() {
  return (
    <div className={styles.successContainer}>
      <h1>🎉 Checkout Successful!</h1>
      <p>
        Your transaction has been processed. Thank you for shopping with us!
      </p>
      <Link to="/shop">
        <Button>Shop Again</Button>
      </Link>
    </div>
  );
}
