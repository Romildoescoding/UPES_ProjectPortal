import { useState } from "react";
import Event from "./Event";
import { useEvents } from "../features/events/useEvents";

function Events() {
  const { events, isLoading } = useEvents();
  console.log(events);
  return (
    <div className="events-div">
      <p className="events-heading">Upcoming events </p>
      <ul className="events">
        {!events?.length ? (
          <div className="events-empty">
            <img
              src="/images/party-popper.png"
              className="events-img"
              alt="party-popper"
            />
            <p className="events-text-sm">No upcoming events</p>
          </div>
        ) : (
          events?.map((event, i) => <Event key={i} />)
        )}
      </ul>
    </div>
  );
}

export default Events;
