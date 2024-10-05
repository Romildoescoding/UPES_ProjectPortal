import { useEffect, useState } from "react";
import { getMonth } from "../helpers/formatDate";
import { getCurrentMonthDays } from "../helpers/formatDate";

function Calender({ selectedDate, setSelectedDate }) {
  const [monthDays, setMonthDays] = useState([]);
  // const { data: events, isLoading, isFetching, isError } = useEvents();

  useEffect(
    function () {
      setSelectedDate(() => new Date());
      setMonthDays(getCurrentMonthDays);
    },
    [setSelectedDate]
  );

  useEffect(() => console.log(selectedDate), [selectedDate]);

  return (
    <div className="calender">
      <header>
        <p className="dashboard-heading">
          {selectedDate && getMonth(selectedDate)}
        </p>
      </header>
      <div className="calender-days-container-div">
        <div className="calender-days-container">
          <ul className="weeks">
            <li>Mon</li>
            <li>Tue</li>
            <li>Wed</li>
            <li>Thu</li>
            <li>Fri</li>
            <li>Sat</li>
            <li>Sun</li>
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
