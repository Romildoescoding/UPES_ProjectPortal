import capitalize from "../helpers/capitalize";

function Member({ member }) {
  return (
    <div className="project-field">
      <h1>{capitalize(member.position)}</h1>
      <h3 className="tech-project-h3">{member.name}</h3>
    </div>
  );
}

export default Member;
