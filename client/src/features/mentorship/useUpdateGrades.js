import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateGrades as updateGradesApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useUpdateGrades() {
  const queryClient = useQueryClient();
  const { mutate: updateGrades, isPending } = useMutation({
    mutationFn: updateGradesApi,
    onSuccess: (res) => {
      toast.success("Successfully updated the grades");
      queryClient.refetchQueries(["panel-groups"]);
      // console.log(res);
    },
    onError: (err) => {
      toast.error("Error while updating the grades");
      // console.log(err);
    },
  });

  return { updateGrades, isPending };
}
