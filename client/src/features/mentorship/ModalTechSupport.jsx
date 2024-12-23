import React from "react";
import { useLocation } from "react-router-dom";

function ModalTechSupport({ setShowModal }) {
  const location = useLocation();
  const urlLocation = location.pathname;
  return (
    <div className="add-students">
      <form className="add-students-form tech-support">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>

        <h3>TECHNICAL SUPPORT</h3>
        <div className="full-length-input tech-content gap">
          Welcome to the technical support section. Here&apos;s a quick guide on
          how to navigate and use the main features of the app:
          {urlLocation === "/student" && (
            <>
              <div className="full-length-input">
                <b>1. Initiate a Group</b>: The first step is to create or join
                a group. This is essential to access most of the features within
                the app. Once you&apos;re part of a group, you&apos;re ready to
                explore other functionalities.
              </div>
              <div className="full-length-input">
                <b>2. Add Members</b>: If your group or team has less than four
                members, you can easily invite and add more members to ensure
                your team is complete.
              </div>
              <div className="full-length-input">
                <b>3. Upload and Update Project Details</b>: You can upload and
                manage your project details, including submitting project
                reports and other relevant details. This feature allows you to
                keep all information organized and up to date.
              </div>
              <div className="full-length-input">
                <b>4. Request Mentorship</b>: You can request mentorship by
                contacting faculty members via email. Make sure to reach out to
                the appropriate faculty for support with your project.
              </div>
            </>
          )}
          {urlLocation === "/faculty" && (
            <>
              <div className="full-length-input">
                <b>1. Grade Students</b>: Evaluate and assign grades to students
                for the respective projects. You can access the grading features
                for the all the groups under your supervision.
              </div>
              <div className="full-length-input">
                <b>2. Accept or Reject Mentorship Requests</b>: Review
                mentorship requests from students or groups and either accept or
                reject them based on availability and the scope of the project.
              </div>
              <div className="full-length-input">
                <b>3. View Mentee Groups</b>: View all the groups or students
                who have been assigned to you as a mentor. You can keep track of
                their progress and manage further communications.
              </div>
              <div className="full-length-input">
                <b>4. Filter Mentee Groups</b>: View and filter all the groups
                or students who have been assigned to you as a mentor via the
                Expand button.
              </div>
            </>
          )}
          {urlLocation === "/activity-coordinator" && (
            <>
              <div className="full-length-input">
                <b>1. Assign Panel Members to Groups</b>: Assign panel members
                to all the groups for evaluation purposes. This allows the
                panels to supervise and grade their assigned groups.
              </div>
              <div className="full-length-input">
                <b>2. Update Panel Members</b>: You can modify the assigned
                panel members for any group. This feature allows you to ensure
                the correct faculty are assigned to the appropriate groups and
                also update the panels for different events.
              </div>
              <div className="full-length-input">
                <b>3. Schedule Events</b>: Schedule events for panels and
                mentors to evaluate projects, as well as for students to present
                or report on their projects. This keeps all participants
                informed about the evaluation timeline.
              </div>
              <div className="full-length-input">
                <b>4. Edit or Delete Events</b>: Manage the event calendar by
                editing or deleting events from the calendar panel. This ensures
                that only relevant and updated events are visible to
                participants.
              </div>
              <div className="full-length-input">
                <b>5. Toggle Marks Visibility</b>: Control the visibility of
                grades for students. You can allow or restrict student access to
                their grades, giving you control over when grades are released.
              </div>
            </>
          )}
          {urlLocation === "/panel-members" && (
            <>
              <div className="full-length-input">
                <b>1. View Assigned Groups</b>: Panel members can access all the
                groups assigned to them for evaluation purposes. This ensures
                that panel members are fully aware of their responsibilities and
                the groups under their supervision. You can also access the
                filtering feature via the Expand button.
              </div>
              <div className="full-length-input">
                <b>2. Grade Students</b>: Panel members can assign grades to
                students in their assigned groups based on various events
                scheduled by the Activity Coordinator, such as synopsis or
                mid-sem presentations. They can also filter projects by type
                (e.g., Major or Minor), allowing for a more organized and
                efficient grading process.
              </div>

              <div className="full-length-input">
                <b>3. Access Scheduled Events</b>: Panel members can view all
                scheduled events related to their assigned groups, ensuring they
                are informed of key dates such as presentations or evaluation
                sessions.
              </div>
            </>
          )}
          <div className="full-length-input gap">
            Lastly, if you encounter any issues, errors, or anomalies while
            using the app, please do not hesitate to reach out. Your feedback is
            invaluable, and I will ensure that any concerns are addressed
            promptly. :&#41;
            <button
              className="view-report"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://mail.google.com/mail/?view=cm&fs=1&to=romil4business@gmail.com&su=Subject%20Here&body=Message%20body%20here",
                  "_blank"
                );
              }}
            >
              Romildoescoding
            </button>
          </div>
        </div>

        <div className="full-length-input"></div>
      </form>
    </div>
  );
}

export default ModalTechSupport;
