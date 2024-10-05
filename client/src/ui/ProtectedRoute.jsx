import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { data: user, isLoading, isFetching } = useUser();
  console.log(isLoading, isFetching);

  useEffect(() => {
    if (!isLoading && !user?.user) {
      navigate("/signin", { replace: true });
    }
  }, [isLoading, user, navigate]);
  if (isLoading) return <Loader />;

  // If still loading, show the loader

  // // Prevent rendering children if user is unauthorized
  // if (!user?.user) return null;

  // If authorized, render the children
  return <>{children}</>;
}

export default ProtectedRoute;
