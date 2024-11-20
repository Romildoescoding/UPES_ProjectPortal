import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useUpdateGrades from "./useUpdateGrades";
import { useEvents } from "../events/useEvents";
import Spinner from "../../ui/Spinner";

function ModalGradeStudentsSm({ setShowModal }) {
  const queryClient = useQueryClient();
  const {
    mail,
    type,
    event = {},
  } = queryClient.getQueryData(["selected-student"]);
  const { updateGrades, isPending: isUpdatingGrades } = useUpdateGrades();
  const { data: events, isFetching } = useEvents();
  const mentorEvent = events?.data.find(
    (event) => event?.name === "Mentor Grading" && event?.type === type
  );
  console.log(mentorEvent);

  //THE OPTION TO SET THE MENTOR GRADING PRCOCESS IS BY SCHEUDLING GIVE AC THE OPTION TO SCHEUDLE EVENT OF MENOTR GRADING
  const isMentorGrading = queryClient.getQueryData(["is-mentor-grading"]);
  const [grades, setGrades] = useState(0);

  function handleUpdateMarks(e) {
    e.preventDefault();
    console.log({
      mail,
      type,
      grades,
      eventId: mentorEvent,
      eventId2: event.id,
    });
    if (!grades) return toast.error("Grades must not be empty!");
    if (isMentorGrading)
      updateGrades({ mail, type, grades, eventId: mentorEvent.id });
    else updateGrades({ mail, type, grades, eventId: event.id });
    setGrades(0);
    setShowModal(isMentorGrading ? "grade-students-mentor" : "grade-students");
  }

  if (isFetching) return <Spinner />;

  return (
    <div className="add-students">
      <form className="add-students-form">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>

        <button
          className="btn-back"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(
              isMentorGrading ? "grade-students-mentor" : "grade-students"
            );
          }}
        >
          &larr;
        </button>

        <h3>GRADE STUDENT</h3>
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
          <label htmlFor="type">EVENT NAME</label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="PROJECT TYPE"
            value={isMentorGrading ? mentorEvent?.name : event?.name}
            disabled={true}
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
