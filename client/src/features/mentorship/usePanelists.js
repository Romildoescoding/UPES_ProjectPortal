import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setPanelMembers as setPanelMembersApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function usePanelists() {
  const queryClient = useQueryClient();
  const { mutate: setPanelMembers, isPending } = useMutation({
    mutationFn: setPanelMembersApi,
    onSuccess: (res) => {
      queryClient.refetchQueries(["null-panel-groups"]);
      toast.success("Successfully Set the Panel Members");
      // console.log(res);
    },
    onError: () => {
      toast.error("Error while Setting Panelists");
    },
  });

  return { setPanelMembers, isPending };
}
