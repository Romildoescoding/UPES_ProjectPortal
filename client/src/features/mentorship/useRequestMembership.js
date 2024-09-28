import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { requestMentorship as requestMentorshipApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useRequestMembership() {
  const queryClient = useQueryClient();
  const { mutate: requestMentorship, isPending } = useMutation({
    mutationFn: requestMentorshipApi,
    onError: (err) => {
      toast.error("Failed to send Request");
      console.log(err);
    },
    onSuccess: (project) => {
      toast.success("Mentorship Request Sent");
      console.log(project);
      queryClient.setQueryData(["project"], project);
      // queryClient.invalidateQueries(["project"]);
    },
  });
  return { requestMentorship, isPending };
}
