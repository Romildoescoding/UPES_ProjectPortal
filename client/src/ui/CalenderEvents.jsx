import { useState } from "react";
import Calender from "./Calender";
import Events from "./Events";

function CalenderEvents() {
  let [selectedDate, setSelectedDate] = useState();
  return (
    <div>
      <Calender selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      <Events />
    </div>
  );
}

export default CalenderEvents;
