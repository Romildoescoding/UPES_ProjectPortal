import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateGrades from "./useUpdateGrades";

function ModalGradeStudentsSm({ setShowModal }) {
  const queryClient = useQueryClient();
  const { mail, type } = queryClient.getQueryData(["selected-student"]);
  const { updateGrades, isPending: isUpdatingGrades } = useUpdateGrades();
  const [grades, setGrades] = useState(0);

  function handleUpdateMarks(e) {
    e.preventDefault();
    if (!grades) return toast.error("Grades must not be empty!");
    updateGrades({ mail, type, grades });
    setGrades(0);
    setShowModal("");
  }

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

        <h3>PROJECT DETAILS</h3>
        <div className="full-length-input">
          <label htmlFor="mail">STUDENT MAIL</label>
          <input
            type="text"
            name="mail"
            id="mail"
            placeholder="STUDENT MAIL"
            value={mail}
            disabled={true}
          />
        </div>
        <div className="full-length-input">
          <label htmlFor="tech">GRADES</label>
          <input
            type="number"
            min={0}
            max={100}
            name="tech"
            id="tech"
            placeholder="ENTER GRADE FROM 0 TO 100"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
          />
        </div>

        <div className="full-length-input">
          <label htmlFor="type">PROJECT TYPE</label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="PROJECT TYPE"
            value={type}
            disabled={true}
          />
        </div>
        <div className="full-length-input">
          <button
            type="submit"
            className="view-report"
            onClick={handleUpdateMarks}
            disabled={isUpdatingGrades}
          >
            {isUpdatingGrades ? "UPDATING GRADES..." : "UPDATE GRADES"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ModalGradeStudentsSm;
