import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import Loader from "./Loader";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { data: session, isLoading } = useUser();
  const user = session?.user;

  //Loader while the page loads
  if (isLoading) return <Loader />;

  //If user does not exists or you can say not authenticated user
  if (!user) navigate("/signin");

  //Else return the WEB APP
  return <>{children}</>;
}

export default ProtectedRoute;
