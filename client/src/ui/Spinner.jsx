import "../styles/spinner.css";

function Spinner({ isNotAbsolute, isBlack }) {
  return (
    <div className={`spinner ${isNotAbsolute ? "" : "absolute"}`}>
      <div className="pl11">
        <div className={`pl11__a ${isBlack ? "black" : ""}`}></div>
        <div className={`pl11__b ${isBlack ? "black" : ""}`}></div>
        <div className={`pl11__c ${isBlack ? "black" : ""}`}></div>
      </div>
    </div>
  );
}

export default Spinner;
