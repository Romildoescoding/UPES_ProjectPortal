import React, { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";
import useCreateEvent from "./useCreateEvent";
import Spinner from "../../ui/Spinner";
import useUpdateEvent from "./useUpdateEvent";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "../authentication/signin/useUser";
import useFacultyBranch from "./useFacultyBranch";

function ModalScheduleEvents({ setShowModal, event = {} }) {
  // event -->  id, name , date, description, type
  const { data: user } = useUser();
  const mail = user?.user?.mail;
  const { data: branchesData, isFetching } = useFacultyBranch({ mail });
  const branches = branchesData?.data;
  console.log(event);
  const queryClient = useQueryClient();
  const isEditing = queryClient.getQueryData(["editing-event"]) || false;
  //add the branch attribute toi the events table
  const { name, startDate, endDate, description, branch, type, id } = event;
  const [filterType, setFilterType] = useState(
    name ? (name === "Mentor Grading" ? "mentor" : "panel") : ""
  );
  const [eventName, setEventName] = useState(name || "");
  const [eventStartDate, setEventStartDate] = useState(startDate || "");
  const [eventEndDate, setEventEndDate] = useState(endDate || "");
  const [eventDescription, setEventDescription] = useState(description || "");
  const [selectedBranch, setSelectedBranch] = useState({ branch, type } || {});
  const { createEvent, isPending } = useCreateEvent();
  const { updateEvent, isPending: isPending2 } = useUpdateEvent();

  const isValidDateRange = (start, end) => {
    return new Date(start) < new Date(end);
  };

  useEffect(() => {
    if (filterType === "mentor" && !eventName) {
      setEventName("Mentor Grading");
    }
  }, [filterType, eventName]);

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log(
      eventStartDate,
      eventEndDate,
      eventName,
      eventDescription,
      selectedBranch.type,
      selectedBranch.branch
    );
    if (
      !eventStartDate ||
      !eventEndDate ||
      !eventName ||
      !eventDescription ||
      !selectedBranch.type ||
      !selectedBranch.branch
    )
      return toast.error("All Fields are required");

    // Check if the start date is less than the end date
    if (!isValidDateRange(eventStartDate, eventEndDate)) {
      return toast.error("Start date must be earlier than End");
    }

    // if (new Date(eventStartDate) < new Date(Date.now())) {
    // return toast.error("You cannot schedule events in the past");
    // }

    createEvent({
      eventName,
      eventStartDate,
      eventEndDate,
      eventDescription,
      eventBranch: selectedBranch.branch,
      eventType: selectedBranch.type,
    });

    setShowModal("");
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    if (
      !eventStartDate ||
      !eventEndDate ||
      !eventName ||
      !eventDescription ||
      !selectedBranch.type ||
      !selectedBranch.branch
    )
      return toast.error("All Fields are required");

    // Check if the start date is less than the end date
    if (!isValidDateRange(eventStartDate, eventEndDate)) {
      return toast.error("Start date must be earlier than End");
    }

    updateEvent({
      eventName,
      eventStartDate,
      eventEndDate,
      eventDescription,
      eventBranch: selectedBranch.branch,
      eventType: selectedBranch.type,
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
          if (isEditing) setShowModal("show-event");
          else setShowModal("");
        }}
      >
        &times;
      </button>
      {filterType && !isEditing && (
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
                queryClient.setQueryData(["editing-event"], false);
                setFilterType("panel");
              }}
            >
              Panel Events
            </div>
            <div
              className="full-length-input view-report"
              onClick={(e) => {
                e.preventDefault();
                queryClient.setQueryData(["editing-event"], false);
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
              <label htmlFor="event-date">Event Start Date:</label>
              <input
                type="date"
                id="event-date"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
              />
            </div>
            <div className="full-length-input">
              <label htmlFor="event-date">Event End Date:</label>
              <input
                type="date"
                id="event-date"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
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

            <div
              className="full-length-input"
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <div className="full-length-input">
                <label htmlFor="branch">Select Branch:</label>
                <select
                  id="branch"
                  value={selectedBranch.branch || branch?.branch}
                  onChange={(e) => {
                    const selected = branches.find(
                      (branch) => branch.branch === e.target.value
                    );
                    setSelectedBranch(selected);
                  }}
                  className="styled-select"
                >
                  {branches?.map((branch, i) => (
                    <option key={i} value={branch.branch}>
                      {branch.branch}
                    </option>
                  ))}
                </select>
              </div>

              <div className="full-length-input">
                <label htmlFor="event-type">Event Type:</label>
                <input
                  className="styled-select"
                  style={{ cursor: "not-allowed", height: "38px" }}
                  type="text"
                  id="event-type"
                  value={selectedBranch?.type || branches?.[0]?.type}
                  disabled={true}
                />
              </div>
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
