import "../styles/groupmembers.css";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";
import Spinner from "./Spinner";
import EmptyComponent from "./EmptyComponent";
import GroupMember from "./GroupMember";

function GroupMembers() {
  const { data, isPending } = useUser();
  const user = data?.user;
  const { data: team, isPending: isPending2 } = useTeamInformation({ user });

  return (
    <div className="members">
      <span className="dashboard-heading">Group Members</span>
      <div className="members-container">
        {isPending || isPending2 ? (
          <Spinner />
        ) : !team?.data?.length ? (
          <EmptyComponent msg={"❗No group data found❗"} isTable={false} />
        ) : (
          <div className="members-list">
            <div className="members-header">
              <div className="member-column">Name</div>
              <div className="member-column">Contact</div>
              <div className="member-column">Position</div>
            </div>
            {team?.data?.map((member, i) => (
              <GroupMember key={i} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupMembers;
