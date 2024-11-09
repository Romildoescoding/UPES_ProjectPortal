import { useState } from "react";
import ModalEvent from "../features/mentorship/ModalEvent";
import Modal from "./Modal";
import ModalScheduleEvents from "../features/events/ModalScheduleEvents";
import ModalConfirmDelete from "../features/events/ModalConfirmDelete";

function Event({ event }) {
  const [showModal, setShowModal] = useState("");

  return (
    <>
      {showModal === "edit-event" && (
        <Modal setShowModal={setShowModal}>
          <ModalScheduleEvents setShowModal={setShowModal} event={event} />
        </Modal>
      )}

      {showModal === "show-event" && (
        <Modal setShowModal={setShowModal}>
          <ModalEvent setShowModal={setShowModal} event={event} />
        </Modal>
      )}

      {showModal === "delete-event" && (
        <Modal setShowModal={setShowModal}>
          <ModalConfirmDelete setShowModal={setShowModal} event={event} />
        </Modal>
      )}
      <li className="event" onClick={() => setShowModal("show-event")}>
        <p className="event-name">{event.name}</p>
        <p className="event-date">
          <span>{event.startDate}</span>
          <span>{event.endDate}</span>
        </p>
      </li>
    </>
  );
}

export default Event;
