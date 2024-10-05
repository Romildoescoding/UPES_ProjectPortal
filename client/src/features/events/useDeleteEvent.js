import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteEvent as deleteEventApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useDeleteEvent() {
  const queryClient = useQueryClient();
  const { mutate: deleteEvent, isPending } = useMutation({
    mutationFn: deleteEventApi,
    onSuccess: (res) => {
      toast.success("Event deleted successfully");
      queryClient.refetchQueries(["events"]);
    },
    onError: (res) => {
      toast.error("Error while deletion");
      queryClient.refetchQueries(["events"]);
    },
  });

  return { deleteEvent, isPending };
}
