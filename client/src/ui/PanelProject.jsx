import PdfLogo from "../../public/svg/PdfLogo";

function PanelProject({ setShowModal, setProjectForModal, project }) {
  const { group_name, title, technologies } = project;
  return (
    <tr
      onClick={() => {
        setProjectForModal(project);
        setShowModal(true);
      }}
    >
      <td>
        {group_name.length > 25 ? group_name.slice(0, 25) + "..." : group_name}
      </td>
      <td>{title.length > 25 ? title.slice(0, 25) + "..." : title}</td>
      <td>
        {technologies.length > 25
          ? technologies.slice(0, 25) + "..."
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
