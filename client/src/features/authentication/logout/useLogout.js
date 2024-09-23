import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../../services/apiAuth";

export default function useLogout() {
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onError: (err) => console.log(err),
    onSuccess: async () => {
      console.log("LOGOUT SUCCESSFUL");
      localStorage.removeItem("token");
      queryClient.setQueryData(["user"], null);
      // setTimeout(() => queryClient.removeQueries(), 1000);
    },
  });
  return { logout, isLoading };
}
