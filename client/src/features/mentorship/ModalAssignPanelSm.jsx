import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect, useMemo } from "react";
import useAllFaculties from "./useAllFaculties";
import usePanelists from "./usePanelists";
import Spinner from "../../ui/Spinner";

function ModalAssignPanelSm({ setShowModal }) {
  const queryClient = useQueryClient();
  const { setPanelMembers, isLoading: isLoading2 } = usePanelists();
  const group = queryClient.getQueryData(["selected-group"]);

  const { data: facultiesData, isLoading } = useAllFaculties();

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

  function handleSetPanelists() {
    const mail1 = faculties.find((faculty) => faculty.name === panel1)?.mail;
    const mail2 = faculties.find((faculty) => faculty.name === panel2)?.mail;

    console.log("handleSetPanelists run!");
    console.log(mail1, mail2, group.group_name);

    setPanelMembers({ panelists: [mail1, mail2], group: group.group_name });
    setShowModal("");
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
      <div className="import-students-div assign-panels flex-col fit-content">
        <button
          className="btn-close-import"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("assign-panels");
          }}
        >
          &times;
        </button>
        <div className="modal-header">
          <h2>{group.title}</h2>
          <p>{group.group_name}</p>
          <p>Mentor: {group.mentor}</p>
        </div>

        {isLoading || !faculties.length ? (
          <Spinner isNotAbsolute={true} isBlack={true} />
        ) : (
          <>
            <div className="form-field form-field2">
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
            <div className="form-field form-field2">
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

        <button className="btn-black" onClick={handleSetPanelists}>
          Submit Panelists
        </button>
      </div>
    </div>
  );
}

export default ModalAssignPanelSm;
