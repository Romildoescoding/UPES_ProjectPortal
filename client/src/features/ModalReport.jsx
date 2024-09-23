function ModalReport({ setShowModal }) {
  return (
    <div className="select-role">
      <button
        className="btn-close-role"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      AREA TO DISPLAY THE SUBMITTED REPORT
    </div>
  );
}

export default ModalReport;
