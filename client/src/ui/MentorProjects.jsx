function MentorProjects({
  project,
  setShowModal,
  setProjectForModal,
  setNavigateBack,
}) {
  function handleClick() {
    setProjectForModal(project);
    setNavigateBack(false);
    setShowModal("faculty-project-details");
  }

  const { group_name, title, technologies } = project;
  return (
    <tr className="mentor-projects-tr" onClick={handleClick}>
      <td>
        {group_name?.length > 40 ? group_name.slice(0, 40) + "..." : group_name}
      </td>
      <td>{title?.length > 40 ? title.slice(0, 40) + "..." : title}</td>
      <td>
        {technologies?.length > 40
          ? technologies.slice(0, 40) + "..."
          : technologies}
      </td>
    </tr>
  );
}

export default MentorProjects;
