import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequests } from "../../services/apiMembers";
// import { getUser } from "../../../services/apiAuth";

export default function useRequests(username) {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => getRequests(username),
    queryKey: ["requests"],
  });

  console.log(data);
  return { data, isLoading };
}
