import React, { useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
import { useQueryClient } from "@tanstack/react-query";
import useNullPanelProjects from "./useNullPanelProjects";
import NullPanelGroup from "../../ui/NullPanelGroup";
import EmptyComponent from "../../ui/EmptyComponent";
import Loader from "../../ui/Loader";
import Spinner from "../../ui/Spinner";
import UpdatePanelGroup from "../../ui/UpdatePanelGroup";
import useAllProjects from "./useAllProjects";
import { useUser } from "../authentication/signin/useUser";

function ModalUpdatePanels({ setShowModal }) {
  const { data: user } = useUser();
  const [shouldConfirm, setShouldConfirm] = useState(true);
  const { data: groups, isFetching } = useAllProjects({
    mail: user?.user?.mail,
    isPanelNotNull: true,
  });
  const allGroups = groups?.data;
  const [filteredGroups, setFilteredGroups] = useState(allGroups);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (filterValue.trim() === "") {
      setFilteredGroups(allGroups);
    } else {
      setFilteredGroups(
        allGroups?.filter((group) => {
          const { title, group_name, technologies, mentor } = group;
          const searchValue = filterValue.toLowerCase();
          return (
            title.toLowerCase().includes(searchValue) ||
            group_name.toLowerCase().includes(searchValue)
            // technologies?.toLowerCase().includes(searchValue) ||
            //  || mentor?.toLowerCase().includes(searchValue)
          );
        })
      );
    }
  }, [filterValue, allGroups]);

  if (isFetching) return <Spinner />;
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

      <div className="import-students-div ">
        {!allGroups?.length ? (
          <EmptyComponent msg={"❗No groups to update❗"} size={32} />
        ) : (
          <>
            <h3>Update panels</h3>
            <div className="requests-div">
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="full-length-input"
                style={{ margin: "0px 20px", maxWidth: "720px" }}
                placeholder="Filter by project title or group name."
              />
              {filteredGroups?.length > 0
                ? filteredGroups?.map((group, i) => (
                    <UpdatePanelGroup
                      setShowModal={setShowModal}
                      key={i}
                      group={group}
                      shouldConfirm={shouldConfirm}
                      setShouldConfirm={setShouldConfirm}
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

export default ModalUpdatePanels;
