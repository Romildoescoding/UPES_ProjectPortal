import { useNavigate } from "react-router-dom";
import LogoutSVG from "../../../public/svg/LogoutSVG";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import usePanelists from "./usePanelists";
import Loader from "../../ui/Loader";

function ModalConfirmPanels({ setShowModal }) {
  const queryClient = useQueryClient();
  const { panel1, panel2 } = queryClient.getQueryData(["random-panels"]);
  const confirm = queryClient.getQueryData(["confirm-random"]);
  const isUpdating = queryClient.getQueryData(["updating-panels"]);
  const [confirm1, setConfirm1] = useState(confirm);
  const group = queryClient.getQueryData(["selected-group"]);
  const { setPanelMembers, isPending } = usePanelists();
  const [isSubmitted, setIsSubmitted] = useState(false);

  //FOR LOADING FEATURE
  useEffect(() => {
    if (isSubmitted && !isPending) {
      setShowModal("");
    }
  }, [isSubmitted, isPending, setShowModal]);

  if (isPending) return <Loader />;

  function handleAssignRandomPanels(e) {
    e.preventDefault();
    queryClient.setQueryData(["confirm-random"], confirm1);
    setPanelMembers({
      panelists: [panel1.mail, panel2.mail],
      group: group.group_name,
      title: group.title,
    });
    setIsSubmitted(true);
  }

  return (
    <div className="select-role">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="role-ques">
        <p>
          {isUpdating ? "Updating Panels" : "Assigning Panels"}
          <span className="logout-svg">
            <LogoutSVG />
          </span>
        </p>
        <p className="logout-ques">
          Are you sure about assigning these panels?
        </p>
      </div>
      <div className="role-ques">
        <p className="logout-ques">Panel1 : {panel1.name}</p>
        <p className="logout-ques">Panel2 : {panel2.name}</p>
      </div>
      <div className="role-ques-ask">
        <div className="logout-ques-ask" style={{ display: "flex" }}>
          <span>Do not ask again for this session?</span>
          <div className="checkbox-wrapper-17 checkbox-div">
            <input type="checkbox" id="remember-me" />
            <label
              htmlFor="remember-me"
              onClick={() => setConfirm1((confirm1) => !confirm1)}
            ></label>
          </div>
        </div>
      </div>
      <div className="logout-btns">
        <button
          className="logout-cancel"
          onClick={() =>
            setShowModal(() => (isUpdating ? "update-panels" : "assign-panels"))
          }
        >
          Cancel
        </button>
        <button
          className="logout-main"
          onClick={handleAssignRandomPanels}
          style={{ backgroundColor: "blueviolet" }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ModalConfirmPanels;
