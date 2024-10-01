import React, { useState } from "react";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import useCreateEvent from "./useCreateEvent";

function ModalScheduleEvents({ setShowModal }) {
  // State for form inputs
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("Minor-I"); // New state for select input
  const { createEvent, isPending } = useCreateEvent();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!eventDate || !eventName || !eventDescription || !eventType)
      return toast.error("All Fields are required");

    console.log({
      eventName,
      eventDate,
      eventDescription,
      eventType,
    });

    createEvent({
      eventName,
      eventDate,
      eventDescription,
      eventType,
    });

    setShowModal("");
  };

  if (isPending) return <Loader />;

  return (
    <div className="add-students">
      <div className="import-students-div">
        <button
          className="btn-close-import"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>

        <form onSubmit={handleSubmit} className="event-form">
          <h1 className="heading-modal">Schedule Events</h1>
          <div className="form-group">
            <label htmlFor="event-name">Event Name:</label>
            <input
              type="text"
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-date">Event Date:</label>
            <input
              type="date"
              id="event-date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-description">Event Description:</label>
            <textarea
              className="full-length-input txt-area"
              id="event-description"
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              rows="4"
            />
          </div>

          <div className="form-group">
            <label htmlFor="event-type">Event Type:</label>
            <select
              id="event-type"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="styled-select"
            >
              <option value="Minor-I">Minor-I</option>
              <option value="Minor-II">Minor-II</option>
              <option value="Major-I">Major-I</option>
              <option value="Major-II">Major-II</option>
            </select>
          </div>

          <button type="submit" className="view-report">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalScheduleEvents;
