import "../styles/groupmembers.css";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

function GroupMembers() {
  const { data: session, isLoading } = useUser();
  const username = session?.user?.username;
  // console.log(username);

  const { data: team, isLoading2, refetch } = useTeamInformation({ username });

  useEffect(
    function () {
      refetch();
    },
    [username, refetch]
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
              <td>{team?.leader}</td>
              <td>0987654321</td>
              <td>Group Lead</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member1}</td>
              <td>{9876543210}</td>
              <td>{"Member"}</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member2}</td>
              <td>{9876543210}</td>
              <td>{"Member"}</td>
            </tr>
            <tr className="members-row">
              <td>{team?.member3}</td>
              <td>{9876543210}</td>
              <td>{"Member"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupMembers;
