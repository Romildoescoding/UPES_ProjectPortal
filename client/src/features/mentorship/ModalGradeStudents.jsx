import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "../authentication/signin/useUser";
import usePanelGroups from "./usePanelGroups";
import Loader from "../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useEvents } from "../events/useEvents";

function ModalGradeStudents({ setShowModal }) {
  const { data, isPending } = useUser();
  const queryClient = useQueryClient();
  const user = data?.user;
  const { data: groups, isFetching } = usePanelGroups({
    panel: user.name,
  });

  console.log("MODAL-GRADE-STUDENTS");
  let {
    data: events,
    isLoading,
    isFetching: isFetching2,
    isError,
  } = useEvents();

  // events.data = events.data.filter((event) => event.name === "Mentor Grading");

  // console.log(panelEvents);

  const filterOptions = queryClient.getQueryData(["filter-options"]);

  const filterType1 = filterOptions?.filterType || "";
  const event1 = filterOptions?.event || "";
  console.log(filterType1, event1);
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [event, setEvent] = useState(event1);

  const [mail, setMail] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filterType, setFilterType] = useState(filterType1); // New state for filtering type

  // Memoized panel groups to avoid recalculation on each render
  const panelGroups = useMemo(() => {
    if (!groups?.data) return [];

    return groups.data.flatMap((group) => {
      const members = [
        group.leader ? { mail: group.leader, type: group.type } : null, // Leader
        group.member1 ? { mail: group.member1, type: group.type } : null, // Member 1
        group.member2 ? { mail: group.member2, type: group.type } : null, // Member 2
        group.member3 ? { mail: group.member3, type: group.type } : null, // Member 3
      ];

      // Filter out any null entries (in case any members are null)
      return members.filter((member) => member !== null);
    });
  }, [groups?.data]); // Only recalculate when groups.data changes

  // Update filteredGroups based on mail input and project type filter
  useEffect(() => {
    // Split mail input into individual words (case insensitive)
    const searchWords = mail.trim().toLowerCase().split(/\s+/);

    let filtered = panelGroups.filter((group) =>
      // Check if every word in searchWords exists in the group mail
      searchWords.every((word) => group.mail.toLowerCase().includes(word))
    );

    // Apply additional filtering based on the selected project type (Minor or Major)
    if (filterType === "Minor") {
      filtered = filtered.filter(
        (group) => group.type === "Minor-I" || group.type === "Minor-II"
      );
    } else if (filterType === "Major") {
      filtered = filtered.filter(
        (group) => group.type === "Major-I" || group.type === "Major-II"
      );
    }

    setFilteredGroups(filtered);
  }, [mail, panelGroups, filterType]);

  // Filter for Minor types
  // Correct way to filter and set filteredEvents without affecting original events
  function filterMinor(e) {
    e.preventDefault();
    setFilteredEvents((prevEvents) => ({
      ...prevEvents, // Spread the previous events object
      data: prevEvents.data.filter(
        (e) =>
          (e.type === "Minor-I" || e.type === "Minor-II") &&
          e.name !== "Mentor Grading"
      ),
    }));
    setFilterType("Minor"); // Set the filter type to "Minor"
  }

  // Filter for Major types
  function filterMajor(e) {
    e.preventDefault();
    setFilteredEvents((prevEvents) => ({
      ...prevEvents, // Spread the previous events object
      data: prevEvents.data.filter(
        (e) =>
          (e.type === "Major-I" || e.type === "Major-II") &&
          e.name !== "Mentor Grading"
      ),
    }));
    setFilterType("Major"); // Set the filter type to "Major"
  }

  useEffect(() => {
    setFilteredEvents((prevEvents) => ({
      ...prevEvents,
      data: prevEvents?.data?.filter(
        (e) => e.name !== "Mentor Grading" && e.type.slice(0, 5) === filterType
      ),
    }));
  }, [filterType, setFilteredEvents]);

  function handleBackNavigation() {
    if (!event && filterType) setFilterType("");
    else if (event && filterType) setEvent("");
  }

  useEffect(() => {
    console.log(filterType, events.data.length);
    if (filterType === "")
      setFilteredEvents(() => {
        console.log(events);
        return events;
      });
  }, [events, filterType]);

  if (isFetching) return <Spinner />;

  return (
    <div className="add-students">
      <form className="add-students-form">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            queryClient.setQueryData(["filter-options"], {});
            setShowModal(false);
          }}
        >
          &times;
        </button>

        {filterType && (
          <button
            className="btn-back"
            onClick={(e) => {
              e.preventDefault();
              handleBackNavigation();
            }}
          >
            &larr;
          </button>
        )}

        <h3>GRADE STUDENTS</h3>

        {/* Buttons for filtering Minor and Major */}

        {!event && !filterType && (
          <>
            <div className="full-length-input gap border-top">
              <h4>CHOOSE PROJECT TYPE</h4>
              <div className="full-length-input  flex-gap-15">
                <button className="view-report" onClick={filterMinor}>
                  MINOR
                </button>
                <button className="view-report" onClick={filterMajor}>
                  MAJOR
                </button>
              </div>
            </div>
          </>
        )}

        {!event && filterType && (
          <div className="full-length-input student-wrapper border-top">
            {filteredEvents?.data?.length ? (
              <h4>CHOOSE EVENT TO GRADE FOR</h4>
            ) : (
              <h4>
                NO EVENTS SCHEDUELED FOR {filterType.toUpperCase()} PROJECTS
              </h4>
            )}
            {filteredEvents?.data?.map((ev, i) => (
              <div
                key={i}
                className="full-length-input view-report"
                onClick={() => setEvent(ev)}
              >
                {ev.name}
              </div>
            ))}
          </div>
        )}
        {event && (
          <>
            <div className="full-length-input border-top">
              <label htmlFor="mail">FILTER STUDENT MAIL</label>
              <input
                type="text"
                name="mail"
                id="mail"
                placeholder="STUDENT MAIL"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>

            <div className="full-length-input student-wrapper">
              {/* Display filtered results */}
              {filteredGroups.length > 0 ? (
                filteredGroups.map((stu, i) => (
                  <div
                    key={i}
                    className="full-length-input student"
                    onClick={() => {
                      queryClient.setQueryData(["selected-student"], {
                        ...stu,
                        event: event,
                      });

                      queryClient.setQueryData(["is-mentor-grading"], false);

                      queryClient.setQueryData(["filter-options"], {
                        filterType,
                        event,
                      });

                      setShowModal("grade-students-sm");
                    }}
                  >
                    <span>{stu.mail}</span>
                    {/* <span>({stu.type})</span> */}
                  </div>
                ))
              ) : (
                <div>No students found</div>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalGradeStudents;
