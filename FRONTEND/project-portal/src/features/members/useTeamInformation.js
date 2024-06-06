import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getTeam } from "../../services/apiMembers";

export default function useTeamInformation(username) {
  // console.log("USERNAME passed here is:=", username); // Uncomment if needed
  const { data, isLoading } = useQuery({
    queryFn: () => {
      console.log("THE USERNAME IN THE QUERYFN IS:", username);
      return getTeam(username);
    },
    queryKey: ["team"],
  });
  return { data, isLoading };
}
