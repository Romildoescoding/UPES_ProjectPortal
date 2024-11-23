import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMembers as updateMembersApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useUpdateMembers() {
  const queryClient = useQueryClient();
  const { mutate: updateMembers, isPending } = useMutation({
    mutationFn: updateMembersApi,
    onError: (err) => {
      if (err.message === "Group Members already in another group")
        toast.error(err.message);
      // if (err.message.includes('is not present in table "students".')) {
      //   const emailMatch = err.message.match(/\(([^)]+)\)=\(([^)]+)\)/);
      //   const email = emailMatch ? emailMatch[2] : "the specified email";
      //   toast.error(`No record of ${email} exists.`);
      // }
      else
        toast.error("Error while adding students. Do check the mails entered.");

      // console.log(err);
    },
    onSuccess: () => {
      toast.success("Member(s) added sucessfully");
      queryClient.invalidateQueries(["team"]);
      queryClient.invalidateQueries(["project"]);
    },
  });
  return { updateMembers, isPending };
}
