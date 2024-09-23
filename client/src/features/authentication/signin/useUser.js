import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../../services/apiAuth";

export function useUser() {
  // const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false, // Disable retries for auth requests
  });

  // const data = queryClient.getQueryData(["user"]);

  // console.log(data);
  return { data, isLoading };
  // return data;
}
