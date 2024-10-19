import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateEvent as updateEventApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useUpdateEvent() {
  const queryClient = useQueryClient();
  const { mutate: updateEvent, isPending } = useMutation({
    mutationFn: updateEventApi,
    onSuccess: (res) => {
      toast.success("Updated Successfully");
      queryClient.refetchQueries(["events"]);
    },
    onError: (res) => {
      toast.error("Unexpected Error. Try again");
      queryClient.refetchQueries(["events"]);
    },
  });

  return { updateEvent, isPending };
}
