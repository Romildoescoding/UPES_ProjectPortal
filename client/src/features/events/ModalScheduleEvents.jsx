import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import useCreateEvent from "./useCreateEvent";
import Spinner from "../../ui/Spinner";
import useUpdateEvent from "./useUpdateEvent";

function ModalScheduleEvents({ setShowModal, event = {} }) {
  // event -->  id, name , date, description, type
  console.log(event);
  const { name, date, description, type, id } = event;
  const [filterType, setFilterType] = useState("");
  const [eventName, setEventName] = useState(name || "");
  const [eventDate, setEventDate] = useState(date || "");
  const [eventDescription, setEventDescription] = useState(description || "");
  const [eventType, setEventType] = useState(type || "Minor-I");
  const { createEvent, isPending } = useCreateEvent();
  const { updateEvent, isPending: isPending2 } = useUpdateEvent();

  useEffect(() => {
    if (filterType === "mentor" && !eventName) {
      setEventName("Mentor Grading");
    }
  }, [filterType, eventName]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (!eventDate || !eventName || !eventDescription || !eventType)
      return toast.error("All Fields are required");

    createEvent({
      eventName,
      eventDate,
      eventDescription,
      eventType,
    });

    setShowModal("");
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    if (!eventDate || !eventName || !eventDescription || !eventType)
      return toast.error("All Fields are required");

    updateEvent({
      eventName,
      eventDate,
      eventDescription,
      eventType,
      eventId: id,
    });

    setShowModal("");
  };

  if (isPending || isPending2) return <Spinner />;

  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      {filterType && (
        <button
          className="btn-back"
          onClick={(e) => {
            e.preventDefault();
            setEventName("");
            setFilterType("");
          }}
        >
          &larr;
        </button>
      )}
      <form className="add-students-form">
        <h3>{name ? "Edit Event" : "Schedule Event"}</h3>
        {!filterType && (
          <>
            <div
              style={{
                maxWidth: "350px",
                padding: "5px",
                color: "blueviolet",
                border: "2px solid blueviolet",
                fontSize: "12px",
                borderRadius: "5px",
              }}
            >
              Note:{" "}
              {`"Panel Events" are those where panel members are required to evaluate students, while "Mentor Events" refer to evaluations conducted by mentors.`}
            </div>
            <div
              className="full-length-input view-report"
              onClick={(e) => {
                e.preventDefault();
                setFilterType("panel");
              }}
            >
              Panel Events
            </div>
            <div
              className="full-length-input view-report"
              onClick={(e) => {
                e.preventDefault();
                setFilterType("mentor");
              }}
            >
              Mentor Events
            </div>
          </>
        )}
        {filterType && (
          <>
            <div className="full-length-input">
              <label htmlFor="event-name">Event Name:</label>
              <input
                type="text"
                id="event-name"
                value={eventName}
                disabled={filterType === "mentor"}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="full-length-input">
              <label htmlFor="event-date">Event Date:</label>
              <input
                type="date"
                id="event-date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
            </div>

            <div className="full-length-input">
              <label htmlFor="event-description">Event Description:</label>
              <textarea
                className="full-length-input txt-area"
                id="event-description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                rows="4"
              />
            </div>

            <div className="full-length-input">
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
          </>
        )}

        {!filterType ? (
          <></>
        ) : name ? (
          <button
            type="submit"
            onClick={handleUpdateEvent}
            className="view-report"
          >
            Update
          </button>
        ) : (
          <button
            type="submit"
            onClick={handleSubmitEvent}
            className="view-report"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default ModalScheduleEvents;
