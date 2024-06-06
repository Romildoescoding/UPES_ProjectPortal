import { QueryClient, queryOptions, useMutation } from "@tanstack/react-query";
import { addMembers as addMembersApi } from "../../services/apiMembers";

export default function useMembers() {
  const queryClient = new QueryClient();
  const { mutate: addMembers, isLoading } = useMutation({
    mutationFn: addMembersApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      console.log(team);
      queryClient.refetchQueries("team");
    },
  });
  return { addMembers, isLoading };
}
