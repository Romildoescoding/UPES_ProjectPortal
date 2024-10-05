import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "../authentication/signin/useUser";
import usePanelGroups from "./usePanelGroups";
import Loader from "../../ui/Loader";
import { useQueryClient } from "@tanstack/react-query";

function ModalGradeStudents({ setShowModal }) {
  const { data, isPending } = useUser();
  const queryClient = useQueryClient();
  const user = data?.user;
  const { data: groups, isFetching } = usePanelGroups({
    panel: user.name,
  });
  console.log("MODAL-GRADE-STUDENTS");

  const [mail, setMail] = useState("");
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [filterType, setFilterType] = useState(""); // New state for filtering type

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
  function filterMinor(e) {
    e.preventDefault();
    setFilterType("Minor"); // Set the filter type to "Minor"
  }

  // Filter for Major types
  function filterMajor(e) {
    e.preventDefault();
    setFilterType("Major"); // Set the filter type to "Major"
  }

  if (isFetching) return <Loader />;

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
        <div className="full-length-input">
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

        {/* Buttons for filtering Minor and Major */}
        <div className="full-length-input flex-gap-15">
          <button className="view-report" onClick={filterMinor}>
            MINOR
          </button>
          <button className="view-report" onClick={filterMajor}>
            MAJOR
          </button>
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
                  setShowModal("grade-students-sm");
                }}
              >
                <span>{stu.mail}</span> <span>({stu.type})</span>
              </div>
            ))
          ) : (
            <div>No students found</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default ModalGradeStudents;
