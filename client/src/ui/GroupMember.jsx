import capitalize from "../helpers/capitalize";
function GroupMember({ member }) {
  return (
    <div className="member-row">
      <div className="member-column">{member.name}</div>
      <div className="member-column">{member.sap_id}</div>
      <div className="member-column">{capitalize(member?.position)}</div>
    </div>
  );
}

export default GroupMember;
