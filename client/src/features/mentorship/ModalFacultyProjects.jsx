import PdfLogo from "../../../public/svg/PdfLogo";
import { docServiceURL } from "../../helpers/backendApi";
import Member from "../../ui/Member";
import Spinner from "../../ui/Spinner";
import useProjectMembers from "./useProjectMembers";

function ModalFacultyProjects({ setShowModal, projectForModal }) {
  const { data, isLoading, isPending, isFetching } = useProjectMembers({
    group_name: projectForModal.group_name,
  });
  const group = data?.data;
  console.log(group);
  return (
    <div className="add-students">
      <div className="projects-div-faculty">
        <button
          className="btn-close-import"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        <h1 className="project-field-heading">GROUP DETAILS</h1>
        <div className="project-field">
          <h1>Group name</h1>
          <h3>{projectForModal?.group_name}</h3>
        </div>

        <div className="project-field">
          <h1>Project Title</h1>
          <h3>{projectForModal?.title}</h3>
        </div>

        <div className="project-field">
          <h1>Technologies</h1>
          <h3 className="tech-project-h3">{projectForModal?.technologies}</h3>
        </div>

        <div className="project-field">
          <h1>REPORT</h1>
          {projectForModal?.report ? (
            <h3
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
            </h3>
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
