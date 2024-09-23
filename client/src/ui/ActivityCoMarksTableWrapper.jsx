import { useUser } from "../features/authentication/signin/useUser";
import useRequests from "../features/mentorship/useRequests";
import ActivityCoMarksTable from "./ActivityCoMarksTable";

function ActivityCoMarksTableWrapper() {
  const { data: session, isLoading } = useUser();
  const username = session?.user?.username;
  let { data: mentorshipRequests, isLoading2 } = useRequests({ username });
  if (mentorshipRequests)
    mentorshipRequests = Object.values(mentorshipRequests);
  return <ActivityCoMarksTable mentorshipRequests={mentorshipRequests} />;
}

export default ActivityCoMarksTableWrapper;
