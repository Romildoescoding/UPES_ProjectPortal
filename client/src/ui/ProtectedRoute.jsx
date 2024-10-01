import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { data: user, Pending } = useUser();
  if (Pending) return <Loader />;

  // if (!Pending && !user?.user) {
  //   navigate("/signin", { replace: true });
  // }

  // If still loading, show the loader

  // // Prevent rendering children if user is unauthorized
  // if (!user?.user) return null;

  // If authorized, render the children
  return <>{children}</>;
}

export default ProtectedRoute;
