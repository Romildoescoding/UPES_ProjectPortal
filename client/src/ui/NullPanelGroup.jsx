import { useQueryClient } from "@tanstack/react-query";
import useProjectByGroup from "../features/members/useProjectByGroup";

function NullPanelGroup({ group, setShowModal }) {
  const queryClient = useQueryClient();
  function handleAssignPanel() {
    queryClient.setQueryData(["selected-group"], group);
    setShowModal("assign-panel-sm");
  }
  return (
    <div className="request panel-grp" onClick={handleAssignPanel}>
      <div className="request-area">
        <span>TITLE</span>
        <div className="request-text">
          {group.title.length > 13
            ? group.title.slice(0, 13) + "..."
            : group.title}
        </div>
      </div>
      <div className="request-area">
        <span>GROUP</span>
        <div className="request-text">
          {group.group_name.length > 13
            ? group.group_name.slice(0, 13) + "..."
            : group.group_name}
        </div>
      </div>
    </div>
  );
}

export default NullPanelGroup;
