import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { initializeGroup as initializeGroupApi } from "../../services/apiMembers";
import toast from "react-hot-toast";
import useUpdateMembers from "./useMembers";

export default function useGroup() {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);
  const { updateMembers, isPending: isPending2 } = useUpdateMembers();
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
      if (team.newGroup.leader !== user?.user?.mail) {
        updateMembers({
          group: team?.newGroup?.group_name,
          member1: user?.user?.mail,
        });
      }
      // console.log(team);
      // queryClient.setQueryData(["team"], team);
      queryClient.invalidateQueries(["team"]);
    },
  });
  return { initializeGroup, isPending, isPending2 };
}
