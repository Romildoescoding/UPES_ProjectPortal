import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
import { useQueryClient } from "@tanstack/react-query";
import useNullPanelProjects from "./useNullPanelProjects";
import NullPanelGroup from "../../ui/NullPanelGroup";
import EmptyComponent from "../../ui/EmptyComponent";

function ModalAssignPanels({ setShowModal }) {
  const queryClient = useQueryClient();
  const { data: groups, isLoading } = useNullPanelProjects({
    isPanelNull: true,
  });
  const nullPanelGroups = groups?.data;

  return (
    <div className="add-students">
      <div className="import-students-div assign-panels">
        <button
          className="btn-close-import"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        {!nullPanelGroups?.length ? (
          <EmptyComponent
            msg={"❗No groups with unset Panel Members❗"}
            size={32}
          />
        ) : (
          <>
            <h1 className="project-field-heading">Assign panels</h1>
            {nullPanelGroups?.map((group, i) => (
              <NullPanelGroup
                setShowModal={setShowModal}
                key={i}
                group={group}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ModalAssignPanels;
