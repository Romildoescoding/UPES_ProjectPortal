import { useEffect, useMemo, useState } from "react";
import Event from "./Event";
import { useEvents } from "../features/events/useEvents";
import Spinner from "./Spinner";
import { useLocation } from "react-router-dom";
import { useUser } from "../features/authentication/signin/useUser";
import useFacultyBranch from "../features/events/useFacultyBranch";

export default function Events({ selectedDate }) {
  const { data: user } = useUser();
  const mail = user?.user.mail;
  const { data: events, isLoading, isFetching, isError } = useEvents();
  const location = useLocation();
  const pathName = location.pathname;
  const { data: branchData } = useFacultyBranch({ mail });

  // State to store filtered events
  const [filteredEvents, setFilteredEvents] = useState([]);
  const projectTypes = useMemo(() => {
    return { 5: "Minor-I", 6: "Minor-II", 7: "Major-I", 8: "Major-II" };
  }, []);

  useEffect(() => {
    if (!events) return;

    let updatedEvents = events?.data ? [...events.data] : []; // Copy to avoid direct mutation

    // STUDENT
    if (pathName === "/student") {
      updatedEvents = updatedEvents.filter(
        //events.type === semester logic :)
        (event) =>
          event.branch === user.user.program &&
          event.type === projectTypes[user.user.semester]
      );
    }

    //FACULTY OR MENTOR
    else if (pathName === "/faculty") {
      updatedEvents = updatedEvents.filter(
        (event) => event.name === "Mentor Grading"
      );
    }

    //AC
    else if (pathName === "/activity-coordinator") {
      updatedEvents = updatedEvents.filter((event) => {
        return branchData?.data?.some(
          (facBranch) =>
            facBranch.mail === user?.user?.mail &&
            facBranch.branch === event.branch &&
            facBranch.type === event.type
        );
      });
    }

    //PANEL
    else if (pathName === "/panel-members") {
      updatedEvents = updatedEvents.filter(
        (event) => event.name !== "Mentor Grading"
      );
    }

    setFilteredEvents(updatedEvents);
  }, [branchData, branchData?.data, events, pathName, projectTypes, user]);

  // Filtering by selected date
  const isToday = (date) => {
    const today = new Date();
    return (
      date?.getDate() === today?.getDate() &&
      date?.getMonth() === today?.getMonth() &&
      date?.getFullYear() === today?.getFullYear()
    );
  };

  const displayedEvents = filteredEvents.filter((event) => {
    if (isToday(selectedDate)) {
      return true; // Show all events if selectedDate is today
    }
    // Normalize dates to exclude time components
    const normalizeDate = (date) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const normalizedSelectedDate = normalizeDate(selectedDate);
    const normalizedStartDate = normalizeDate(new Date(event?.startDate));
    const normalizedEndDate = normalizeDate(new Date(event?.endDate));

    // Check if the normalized selected date lies within the range of startDate and endDate
    return (
      normalizedSelectedDate >= normalizedStartDate &&
      normalizedSelectedDate <= normalizedEndDate
    );
  });

  if (isError) {
    return (
      <p style={{ marginLft: "5px" }}>
        Something went wrong, please try again later.
      </p>
    );
  }

  return (
    <div className="events-div">
      {isLoading ? (
        <Spinner />
      ) : (
        <ul
          className="events"
          style={{
            minHeight:
              location.pathname === "/student" ? "unset" : "fit-content",
          }}
        >
          <p className="events-heading">Upcoming events</p>
          {!displayedEvents.length ? (
            <div className="events-empty">
              <img
                src="/images/party-popper.png"
                className="events-img"
                alt="party-popper"
              />
              <p className="events-text-sm">No upcoming events</p>
            </div>
          ) : (
            displayedEvents.map((event, i) => <Event key={i} event={event} />)
          )}
        </ul>
      )}
    </div>
  );
}
