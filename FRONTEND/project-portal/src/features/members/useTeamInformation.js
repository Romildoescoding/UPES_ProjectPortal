import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiMembers";

export default function useTeamInformation(username) {
  const { data, isLoading, refetch } = useQuery({
    queryFn: () => {
      return getTeam(username);
    },
    queryKey: ["team"],
    initialData: [], // Provide an empty array as initial data
  });
  return { data, isLoading, refetch };
}
