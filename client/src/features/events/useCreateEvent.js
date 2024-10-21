import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createEvent as createEventApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useCreateEvent() {
  const queryClient = useQueryClient();
  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: createEventApi,
    onSuccess: (res) => {
      toast.success("Updated Successfully");
      queryClient.refetchQueries(["events"]);
    },
    onError: (err) => {
      toast.error(
        err.message ===
          'duplicate key value violates unique constraint "events_pkey"'
          ? "This event already exists"
          : "Unexpected Error. Try again"
      );
      queryClient.refetchQueries(["events"]);
    },
  });

  return { createEvent, isPending };
}
