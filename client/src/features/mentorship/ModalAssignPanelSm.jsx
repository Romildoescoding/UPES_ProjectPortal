import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import useAllFaculties from "./useAllFaculties";
import usePanelists from "./usePanelists";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";
import useProjectMembers from "./useProjectMembers";
import capitalize from "../../helpers/capitalize";

function ModalAssignPanelSm({ setShowModal }) {
  const queryClient = useQueryClient();
  const { setPanelMembers, isPending } = usePanelists();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const group = queryClient.getQueryData(["selected-group"]);
  const isUpdating = queryClient.getQueryData(["updating-panels"]);
  const { data, isFetching } = useProjectMembers({
    group_name: group?.group_name,
  });

  const groupDetails = data?.data;
  const members = data?.data;

  console.log(data?.data?.[0]);
  const { data: facultiesData, isFetching: isFetching2 } = useAllFaculties();

  // Memoize the faculties list to avoid unnecessary recalculations
  const faculties = useMemo(() => {
    return (
      facultiesData?.data?.filter((faculty) => faculty.name !== group.mentor) ||
      []
    );
  }, [facultiesData, group.mentor]);

  const [panel1, setPanel1] = useState("");
  const [panel2, setPanel2] = useState("");
  const [facultiesForPanel1, setFacultiesForPanel1] = useState([]);
  const [facultiesForPanel2, setFacultiesForPanel2] = useState([]);

  // Initialize faculties for both panels when faculties are fetched
  useEffect(() => {
    if (faculties.length) {
      setFacultiesForPanel1(faculties);
      setFacultiesForPanel2(faculties);
    }
  }, [faculties]);

  //FOR LOADING FEATURE
  useEffect(() => {
    if (isSubmitted && !isPending) {
      setShowModal("");
    }
  }, [isSubmitted, isPending, setShowModal]);

  function handleSetPanelists() {
    if (!panel1 || !panel2) {
      return toast.error("Please Select all the fields");
    }
    const mail1 = faculties.find((faculty) => faculty.name === panel1)?.mail;
    const mail2 = faculties.find((faculty) => faculty.name === panel2)?.mail;

    console.log(mail1, mail2, group.group_name);

    setPanelMembers({
      panelists: [mail1, mail2],
      group: group.group_name,
      title: group.title,
    });
    setIsSubmitted(true);
  }

  // Update faculties based on selections for Panelist 1
  useEffect(() => {
    if (panel2) {
      setFacultiesForPanel1(
        faculties.filter((faculty) => faculty.name !== panel2)
      );
    } else {
      setFacultiesForPanel1(faculties); // Reset if no panelist 2 is selected
    }
  }, [panel2, faculties]);

  // Update faculties based on selections for Panelist 2
  useEffect(() => {
    if (panel1) {
      setFacultiesForPanel2(
        faculties.filter((faculty) => faculty.name !== panel1)
      );
    } else {
      setFacultiesForPanel2(faculties); // Reset if no panelist 1 is selected
    }
  }, [panel1, faculties]);

  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(() => (isUpdating ? "update-panels" : "assign-panels"));
        }}
      >
        &times;
      </button>
      <div className="import-students-div" style={{ minHeight: "fit-content" }}>
        <h3>
          {group.title.length > 100 ? group.title.slice(0, 100) : group.title}
        </h3>
        <div
          className="requests-div assign-panels-div"
          style={{ minHeight: "fit-content" }}
          // style={{ overflowY: "scroll" }}
        >
          {/* <div className="modal-header"> */}
          <div className="project-field">
            <h1>Group name</h1>
            <h4 className="project-field-h3">{group.group_name}</h4>
          </div>
          <div className="project-field">
            <h1>Mentor</h1>
            <h4 className="project-field-h3">{group.mentor}</h4>
          </div>
          {members?.map((member, i) => (
            <div key={i} className="project-field">
              <h1>{capitalize(member.position)}</h1>
              <h4 className="project-field-h3 text-none">{member.name}</h4>
            </div>
          ))}

          {isPending || !faculties.length || isFetching ? (
            <div className="full-length-input grid-center">
              <Spinner isNotAbsolute={true} isBlack={true} />
            </div>
          ) : (
            <>
              <div className="full-length-input">
                <label htmlFor="panel1">Select Panelist 1:</label>
                <select
                  id="panel1"
                  onChange={(e) => setPanel1(e.target.value)}
                  value={panel1}
                  className="select-input"
                >
                  <option value="">Select Panelist 1</option>
                  {facultiesForPanel1?.map((faculty, i) => (
                    <option value={faculty.name} key={i}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="full-length-input">
                <label htmlFor="panel2">Select Panelist 2:</label>
                <select
                  id="panel2"
                  onChange={(e) => setPanel2(e.target.value)}
                  value={panel2}
                  className="select-input"
                >
                  <option value="">Select Panelist 2</option>
                  {facultiesForPanel2?.map((faculty, i) => (
                    <option value={faculty.name} key={i}>
                      {faculty.name}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          <button className="view-report" onClick={handleSetPanelists}>
            {isPending ? "Submitting Panelists.." : "Submit Panelists"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAssignPanelSm;
