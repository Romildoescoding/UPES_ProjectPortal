import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { initializeGroup as initializeGroupApi } from "../../services/apiMembers";

export default function useGroup() {
  const queryClient = useQueryClient();
  const { mutate: initializeGroup, isLoading } = useMutation({
    mutationFn: initializeGroupApi,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: (team) => {
      // console.log(team);a
      // queryClient.setQueryData(["team"], team);
      queryClient.invalidateQueries(["team"]);
    },
  });
  return { initializeGroup, isLoading };
}
