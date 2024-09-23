import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllFaculties } from "../../services/apiMembers";

export default function useAllFaculties() {
  // const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: getAllFaculties,
    queryKey: ["faculties"],
  });

  console.log(data);
  return { data, isLoading };
}
