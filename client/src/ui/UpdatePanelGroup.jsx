import { useQueryClient } from "@tanstack/react-query";
import useProjectByGroup from "../features/members/useProjectByGroup";
import useProjectMembers from "../features/mentorship/useProjectMembers";
import getRandomEntry from "../helpers/getRandomEntry";
import { useContext, useEffect, useMemo, useState } from "react";
import useAllFaculties from "../features/mentorship/useAllFaculties";
import usePanelists from "../features/mentorship/usePanelists";
import Modal from "./Modal";
import ModalConfirmPanels from "../features/mentorship/ModalConfirmPanels";

function UpdatePanelGroup({ group, setShowModal, showModal }) {
  //   const [confirm, setShouldAsk] = useState(true);
  //   const { showModal } = useContext(ModalProvider);
  const queryClient = useQueryClient();
  // const { data, isFetching } = useProjectMembers({
  //   group_name: group?.group_name,
  // });
  // const groupInfo = data?.data;
  // console.log(groupInfo);

  const { data: facultiesData, isFetching } = useAllFaculties();
  const { setPanelMembers, isPending } = usePanelists();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Memoize the faculties list to avoid unnecessary recalculations
  const faculties = useMemo(() => {
    return (
      facultiesData?.data?.filter((faculty) => faculty.name !== group.mentor) ||
      []
    );
  }, [facultiesData, group.mentor]);

  function handleAssignPanel(e) {
    e.preventDefault();
    queryClient.setQueryData(["selected-group"], group);
    queryClient.setQueryData(["updating-panels"], true);
    setShowModal("assign-panel-sm");
  }

  function handleAssignRandomPanels(e) {
    e.preventDefault();
    queryClient.setQueryData(["selected-group"], group);
    const panel1 = getRandomEntry(faculties);
    const panel2 = getRandomEntry(faculties, panel1.name);
    console.log(panel1, panel2);

    console.log(panel1.mail, panel2.mail, group.group_name);

    console.log("RANDOM PANELS RUN");
    queryClient.setQueryData(["random-panels"], {
      panel1: panel1,
      panel2: panel2,
    });
    const confirm = queryClient.getQueryData(["confirm-random"]) ?? true;
    queryClient.setQueryData(["updating-panels"], true);

    queryClient.setQueryData(["confirm-random"], confirm);
    if (confirm) return setShowModal("confirm-panels");

    setPanelMembers({
      panelists: [panel1.mail, panel2.mail],
      group: group.group_name,
      title: group.title,
    });
    setIsSubmitted(true);
    getRandomEntry();
  }

  //FOR LOADING FEATURE
  useEffect(() => {
    if (isSubmitted && !isPending) {
      setShowModal("");
    }
  }, [isSubmitted, isPending, setShowModal]);

  return (
    <div className="request">
      {/* {showModal === "confirm-panels" && (
        <Modal setShowModal={setShowModal}>
          <ModalConfirmPanels setShowModal={setShowModal} isUpdating={true} />
        </Modal>
      )} */}
      <div className="request-area">
        <span>TITLE</span>
        <div className="request-text">
          {group.title.length > 30
            ? group.title.slice(0, 30) + "..."
            : group.title}
        </div>
      </div>
      <div className="request-area">
        <span>GROUP</span>
        <div className="request-text">
          {group.group_name.length > 30
            ? group.group_name.slice(0, 30) + "..."
            : group.group_name}
        </div>
      </div>
      <button className="view-report green mt" onClick={handleAssignPanel}>
        Assign Panels Manually
      </button>
      <button className="view-report mt" onClick={handleAssignRandomPanels}>
        Assign Random Panels
      </button>
      {/* <button className="view-report mt" onClick={handleAssignRandomPanels}>
        Assign Previous Panels
      </button> */}
    </div>
  );
}

export default UpdatePanelGroup;
