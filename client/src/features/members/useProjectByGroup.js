import { useQuery } from "@tanstack/react-query";
import { getProjectByGroup, getTeam } from "../../services/apiMembers";

export default function useProjectByGroup(group_name) {
  const { data: project, isFetching } = useQuery({
    queryFn: () => getProjectByGroup(group_name),
    queryKey: ["project"],
  });
  return { project, isFetching };
}
