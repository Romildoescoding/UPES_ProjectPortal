import PdfLogo from "../../../public/svg/PdfLogo";
import { docServiceURL } from "../../helpers/backendApi";
import capitalize from "../../helpers/capitalize";
import Member from "../../ui/Member";
import Spinner from "../../ui/Spinner";
import useProjectMembers from "./useProjectMembers";

function ModalFacultyProjects({
  showModal,
  setShowModal,
  projectForModal,
  navigateBack,
}) {
  const { data, isFetching } = useProjectMembers({
    group_name: projectForModal.group_name,
  });
  const group = data?.data;
  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          console.log(showModal);
          setShowModal(navigateBack ? "stu-projects-modal" : "");
        }}
      >
        &times;
      </button>
      <div className="add-students-form modal-group-details">
        <h3 className="">GROUP DETAILS</h3>

        <div className="project-field">
          <h1>GROUP NAME</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.group_name}
          </h4>
        </div>

        <div className="project-field">
          <h1>PROJECT TITLE</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.title}
          </h4>
        </div>

        <div className="project-field">
          <h1>TECHNOLOGIES</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.technologies}
          </h4>
        </div>

        <div className="project-field">
          <h1>MENTOR</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.is_mentor_accepted
              ? projectForModal?.mentor
              : "N/A"}
          </h4>
        </div>

        <div className="project-field">
          <h1>PANELIST 1</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.panel_member1 || "N/A"}
          </h4>
        </div>

        <div className="project-field">
          <h1>PANELIST 2</h1>
          <h4 className="project-field-h3 text-none">
            {projectForModal?.panel_member2 || "N/A"}
          </h4>
        </div>

        <div className="project-field">
          <h1>REPORT</h1>
          {projectForModal?.report ? (
            <span
              className="view-report"
              onClick={() => {
                // Open the fileURL in a new tab
                // const fileURL = projectForModal?.report; Assuming the file URL is stored here
                const fileURL = `${docServiceURL}${projectForModal?.report}`;
                if (fileURL) {
                  window.open(fileURL, "_blank"); // Open in new tab
                } else {
                  console.log("No report available");
                }
              }}
            >
              <span>Click here to view</span>
              <PdfLogo />
            </span>
          ) : (
            <span className=" view-report danger-note">
              No Report Uploaded Yet.
            </span>
          )}
          {/* <h3>{projectForModal?.report}</h3> */}
        </div>

        {isFetching || !group?.length ? (
          <Spinner isNotAbsolute={true} isBlack={true} />
        ) : (
          group?.map((member, i) => <Member key={i} member={member} />)
        )}
      </div>
    </div>
  );
}

export default ModalFacultyProjects;
