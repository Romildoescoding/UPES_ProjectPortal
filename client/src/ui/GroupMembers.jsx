import "../styles/groupmembers.css";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import GroupMember from "./GroupMember";
import extractMails from "../helpers/extractMails";
import Spinner from "./Spinner";
import EmptyComponent from "./EmptyComponent";

function GroupMembers() {
  const { data, isLoading } = useUser();
  const user = data?.user;

  const { data: team, isLoading2 } = useTeamInformation({ user });

  // useEffect(
  //   function () {
  //     refetch();
  //   },
  //   [user, refetch]
  // );

  // if (isLoading || isLoading2) return <Spinner />;

  console.log(!team?.data?.length);
  return (
    <div className="members">
      <span className="dashboard-heading">Group Members</span>
      <div className="members-container">
        <table className="members-table members-first-child-long">
          <thead>
            <tr className="members-row">
              <th>Name</th>
              <th>Contact</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || isLoading2 ? (
              <Spinner />
            ) : !team?.data?.length ? (
              <EmptyComponent msg={"❗No group data found❗"} isTable={true} />
            ) : (
              team?.data?.map((member, i) => (
                <GroupMember key={i} member={member} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupMembers;
