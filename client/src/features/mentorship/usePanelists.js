import { useMutation, useQueryClient } from "@tanstack/react-query";

import { setPanelMembers as setPanelMembersApi } from "../../services/apiMembers";

export default function usePanelists() {
  const queryClient = useQueryClient();
  const { mutate: setPanelMembers, isLoading } = useMutation({
    mutationFn: setPanelMembersApi,
    onSuccess: (res) => {
      queryClient.refetchQueries(["null-panel-groups"]);
      console.log(res);
    },
  });

  return { setPanelMembers, isLoading };
}
