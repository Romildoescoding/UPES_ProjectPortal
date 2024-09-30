import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequests } from "../../services/apiMembers";

export default function useProjects(faculty) {
  // const queryClient = useQueryClient();
  const { data, isLoading, isFetching } = useQuery({
    queryFn: () => getRequests(faculty),
    queryKey: ["projects"],
  });

  console.log(data);
  return { data, isLoading, isFetching };
}
