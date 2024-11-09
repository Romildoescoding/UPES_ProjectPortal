import "../../styles/select-role.css";
import useDeleteEvent from "./useDeleteEvent";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import TrashCan from "../../../public/svg/TrashCan";

function ModalConfirmDelete({ setShowModal, event }) {
  const queryClient = useQueryClient();
  const { deleteEvent, isPending } = useDeleteEvent();
  function handleDelete() {
    deleteEvent({ eventId: event.id });
  }

  if (isPending) return <Spinner />;

  return (
    <div className="select-role">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="role-ques">
        <p
          style={{
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <TrashCan />
          Deleting Event
          <span className="logout-svg"></span>
        </p>
        <p
          className="logout-ques"
          style={{ borderTop: "1px solid #999", paddingTop: "10px" }}
        >
          Event Name: {event.name}
        </p>
        <p
          className="logout-ques"
          style={{
            borderBottom: "1px solid #999",

            paddingBottom: "10px",
          }}
        >
          Event Type: {event.type}
        </p>
        <p className="logout-ques">
          Are you sure you want to delete this event?
        </p>
      </div>
      <div className="logout-btns">
        <button
          className="logout-cancel"
          onClick={() => setShowModal("show-event")}
        >
          Cancel
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
    </div>
  );
}

export default ModalConfirmDelete;
