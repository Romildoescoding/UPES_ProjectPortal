import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProjects } from "../../services/apiMembers";

export default function useAllProjects(faculty) {
  // const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryFn: () => getAllProjects(faculty),
    queryKey: faculty.isPanelNotNull ? ["all-groups-not-null"] : ["all-groups"],
  });

  console.log(data);
  return { data, isFetching };
}
