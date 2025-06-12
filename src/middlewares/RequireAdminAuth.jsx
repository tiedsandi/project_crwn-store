import { selectCurrentUser } from "@/features/auth/auth.selector";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function RequireAdminAuth({ children }) {
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (!user.email.includes("admin")) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || !user.email.includes("admin")) return null;

  return children;
}
