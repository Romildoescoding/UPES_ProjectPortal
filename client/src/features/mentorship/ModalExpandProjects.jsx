import React, { useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
import { useQueryClient } from "@tanstack/react-query";
import NullPanelGroup from "../../ui/NullPanelGroup";
import EmptyComponent from "../../ui/EmptyComponent";

function ModalExpandProjects({
  setShowModal,
  mentorProjects,
  setProjectForModal,
}) {
  const [shouldConfirm, setShouldConfirm] = useState(true);
  const nullPanelGroups = mentorProjects?.data;
  const [filteredGroups, setFilteredGroups] = useState(nullPanelGroups);
  const [filterValue, setFilterValue] = useState("");

  // Filter the groups whenever `filterValue` changes
  useEffect(() => {
    if (filterValue.trim() === "") {
      setFilteredGroups(nullPanelGroups);
    } else {
      setFilteredGroups(
        nullPanelGroups?.filter((group) => {
          const {
            title,
            group_name,
            technologies,
            panel_member1,
            panel_member2,
            mentor,
          } = group;
          const searchValue = filterValue.toLowerCase();
          return (
            title.toLowerCase().includes(searchValue) ||
            group_name.toLowerCase().includes(searchValue) ||
            // technologies?.toLowerCase().includes(searchValue) ||
            mentor?.toLowerCase().includes(searchValue) ||
            panel_member1?.toLowerCase().includes(searchValue) ||
            panel_member2?.toLowerCase().includes(searchValue)
          );
        })
      );
    }
  }, [filterValue, nullPanelGroups]);

  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>

      <div className="import-students-div">
        {!nullPanelGroups?.length ? (
          <EmptyComponent
            msg={"❗No groups with unset Panel Members❗"}
            size={32}
          />
        ) : (
          <>
            <h3>Assigned Groups</h3>
            <div className="requests-div">
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="full-length-input"
                style={{ margin: "0px 20px", maxWidth: "720px" }}
                placeholder="Filter by project title, group name, mentor or panel members."
              />
              {filteredGroups?.length > 0
                ? filteredGroups.map((group, i) => (
                    <NullPanelGroup
                      setShowModal={setShowModal}
                      key={i}
                      group={group}
                      shouldConfirm={shouldConfirm}
                      setShouldConfirm={setShouldConfirm}
                      isExpandProject={true}
                      setProjectForModal={setProjectForModal}
                    />
                  ))
                : "No groups match your filter"}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalExpandProjects;
