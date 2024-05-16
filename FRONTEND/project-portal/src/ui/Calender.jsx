import { useEffect, useState } from "react";
import { getMonth } from "../helpers/formatDate";
import { getCurrentMonthDays } from "../helpers/formatDate";

function Calender() {
  const [selectedDate, setSelectedDate] = useState();
  const [monthDays, setMonthDays] = useState([]);
  //   const [currentDate, setcurrentDate] = useState(() => new Date());

  useEffect(function () {
    setSelectedDate(() => new Date());
    setMonthDays(getCurrentMonthDays);
  }, []);

  return (
    <div className="calender">
      <header>
        <p className="dashboard-heading">
          {selectedDate && getMonth(selectedDate)}
        </p>
        {/* <div className="icons">
          <span id="prev" className="material-symbols-rounded">
            &larr;
          </span>
          <span id="next" className="material-symbols-rounded">
            &rarr;
          </span>
        </div> */}
      </header>
      <div className="calender-days-container-div">
        <div className="calender-days-container">
          <ul className="weeks">
            <li>m</li>
            <li>t</li>
            <li>w</li>
            <li>t</li>
            <li>f</li>
            <li>s</li>
            <li>s</li>
          </ul>
          <ul className="days">
            {monthDays?.map((day, i) => (
              <li
                className={`${
                  day.isCurrentMonth ? "current-day" : "not-current-day"
                } ${
                  selectedDate.getDate() === day.day && day.isCurrentMonth
                    ? "active-date "
                    : ""
                }
            ${
              new Date().getDate() === day.day && day.isCurrentMonth
                ? "today"
                : ""
            }`}
                key={i}
                onClick={() => {
                  if (!day.isCurrentMonth) return;
                  setSelectedDate(
                    new Date(
                      new Date().getFullYear(),
                      new Date().getMonth(),
                      day.day
                    )
                  );
                }}
              >
                {day.day}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calender;
