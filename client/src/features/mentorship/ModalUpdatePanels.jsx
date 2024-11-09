import React, { useState } from "react";
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
  });
  const allGroups = groups?.data;
  console.log(allGroups);

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
              {allGroups?.map((group, i) => (
                <UpdatePanelGroup
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

export default ModalUpdatePanels;
