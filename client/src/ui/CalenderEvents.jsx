import { useState } from "react";
import Calender from "./Calender";
import Events from "./Events";

function CalenderEvents() {
  let [selectedDate, setSelectedDate] = useState();
  // () => new Date()
  return (
    <div className="calender-event-wrapper">
      <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Events selectedDate={selectedDate} />
    </div>
  );
}

export default CalenderEvents;
