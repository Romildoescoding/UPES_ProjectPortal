import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/apiMembers";

export function useEvents() {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { data, isLoading, isFetching, isError };
}
