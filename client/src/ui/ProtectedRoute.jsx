import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "./Loader";
import DoesNotExist from "./DoesNotExist";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useUser();

  useEffect(() => {
    // if (location.pathname !== "/signin" && location.pathname !== "/") {
    // queryClient.setQueryData(["lastPath"], location.pathname);
    // }

    if (!isLoading && !user?.user) {
      navigate("/signin", { replace: true, state: { from: location } });
    }
    // else if (!isLoading && user?.user && location.pathname === "/") {
    // Redirect authenticated users to the last accessed path from root "/"
    // const lastPath = queryClient.getQueryData(["lastPath"]) || "/signin";
    // if (lastPath !== "/" && lastPath !== "/signin") {
    // navigate(lastPath, { replace: true });
    // }
    // }
  }, [isLoading, user, location, navigate, queryClient]);

  if (isLoading) return <Loader />;
  if (location.pathname === "/") return <DoesNotExist />;

  return <>{children}</>;
}

export default ProtectedRoute;
