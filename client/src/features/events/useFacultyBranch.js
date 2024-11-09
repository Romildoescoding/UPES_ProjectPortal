import { useQuery } from "@tanstack/react-query";
import { getFacultyBranch } from "../../services/apiMembers";

export default function useEvents(mail) {
  const { data, isFetching } = useQuery({
    queryKey: ["faculty-branch"],
    queryFn: () => getFacultyBranch(mail),
  });

  return { data, isFetching };
}
