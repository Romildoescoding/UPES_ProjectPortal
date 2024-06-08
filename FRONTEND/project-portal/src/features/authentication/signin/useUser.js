import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../../services/apiAuth";

export function useUser() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
  });

  console.log(data);
  return { data, isLoading };
}
