import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPanelGroups } from "../../services/apiMembers";

export default function usePanelGroups(panel) {
  console.log(panel);
  const { data, isFetching } = useQuery({
    queryFn: () => getPanelGroups(panel),
    queryKey: ["panel-groups"],
  });

  // console.log(data);
  return { data, isFetching };
}
