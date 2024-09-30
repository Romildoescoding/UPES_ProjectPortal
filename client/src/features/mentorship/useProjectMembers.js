import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiMembers";

export default function useProjectMembers(user) {
  const { data, isLoading, isPending, isFetching } = useQuery({
    queryFn: () => getTeam(user),
    queryKey: ["selected_group"],
    initialData: [], // Provide an empty array as initial data
  });
  return { data, isLoading, isPending, isFetching };
}
