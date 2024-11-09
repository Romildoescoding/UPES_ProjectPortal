import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRemoteVariables } from "../../services/apiMembers";

export default function useRemoteVariables(dataObj) {
  const { data, isFetching } = useQuery({
    queryFn: () => getRemoteVariables(dataObj),
    queryKey: ["remote-variables"],
  });

  console.log(data);
  return { data, isFetching };
}
