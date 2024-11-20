import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "../authentication/signin/useUser";
import usePanelGroups from "./usePanelGroups";
import Loader from "../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import { useEvents } from "../events/useEvents";

function ModalGradeStudentsMentor({ setShowModal }) {
  const { data, isPending } = useUser();
  const queryClient = useQueryClient();
  const user = data?.user;
  const { data: groups, isFetching } = usePanelGroups({
    panel: user.name,
    isMentor: true,
  });

  const { data: events, isFetching: isFetching2 } = useEvents();
  const mentorEventId = events?.data.filter(
    (event) => event.name === "Mentor Grading"
  );

  const [mail, setMail] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filterType, setFilterType] = useState(""); // New state for filtering type

  console.log(mentorEventId);
  console.log(filteredGroups);

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
    setFilterType("Minor"); // Set the filter type to "Minor"
  }

  // Filter for Major types
  function filterMajor(e) {
    e.preventDefault();
    setFilterType("Major"); // Set the filter type to "Major"
  }

  if (isFetching && isFetching2) return <Spinner />;

  return (
    <div className="add-students">
      <form className="add-students-form">
        <button
          className="btn-close"
          onClick={(e) => {
            e.preventDefault();
            setShowModal(false);
          }}
        >
          &times;
        </button>

        <h3>GRADE STUDENTS</h3>

        {/* Buttons for filtering Minor and Major */}

        {!mentorEventId.length ? (
          <>
            <div className="full-length-input border-top">
              No events to grade for
            </div>
            <div className="full-length-input border-top">
              {`Ask the AC to schedule a "Mentor Grading" event.`}
            </div>
          </>
        ) : (
          <>
            <div className="full-length-input gap border-top">
              <h4>FILTER PROJECT TYPE</h4>
              <div className="full-length-input flex-gap-15">
                <button className="view-report" onClick={filterMinor}>
                  MINOR
                </button>
                <button className="view-report" onClick={filterMajor}>
                  MAJOR
                </button>
              </div>
            </div>

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
                      queryClient.setQueryData(["selected-student"], stu);
                      queryClient.setQueryData(["is-mentor-grading"], true);
                      setShowModal("grade-students-sm");
                    }}
                  >
                    <span>{stu.mail}</span>
                    {/* <span>({stu.type})</span> */}
                  </div>
                ))
              ) : (
                <div
                  className="full-length-input"
                  style={{ alignItems: "center" }}
                >
                  No students found
                </div>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default ModalGradeStudentsMentor;
