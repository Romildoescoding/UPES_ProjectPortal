import { QueryClient, useMutation } from "@tanstack/react-query";
import { addTeam as addTeamApi } from "../../services/apiMembers";

export default function useMembers() {
  const queryClient = new QueryClient();
  const { mutate: addTeam, isLoading } = useMutation({
    mutationFn: addTeamApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      console.log(team);
      queryClient.setQueryData(["team"], team);
    },
  });
  return { addTeam, isLoading };
}
