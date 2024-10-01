import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../services/apiMembers";

export async function useEvents() {
  const {
    data: events,
    isLoading,
    isFetching,
    isPending,
  } = useQuery({ queryKey: ["events"], queryFn: getEvents });
  return { events, isLoading, isPending, isFetching };
}
