import useRemoteVariables from "./useRemoteVariables";
import useToggleRemoteVariables from "./useToggleRemoteVariables";
import Spinner from "../../ui/Spinner";
import { useUser } from "../authentication/signin/useUser";
import { useState } from "react";

function ModalConfirmToggleMarks({ setShowModal }) {
  const { data: user, isLoading } = useUser();
  const mail = user?.user?.mail;
  const [variable, setVariable] = useState("");
  const { data: variables, isFetching } = useRemoteVariables({ mail });
  const { toggleRemoteVariables, isPending } = useToggleRemoteVariables();

  const visibility = variables?.variables?.[0]?.["value"] || "false";
  const variableName = variables?.variables?.[0]?.["variable-name"] || "";

  function handleToggleMarksVisibility(e) {
    e.preventDefault();
    toggleRemoteVariables({
      branch: variable.branch,
      type: variable.type,
      value: visibility === "true" ? "false" : "true",
    });
    setShowModal("");
  }

  if (isFetching || isPending) return <Spinner />;

  return (
    <div className="select-role" style={{ paddingTop: "50px" }}>
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      {variable && (
        <button
          className="btn-back"
          onClick={(e) => {
            e.preventDefault();
            setVariable("");
          }}
        >
          &larr;
        </button>
      )}
      {!variable ? (
        <>
          <div className="role-ques bold">
            Choose category to toggle the marks visibility for
          </div>
          {variables?.variables?.map((remoteVar, i) => (
            <div
              key={i}
              className="view-report"
              style={{ transition: "scale 0.3s ease-in" }}
              onClick={() => setVariable(remoteVar)}
            >
              {remoteVar.branch} - {remoteVar.type}
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="role-ques bold">
            <p style={{ fontWeight: 600 }}>
              Confirm Toggle Marks Visbility
              <span className="logout-svg">{/* <LogoutSVG /> */}</span>
            </p>
          </div>
          <div className="role-ques">
            <p className="logout-ques" style={{ color: "#999999" }}>
              Currently, Marks visibility for{" "}
              <bold>
                {variable.branch} {variable.type}
              </bold>{" "}
              is set to {variable?.value} So, students{" "}
              {variable.value === "true" ? "can" : "cannot"} view their marks
            </p>
            <p className="logout-ques">
              Are you sure about toggling marks visibiity?
            </p>
          </div>

          <div className="logout-btns">
            <button className="logout-cancel" onClick={() => setShowModal("")}>
              Cancel
            </button>
            <button
              className="logout-main"
              onClick={handleToggleMarksVisibility}
            >
              Toggle
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ModalConfirmToggleMarks;
