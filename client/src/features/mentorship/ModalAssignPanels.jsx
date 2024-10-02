import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
import { useQueryClient } from "@tanstack/react-query";
import useNullPanelProjects from "./useNullPanelProjects";
import NullPanelGroup from "../../ui/NullPanelGroup";
import EmptyComponent from "../../ui/EmptyComponent";
import Loader from "../../ui/Loader";

function ModalAssignPanels({ setShowModal }) {
  const { data: groups, isFetching } = useNullPanelProjects({
    isPanelNull: true,
  });
  const nullPanelGroups = groups?.data;
  console.log(nullPanelGroups);

  if (isFetching) return <Loader />;
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
        {!nullPanelGroups?.length ? (
          <EmptyComponent
            msg={"❗No groups with unset Panel Members❗"}
            size={32}
          />
        ) : (
          <>
            <h3>Assign panels</h3>
            <div className="requests-div">
              {nullPanelGroups?.map((group, i) => (
                <NullPanelGroup
                  setShowModal={setShowModal}
                  key={i}
                  group={group}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalAssignPanels;
