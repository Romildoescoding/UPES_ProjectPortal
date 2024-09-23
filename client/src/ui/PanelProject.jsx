import PdfLogo from "../../public/svg/PdfLogo";

function PanelProject({ setShowModal, setProjectForModal, project }) {
  console.log(project);
  const { group_name, title, technologies } = project;
  return (
    <tr
      onClick={() => {
        setProjectForModal(project);
        setShowModal(true);
      }}
    >
      <td>
        {group_name.length > 40 ? group_name.slice(0, 40) + "..." : group_name}
      </td>
      <td>{title.length > 40 ? title.slice(0, 40) + "..." : title}</td>
      <td>
        {technologies.length > 40
          ? technologies.slice(0, 40) + "..."
          : technologies}
      </td>
      <td
        onClick={() => {
          setShowModal(project?.report);
        }}
        className="report"
      >
        <PdfLogo />
      </td>
    </tr>
  );
}

export default PanelProject;
