import { useState } from "react";
import ModalEvent from "../features/mentorship/ModalEvent";
import Modal from "./Modal";

function Event({ event }) {
  const [showModal, setShowModal] = useState("");

  return (
    <li className="event" onClick={() => setShowModal("show-event")}>
      {showModal === "show-event" && (
        <Modal setShowModal={setShowModal}>
          <ModalEvent setShowModal={setShowModal} event={event} />
        </Modal>
      )}
      <p className="event-name">{event.name}</p>
      <p className="event-date">{event.date}</p>
    </li>
  );
}

// ADD EVENT VIEW MODAL

export default Event;
