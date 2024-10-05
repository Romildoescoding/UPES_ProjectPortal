import PdfLogo from "../../public/svg/PdfLogo";

//HERE PROJECT === REQUEST
function ActivityRequest({ setShowModal, setProjectForModal, request }) {
  console.log(request);
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
        {/* <table className="members-table">
          <thead>
            <tr className="ac-members-row color-gray">
              <th>Name</th>
              <th>Contact</th>
              <th>Marks Awarded</th>
            </tr>
          </thead>
          <tbody>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default ActivityRequest;
