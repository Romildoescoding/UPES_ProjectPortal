import { useUser } from "../features/authentication/signin/useUser";

function ProtectedRoute({ children }) {
  const { data, isLoading } = useUser();
  return <>{children}</>;
}

export default ProtectedRoute;
