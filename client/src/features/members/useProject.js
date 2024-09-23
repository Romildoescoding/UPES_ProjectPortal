import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { uploadProject as uploadProjectApi } from "../../services/apiMembers";

export default function useProject() {
  const queryClient = useQueryClient();
  const { mutate: uploadProject, isLoading } = useMutation({
    mutationFn: uploadProjectApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      // console.log(team);
      queryClient.setQueryData(["project"], team);
      // queryClient.invalidateQueries(["team"]);
    },
  });
  return { uploadProject, isLoading };
}
