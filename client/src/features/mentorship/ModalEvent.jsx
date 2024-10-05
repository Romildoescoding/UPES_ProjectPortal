import { useLocation } from "react-router-dom";
import useDeleteEvent from "../events/useDeleteEvent";
import Loader from "../../ui/Loader";

function ModalEvent({ setShowModal, event }) {
  const location = useLocation();
  const { deleteEvent, isPending } = useDeleteEvent();
  function handleDelete() {
    deleteEvent({ eventName: event.name });
  }
  function handleEdit() {}

  if (isPending) return <Loader />;
  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={() => {
          console.log("CLICKED");
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
            <h1>DATE</h1>
            <h4 className="project-field-h3">{event.date}</h4>
          </div>
          <div className="project-field">
            <h1>DESCRIPTION</h1>
            <h4 className="project-field-h3">{event.description}</h4>
          </div>
          <div className="project-field">
            <h1>EVENT TYPE</h1>
            <h4 className="project-field-h3">{event.type}</h4>
          </div>
          {location.pathname === "/activity-coordinator" && (
            <div className="logout-btns">
              {/* <button
                className="logout-cancel"
                onClick={() => {
                  handleEdit();
                  setShowModal("");
                }}
              >
                Edit
              </button> */}
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
