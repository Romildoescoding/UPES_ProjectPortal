import "../styles/groupmembers.css";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function GroupMembers() {
  const { data: session, isLoading } = useUser();
  const user = session?.user?.email;
  // console.log(username);

  const { data: team, isLoading2, refetch } = useTeamInformation({ user });

  useEffect(
    function () {
      refetch();
    },
    [user, refetch]
  );

  // console.log("THE TEAM IS --------------------------");
  // console.log(data);
  return (
    <div className="members">
      <span className="dashboard-heading">Group Members</span>
      <div className="members-container">
        <table className="members-table">
          <thead>
            <tr className="members-row">
              <th>Name</th>
              <th>Contact</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            <tr className="members-row">
              <td>{team?.leader?.username}</td>
              <td>{team?.leader?.contact}</td>
              <td>{team?.leader ? "Group Lead" : ""}</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member1?.username}</td>
              <td>{team?.member1?.contact}</td>
              <td>{team?.member1 ? "Member" : ""}</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member2?.username}</td>
              <td>{team?.member2?.contact}</td>
              <td>{team?.member2 ? "Member" : ""}</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member3?.username}</td>
              <td>{team?.member3?.contact}</td>
              <td>{team?.member3 ? "Member" : ""}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupMembers;
