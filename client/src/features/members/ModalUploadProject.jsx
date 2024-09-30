import React, { useEffect, useMemo, useState } from "react";
// import emailjs from "@emailjs/browser";
import useGroup from "./useGroup";
import validateEmail from "../../helpers/emailValidate";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateMembers from "./useMembers";
import EmptyComponent from "../../ui/EmptyComponent";
import useProject from "./useProject";
import { useUser } from "../authentication/signin/useUser";
import useTeamInformation from "./useTeamInformation";
import useProjectByGroup from "./useProjectByGroup";
import { docServiceURL } from "../../helpers/backendApi";
import useProjectUpdate from "./useProjectUpdate";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";

function ModalUploadProject({ setShowModal }) {
  const queryClient = useQueryClient();
  const groupData = queryClient.getQueryData(["team"]);
  const { project, isPending: isPending3 } = useProjectByGroup({
    group_name: groupData?.group?.group_name,
  });

  const { uploadProject, isPending: isPendingProjectUpload } = useProject();
  const { updateProject, isPending: isPendingProjectUpdate } =
    useProjectUpdate();
  const [title, setTitle] = useState(project?.data[0]?.title || ""); // Ensure controlled input
  const [technologies, setTechnologies] = useState(
    project?.data[0]?.technologies || ""
  );

  useEffect(() => {
    setTitle(project?.data[0]?.title || ""); // Default to empty string
    setTechnologies(project?.data[0]?.technologies || ""); // Default to empty string
  }, [project?.data]);
  const [report, setReport] = useState("");

  const { data, isPending } = useUser();
  const user = data?.user;

  const { data: team, isPending: isPending2 } = useTeamInformation({ user });

  function handleSubmit(e) {
    e.preventDefault();

    // Create FormData object to hold the file and other form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tech", technologies);
    formData.append("report", report); // Append the file itself
    formData.append("group", groupData?.group?.group_name);

    // Call the uploadProject function with FormData
    uploadProject(formData);

    setShowModal("");
    setTechnologies("");
    setTitle("");
    setReport(null);
  }

  function handleUpdate(e) {
    e.preventDefault();

    if (!report) {
      toast.error("Report is required");
      return;
    }

    // Create FormData object to hold the file and other form data
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tech", technologies);
    formData.append("report", report); // Append the file itself
    formData.append("group", groupData?.group?.group_name);

    // Call the uploadProject function with FormData
    console.log(title, technologies, groupData?.group?.group_name, report);
    updateProject({ formData, oldFilePath: project?.data[0]?.report });

    setShowModal("");
    setTechnologies("");
    setTitle("");
    setReport(null);
  }

  if (isPending || isPending2 || isPending3) return <Spinner />;

  return (
    <div className="add-students">
      <form className="add-students-form">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>

        {!team?.data?.length ? (
          <EmptyComponent msg={"❗Initialize a Group First❗"} size={32} />
        ) : (
          <>
            <h3>PROJECT DETAILS</h3>
            <div className="centered-input">
              <label htmlFor="title">PROJECT TITLE</label>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="PROJECT TITLE"
                value={title || ""}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="centered-input">
              <label htmlFor="tech">TECHNOLOGIES USED</label>
              <input
                type="text"
                name="tech"
                id="tech"
                placeholder="TECHNOLOGIES USED (separate by comma , )"
                value={technologies || ""}
                onChange={(e) => setTechnologies(e.target.value)}
              />
            </div>
            <div className="centered-input ">
              <input
                type="file"
                name="report"
                id="report"
                className="hidden-input"
                placeholder="REPORT"
                onChange={(e) => setReport(e.target.files[0] || null)}
              />
              <label htmlFor="report" className="custom-label">
                SELECT REPORT
              </label>
              {report && (
                <div className="selected-report-name">{report.name}</div>
              )}
            </div>
            <div className="centered-input">
              <button
                style={{
                  cursor: !project?.data[0]?.report ? "not-allowed" : "pointer",
                }}
                disabled={!project?.data[0]?.report}
                onClick={() =>
                  window.open(`${docServiceURL}${project?.data[0]?.report}`)
                }
                className="view-report"
              >
                VIEW PREVIOUS REPORT
              </button>
            </div>
            <div className="btn-div">
              {project?.data.length !== 0 && (
                <button
                  type="submit"
                  className="btn-colored"
                  onClick={handleUpdate}
                  disabled={isPendingProjectUpdate || !project?.data.length}
                  style={{
                    cursor: !project?.data.length ? "not-allowed" : "pointer",
                  }}
                >
                  {isPendingProjectUpdate
                    ? "UPDATE DETAILS..."
                    : "UPDATE DETAILS"}
                </button>
              )}
              <button
                type="submit"
                className="btn-colored"
                onClick={handleSubmit}
                disabled={isPendingProjectUpload || project?.data.length}
                style={{
                  cursor: project?.data.length ? "not-allowed" : "pointer",
                }}
              >
                {isPendingProjectUpload
                  ? "UPL0ADING DETAILS..."
                  : "UPL0AD DETAILS"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalUploadProject;
