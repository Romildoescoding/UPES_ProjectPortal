import capitalize from "../helpers/capitalize";

function GroupMember({ member }) {
  return (
    <tr className="members-row">
      <td>{member?.name}</td>
      <td>{member?.contact}</td>
      <td>{capitalize(member?.position)}</td>
    </tr>
  );
}

export default GroupMember;
