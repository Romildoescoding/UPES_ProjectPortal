import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequests } from "../../services/apiMembers";

export default function useRequests(faculty) {
  // const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryFn: () => getRequests(faculty),
    queryKey: ["requests"],
  });

  // console.log(data);
  return { data, isFetching };
}
