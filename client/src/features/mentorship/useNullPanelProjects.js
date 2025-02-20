import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRequests } from "../../services/apiMembers";

export default function useNullPanelProjects(faculty) {
  // const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryFn: () => getRequests(faculty),
    queryKey: ["null-panel-groups"],
  });

  // console.log(data);
  return { data, isFetching };
}
