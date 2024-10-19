import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toggleRemoteVariables as toggleRemoteVariablesApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useToggleRemoteVariables() {
  const queryClient = useQueryClient();
  const { mutate: toggleRemoteVariables, isPending } = useMutation({
    mutationFn: toggleRemoteVariablesApi,
    onSuccess: (res) => {
      queryClient.refetchQueries(["remote-variables"]);
      toast.success("Toggle Successful");
    },
    onError: () => {
      toast.error("Error while Toggling");
    },
  });

  return { toggleRemoteVariables, isPending };
}
