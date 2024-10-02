function Event({ event }) {
  return (
    <li className="event">
      <p className="event-name">{event.name}</p>
      <p className="event-date">{event.date}</p>
    </li>
  );
}

// ADD EVENT VIEW MODAL

export default Event;

// {
//   "id": 1,
//   "name": "Mid-Semester Presentation",
//   "date": "2024-11-09",
//   "description": "Mid-Semester Presentation of the minor project - I",
//   "type": "Minor-I"
// }
