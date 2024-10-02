import { useEffect } from "react";
import Event from "./Event";
import { useEvents } from "../features/events/useEvents";
import Spinner from "./Spinner";

function Events() {
  const { data: events, isLoading, isFetching, isError } = useEvents();

  useEffect(() => {
    console.log(events);
  }, [events, isFetching]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <p>Something went wrong, please try again later.</p>;
  }

  return (
    <div className="events-div">
      <p className="events-heading">Upcoming events</p>
      <ul className="events">
        {!events?.data?.length ? (
          <div className="events-empty">
            <img
              src="/images/party-popper.png"
              className="events-img"
              alt="party-popper"
            />
            <p className="events-text-sm">No upcoming events</p>
          </div>
        ) : (
          events?.data?.map((event, i) => <Event key={i} event={event} />)
        )}
      </ul>
    </div>
  );
}

export default Events;
