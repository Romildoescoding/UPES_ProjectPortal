import { useQuery } from "@tanstack/react-query";
import { getProjectByUser, getTeam } from "../../services/apiMembers";

export default function useProjectByUser(user) {
  const {
    data: project,
    isFetching,
    isLoading,
  } = useQuery({
    queryFn: () => getProjectByUser(user),
    queryKey: ["project"],
  });
  return { project, isFetching, isLoading };
}
