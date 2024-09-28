import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject as updateProjectApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useProjectUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: updateProjectApi,
    onError: (err) => {
      toast.error("Error while Updating");
      console.log(err);
    },
    onSuccess: (project) => {
      toast.success("Details Updated Successfully");
      queryClient.setQueryData(["project"], project);
    },
  });
  return { updateProject, isPending };
}
