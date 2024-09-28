import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRequests as handleRequestsApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useHandleRequests() {
  const queryClient = useQueryClient();
  const { mutate: handleRequest, isPending } = useMutation({
    mutationFn: handleRequestsApi,
    onSuccess: (res) => {
      toast.success("Updated Successfully");
      queryClient.refetchQueries(["requests"]);
    },
    onError: (res) => {
      toast.success("Unexpected Error. Try again");
      queryClient.refetchQueries(["requests"]);
    },
  });

  return { handleRequest, isPending };
}
