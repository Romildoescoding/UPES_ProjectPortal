import React from "react";

function ModalTechSupport({ setShowModal }) {
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
          <div className="full-length-input">
            <b>1. Initiate a Group</b>: The first step is to create or join a
            group. This is essential to access most of the features within the
            app. Once you&apos;re part of a group, you&apos;re ready to explore
            other functionalities.
          </div>
          <div className="full-length-input">
            <b>2. Add Members</b>: If your group or team has less than four
            members, you can easily invite and add more members to ensure your
            team is complete.
          </div>
          <div className="full-length-input">
            <b>3. Upload and Update Project Details</b>: You can upload and
            manage your project details, including submitting project reports
            and other relevant details. This feature allows you to keep all
            information organized and up to date.
          </div>
          <div className="full-length-input">
            <b>4. Request Mentorship</b>: You can request mentorship by
            contacting faculty members via email. Make sure to reach out to the
            appropriate faculty for support with your project.
          </div>
          <div className="full-length-input gap">
            Lastly, if you encounter any issues, errors, or anomalies while
            using the app, please feel free to contact me.
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
              CONNECT WITH ME
            </button>
          </div>
        </div>

        <div className="full-length-input"></div>
      </form>
    </div>
  );
}

export default ModalTechSupport;
