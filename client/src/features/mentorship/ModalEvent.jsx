import { useLocation } from "react-router-dom";
import useDeleteEvent from "../events/useDeleteEvent";
import Loader from "../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { getFormattedDate } from "../../helpers/formatDate";

function ModalEvent({ setShowModal, event }) {
  const queryClient = useQueryClient();
  const location = useLocation();

  function handleEdit(e) {
    queryClient.setQueryData(["editing-event"], true);
    setShowModal("edit-event");
  }

  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={() => {
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="import-students-div">
        <h3>Event Details</h3>
        <div className="requests-div assign-panels-div events-modal">
          <div className="project-field">
            <h1>EVENT</h1>
            <h4 className="project-field-h3">{event.name}</h4>
          </div>
          <div className="project-field">
            <h1>START DATE</h1>
            <h4 className="project-field-h3">
              {getFormattedDate(event.startDate)}
            </h4>
          </div>
          <div className="project-field">
            <h1>END DATE</h1>
            <h4 className="project-field-h3">
              {getFormattedDate(event.endDate)}
            </h4>
          </div>
          <div className="project-field">
            <h1>DESCRIPTION</h1>
            <h4
              className="project-field-h3"
              style={{ minWidth: "unset !important" }}
            >
              {event.description}
            </h4>
          </div>
          <div className="project-field">
            <h1>BRANCH</h1>
            <h4 className="project-field-h3">{event.branch}</h4>
          </div>
          <div className="project-field">
            <h1>EVENT TYPE</h1>
            <h4 className="project-field-h3">{event.type}</h4>
          </div>
          {location.pathname === "/activity-coordinator" && (
            <div className="logout-btns">
              <button
                className="logout-cancel"
                onClick={handleEdit}
                style={{ background: "blueviolet", color: "white" }}
              >
                Edit Event
              </button>
              <button
                className="logout-main"
                style={{ background: "blueviolet", color: "white" }}
                onClick={() => {
                  setShowModal("delete-event");
                }}
              >
                Delete Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalEvent;
