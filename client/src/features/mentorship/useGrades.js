import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGrades } from "../../services/apiMembers";

export default function useGrades(mail) {
  // const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryFn: () => getGrades(mail),
    queryKey: ["grades"],
  });

  // console.log(data);
  return { data, isFetching };
}
