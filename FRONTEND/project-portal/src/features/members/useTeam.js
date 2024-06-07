import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { addTeam as addTeamApi } from "../../services/apiMembers";

export default function useTeam() {
  const queryClient = useQueryClient();
  const { mutate: addTeam, isLoading } = useMutation({
    mutationFn: addTeamApi,
    // mutationKey: ["team"],
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      console.log(team);
      queryClient.setQueryData("team", team);
    },
  });
  return { addTeam, isLoading };
}
