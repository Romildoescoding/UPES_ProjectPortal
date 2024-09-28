import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMembers as updateMembersApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useUpdateMembers() {
  const queryClient = useQueryClient();
  const { mutate: updateMembers, isPending } = useMutation({
    mutationFn: updateMembersApi,
    onError: (err) => {
      toast.error("Failed to Add Members");
      console.log(err);
    },
    onSuccess: () => {
      toast.success("Member(s) added sucessfully");
      queryClient.invalidateQueries(["team"]);
    },
  });
  return { updateMembers, isPending };
}
