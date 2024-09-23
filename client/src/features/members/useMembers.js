import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMembers as updateMembersApi } from "../../services/apiMembers";

export default function useUpdateMembers() {
  const queryClient = useQueryClient();
  const { mutate: updateMembers, isLoading } = useMutation({
    mutationFn: updateMembersApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      queryClient.invalidateQueries(["team"]);
    },
  });
  return { updateMembers, isLoading };
}
