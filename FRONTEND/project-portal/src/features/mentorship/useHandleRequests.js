import { useMutation, useQueryClient } from "@tanstack/react-query";

import { handleRequests as handleRequestsApi } from "../../services/apiMembers";

export default function useHandleRequests() {
  const queryClient = useQueryClient();
  const { mutate: handleRequest, isLoading } = useMutation({
    mutationFn: handleRequestsApi,
    onSuccess: (res) => {
      console.log(res);
    },
  });

  return { handleRequest, isLoading };
}
