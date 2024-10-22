import { useLocation } from "react-router-dom";
import useDeleteEvent from "../events/useDeleteEvent";
import Loader from "../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";

function ModalEvent({ setShowModal, event }) {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { deleteEvent, isPending } = useDeleteEvent();
  function handleDelete() {
    deleteEvent({ eventId: event.id });
  }
  function handleEdit(e) {
    queryClient.setQueryData(["editing-event"], true);
    setShowModal("edit-event");
  }

  if (isPending) return <Loader />;
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
            <h4 className="project-field-h3">{event.startDate}</h4>
          </div>
          <div className="project-field">
            <h1>END DATE</h1>
            <h4 className="project-field-h3">{event.endDate}</h4>
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
            <h1>EVENT TYPE</h1>
            <h4 className="project-field-h3">{event.type}</h4>
          </div>
          {location.pathname === "/activity-coordinator" && (
            <div className="logout-btns">
              <button className="logout-cancel" onClick={handleEdit}>
                Edit
              </button>
              <button
                className="logout-main"
                onClick={() => {
                  handleDelete();
                  setShowModal("");
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ModalEvent;
