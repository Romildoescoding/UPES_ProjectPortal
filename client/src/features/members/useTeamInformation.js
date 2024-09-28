import { useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiMembers";

export default function useTeamInformation(user) {
  const { data, isPending, refetch } = useQuery({
    queryFn: () => getTeam(user),
    queryKey: ["team"],
    initialData: [], // Provide an empty array as initial data
  });
  return { data, isPending, refetch };
}
