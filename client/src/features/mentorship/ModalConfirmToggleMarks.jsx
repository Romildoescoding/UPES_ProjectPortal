import useRemoteVariables from "./useRemoteVariables";
import useToggleRemoteVariables from "./useToggleRemoteVariables";
import Spinner from "../../ui/Spinner";

function ModalConfirmToggleMarks({ setShowModal }) {
  const { data: variables, isFetching } = useRemoteVariables();
  const { toggleRemoteVariables, isPending } = useToggleRemoteVariables();
  console.log(variables?.variables?.[0]?.["variable-name"]);
  const visibility = variables?.variables?.[0]?.["value"] || "false";
  const variableName = variables?.variables?.[0]?.["variable-name"] || "";

  function handleToggleMarksVisibility(e) {
    e.preventDefault();
    toggleRemoteVariables({
      variableName,
      value: visibility === "true" ? "false" : "true",
    });
    setShowModal("");
  }

  if (isFetching || isPending) return <Spinner />;

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
      <div className="role-ques bold">
        <p style={{ fontWeight: 600 }}>
          Confirm Toggle Marks Visbility
          <span className="logout-svg">{/* <LogoutSVG /> */}</span>
        </p>
      </div>
      <div className="role-ques">
        <p className="logout-ques" style={{ color: "#999999" }}>
          Currently, Marks visibility is set to{" "}
          {variables?.variables?.[0]?.["value"]}. So, students{" "}
          {visibility === "true" ? "can" : "cannot"} view their marks
        </p>
        <p className="logout-ques">
          Are you sure about toggling marks visibiity?
        </p>
      </div>

      <div className="logout-btns">
        <button className="logout-cancel" onClick={() => setShowModal("")}>
          Cancel
        </button>
        <button className="logout-main" onClick={handleToggleMarksVisibility}>
          Toggle
        </button>
      </div>
    </div>
  );
}

export default ModalConfirmToggleMarks;
