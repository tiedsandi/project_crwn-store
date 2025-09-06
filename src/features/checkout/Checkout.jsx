import Checkout from "./components/checkout.component";
import { selectCurrentUser } from "../auth/auth.selector";
import { useSelector } from "react-redux";

export default function CheckoutPage() {
  const currentUser = useSelector(selectCurrentUser);
  const isAdmin = currentUser?.email.includes("admin");
  if (isAdmin) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
        Admins cannot access the checkout page.
      </h2>
    );
  }

  return <Checkout />;
}
