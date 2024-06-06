import "../styles/groupmembers.css";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";

function GroupMembers() {
  const { data: session, isLoading } = useUser();
  const username = session?.user?.username || "Romil";
  console.log(username);

  const { data, isLoading2 } = useTeamInformation({ username });
  console.log("THE TEAM IS --------------------------");
  console.log(data);
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
              <td>{isLoading2 ? "LOADING..." : "Romil"}</td>
              <td>0987654321</td>
              <td>Group Lead</td>
            </tr>
            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Group Lead</td>
            </tr>
            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Group Lead</td>
            </tr>
            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Group Lead</td>
            </tr>
            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Member</td>
            </tr>
            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Member</td>
            </tr>

            <tr className="members-row">
              <td>Romil Rajrana</td>
              <td>0987654321</td>
              <td>Member</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GroupMembers;
