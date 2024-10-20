import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject as updateProjectApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useProjectUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: updateProjectApi,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (project) => {
      toast.success("Details Updated Successfully");
      queryClient.refetchQueries(["project"]);
    },
  });
  return { updateProject, isPending };
}
