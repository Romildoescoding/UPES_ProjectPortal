import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { initializeGroup as initializeGroupApi } from "../../services/apiMembers";
import toast from "react-hot-toast";

export default function useGroup() {
  const queryClient = useQueryClient();
  const { mutate: initializeGroup, isPending } = useMutation({
    mutationFn: initializeGroupApi,
    onError: (err) => {
      console.log(err);
      toast.error("Group Initiation Failed");
    },
  });
  return { initializeGroup, isPending };
}
