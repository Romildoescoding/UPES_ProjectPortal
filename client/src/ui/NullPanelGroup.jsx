import { useQueryClient } from "@tanstack/react-query";
import useProjectByGroup from "../features/members/useProjectByGroup";
import useProjectMembers from "../features/mentorship/useProjectMembers";
import getRandomEntry from "../helpers/getRandomEntry";
import { useEffect, useMemo, useState } from "react";
import useAllFaculties from "../features/mentorship/useAllFaculties";
import usePanelists from "../features/mentorship/usePanelists";

function NullPanelGroup({ group, setShowModal }) {
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
    setShowModal("assign-panel-sm");
  }

  function handleAssignRandomPanels(e) {
    e.preventDefault();
    const panel1 = getRandomEntry(faculties);
    const panel2 = getRandomEntry(faculties, panel1.name);
    console.log(panel1, panel2);

    console.log(panel1.mail, panel2.mail, group.group_name);

    setPanelMembers({
      panelists: [panel1.mail, panel2.mail],
      group: group.group_name,
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
    </div>
  );
}

export default NullPanelGroup;
