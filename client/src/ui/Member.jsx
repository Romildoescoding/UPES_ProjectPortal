import capitalize from "../helpers/capitalize";

function Member({ member }) {
  return (
    <div className="project-field">
      <h1>{capitalize(member.position)}</h1>
      <h4 className="project-field-h3 text-none">{member.name}</h4>
    </div>
  );
}

export default Member;
