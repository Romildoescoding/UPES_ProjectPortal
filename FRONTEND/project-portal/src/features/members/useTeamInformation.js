import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiMembers";

export default function useTeamInformation(username) {
  console.log("USERNAME passed here is:=", username);
  const queryClient = new QueryClient();
  const { data: team, isLoading } = useQuery({
    queryKey: ["team"],
    queryFn: (username) => getTeam(username),
  });
  return { team, isLoading };
}
