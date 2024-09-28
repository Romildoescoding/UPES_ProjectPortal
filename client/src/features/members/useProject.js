import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { uploadProject as uploadProjectApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useProject() {
  const queryClient = useQueryClient();
  const { mutate: uploadProject, isPending } = useMutation({
    mutationFn: uploadProjectApi,
    onError: (err) => {
      console.log(err);
      toast.error("Error while Uploading");
    },
    onSuccess: (team) => {
      // console.log(team);
      toast.success("Successfully Uploaded the Details");
      queryClient.setQueryData(["project"], team);
      // queryClient.invalidateQueries(["team"]);
    },
  });
  return { uploadProject, isPending };
}
