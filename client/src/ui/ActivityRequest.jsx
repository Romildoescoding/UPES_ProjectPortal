import PdfLogo from "../../public/svg/PdfLogo";

//HERE PROJECT === REQUEST
function ActivityRequest({ setShowModal, setProjectForModal, request }) {
  const { group_name, title, technologies, report } = request;
  return (
    <div
      className="ac-request"
      onClick={() => {
        setProjectForModal(request);
        setShowModal("faculty-project-details");
      }}
    >
      <span className="ac-marks-heading">{group_name}</span>
      <div className="members-container overflow-hidden gap">
        <p className="ellipsis">Project Title: {title}</p>
        <p className="ellipsis">Technologies: {technologies}</p>
        <p className="ellipsis">
          Report: <PdfLogo />
        </p>
      </div>
    </div>
  );
}

export default ActivityRequest;
