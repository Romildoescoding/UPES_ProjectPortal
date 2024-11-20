import { useSearchParams } from "react-router-dom";
import Checkbox from "./Checkbox";
import Pill from "./Pill";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useProjectByGroup from "../features/members/useProjectByGroup";
import { useUser } from "../features/authentication/signin/useUser";
import useTeamInformation from "../features/members/useTeamInformation";
import Spinner from "./Spinner";
import useProjectByUser from "../features/members/useProjectByUser";
import Loader from "./Loader";
import { docServiceURL } from "../helpers/backendApi";
import EmptyComponent from "./EmptyComponent";

function ProjectDetails() {
  const { data, isPending } = useUser();
  const user = data.user.mail;
  const { project, isFetching, isLoading } = useProjectByUser({
    name: user,
  });
  console.log(project);
  const {
    title,
    group_name,
    panel_member1,
    panel_member2,
    mentor,
    is_mentor_accepted,
    report,
  } = project?.data?.[0] || {};
  if (isLoading || isPending) return <Spinner />;
  return (
    <div className="stu-project">
      <p className="dashboard-heading">Project Details</p>
      <div className="stu-project-details">
        {!title ? (
          <span style={{ color: "black !important" }}>
            <EmptyComponent
              msg={"❗No project data. Upload Project Details❗"}
              isTable={false}
              isAbsolute={true}
              isMarks={true}
            />
          </span>
        ) : (
          <>
            <div className="stu-project-left">
              <p className="project-field-stu">
                <span className="project-heading">Title:</span>
                <span>{title}</span>
              </p>
              <p className="project-field-stu">
                <span className="project-heading">Group:</span>
                <span>{group_name}</span>
              </p>
              <p className="project-field-stu">
                <span className="project-heading">Mentor:</span>
                <span>{(is_mentor_accepted && mentor) || "N/A"}</span>
              </p>
            </div>
            <div className="stu-project-right">
              <p className="project-field-stu">
                <span className="project-heading">Panelist1:</span>
                <span>{panel_member1 || "N/A"}</span>
              </p>
              <p className="project-field-stu">
                <span className="project-heading">Panelist2:</span>
                <span>{panel_member2 || "N/A"}</span>
              </p>
              {report ? (
                <button
                  style={{
                    cursor: !project?.data?.[0]?.report
                      ? "not-allowed"
                      : "pointer",
                  }}
                  disabled={!project?.data?.[0]?.report}
                  onClick={() =>
                    window.open(`${docServiceURL}${project?.data?.[0]?.report}`)
                  }
                  className="view-report project-details-report"
                >
                  VIEW UPLOADED REPORT
                </button>
              ) : (
                <button
                  style={{
                    cursor: !project?.data?.[0]?.report
                      ? "not-allowed"
                      : "pointer",
                  }}
                  disabled={!project?.data?.[0]?.report}
                  className="view-report danger-note bg-light project-details-report"
                >
                  NO REPORT UPLOADED YET
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProjectDetails;
