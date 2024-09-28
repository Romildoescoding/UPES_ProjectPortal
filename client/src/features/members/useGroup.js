import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { initializeGroup as initializeGroupApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useGroup() {
  const queryClient = useQueryClient();
  const { mutate: initializeGroup, isPending } = useMutation({
    mutationFn: initializeGroupApi,
    onError: (err) => {
      console.log(err);
      toast.error("Group Initiation Failed");
    },
    onSuccess: (team) => {
      console.log("ONSUCESS");
      toast.success("Group Initiated Successfully");
      console.log(team);
      // console.log(team);
      // queryClient.setQueryData(["team"], team);
      queryClient.invalidateQueries(["team"]);
    },
  });
  return { initializeGroup, isPending };
}
