import React, { useMemo, useState } from "react";
// import emailjs from "@emailjs/browser";
import useGroup from "./useGroup";
import validateEmail from "../../helpers/emailValidate";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateMembers from "./useMembers";
import EmptyComponent from "../../ui/EmptyComponent";
import useProject from "./useProject";

function ModalUploadProject({ setShowModal }) {
  const queryClient = useQueryClient();
  const groupData = queryClient.getQueryData(["team"]);

  //   const inGroup = queryClient.getQueryData(["team"]);
  //   const { initializeGroup, isLoading } = useGroup();
  //   const { updateMembers, isLoading: isLoading2 } = useUpdateMembers();
  //   let isLoading = false;
  const { uploadProject, isLoading } = useProject();
  const [title, setTitle] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [report, setReport] = useState("");
  // const [sapmember1, setsapMember1] = useState("");
  // const [emailmember1, setEmailmember1] = useState("");

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

  return (
    <div className="add-students">
      <form className="add-students-form" onSubmit={handleSubmit}>
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>

        <h3>PROJECT DETAILS</h3>
        <div className="centered-input">
          <label htmlFor="title">PROJECT TITLE</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="PROJECT TITLE"
            value={title}
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
            value={technologies}
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
            onChange={(e) => setReport(e.target.files[0])}
          />
          <label htmlFor="report" className="custom-label">
            SELECT REPORT
          </label>
        </div>
        <button type="submit" className="btn-colored" disabled={isLoading}>
          {isLoading ? "UPL0ADING DETAILS..." : "UPL0AD DETAILS"}
        </button>
      </form>
    </div>
  );
}

export default ModalUploadProject;
