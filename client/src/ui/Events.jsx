import { useEffect } from "react";
import Event from "./Event";
import { useEvents } from "../features/events/useEvents";
import Spinner from "./Spinner";
import { useLocation } from "react-router-dom";

function Events({ selectedDate }) {
  const { data: events, isLoading, isFetching, isError } = useEvents();
  const location = useLocation();

  useEffect(() => {
    console.log(events);
  }, [events, isFetching]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date?.getDate() === today?.getDate() &&
      date?.getMonth() === today?.getMonth() &&
      date?.getFullYear() === today?.getFullYear()
    );
  };

  const filteredEvents = events?.data?.filter((event) => {
    if (isToday(selectedDate)) {
      return true; // Show all events if selectedDate is today
    }
    const eventDate = new Date(event?.date);
    return (
      eventDate?.getDate() === selectedDate?.getDate() &&
      eventDate?.getMonth() === selectedDate?.getMonth() &&
      eventDate?.getFullYear() === selectedDate?.getFullYear()
    );
  });

  if (isError) {
    return <p>Something went wrong, please try again later.</p>;
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
          {!filteredEvents?.length ? (
            <div className="events-empty">
              <img
                src="/images/party-popper.png"
                className="events-img"
                alt="party-popper"
              />
              <p className="events-text-sm">No upcoming events</p>
            </div>
          ) : (
            filteredEvents?.map((event, i) => <Event key={i} event={event} />)
          )}
        </ul>
      )}
    </div>
  );
}

export default Events;
