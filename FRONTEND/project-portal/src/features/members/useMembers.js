import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMembers as addMembersApi } from "../../services/apiMembers";

export default function useMembers() {
  const queryClient = useQueryClient();
  const { mutate: addMembers, isLoading } = useMutation({
    mutationFn: addMembersApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      // console.log(team);
      queryClient.setQueryData("team", team);
    },
  });
  return { addMembers, isLoading };
}
