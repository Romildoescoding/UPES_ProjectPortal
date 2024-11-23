import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
import { useQueryClient } from "@tanstack/react-query";
import useNullPanelProjects from "./useNullPanelProjects";
import NullPanelGroup from "../../ui/NullPanelGroup";
import EmptyComponent from "../../ui/EmptyComponent";
import Loader from "../../ui/Loader";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/signin/useUser";

function ModalAssignPanels({ setShowModal }) {
  const { data: user } = useUser();
  const [shouldConfirm, setShouldConfirm] = useState(true);
  const { data: groups, isFetching } = useNullPanelProjects({
    isPanelNull: true,
    mail: user?.user?.mail,
  });
  const nullPanelGroups = groups?.data;

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
                  shouldConfirm={shouldConfirm}
                  setShouldConfirm={setShouldConfirm}
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
