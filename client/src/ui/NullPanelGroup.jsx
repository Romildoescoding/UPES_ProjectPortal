import { useQueryClient } from "@tanstack/react-query";

function NullPanelGroup({ group, setShowModal }) {
  const queryClient = useQueryClient();
  function handleAssignPanel() {
    queryClient.setQueryData(["selected-group"], group);
    setShowModal("assign-panel-sm");
  }
  return (
    <div className="panel-grp" onClick={handleAssignPanel}>
      <span>
        {group.title.length > 20
          ? group.title.slice(0, 20) + "..."
          : group.title}
      </span>
      <span>
        {group.group_name.length > 20
          ? group.group_name.slice(0, 20) + "..."
          : group.group_name}
      </span>
    </div>
  );
}

export default NullPanelGroup;
