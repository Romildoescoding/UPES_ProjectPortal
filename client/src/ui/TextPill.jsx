function TextPill({
  text,
  width,
  height,
  isHeading,
  isCentered,
  isWithoutSvg,
  isExpandOption = false,
  handleClick,
}) {
  return (
    <div
      className="text-pill"
      style={{
        width: width,
        height: height,
        justifyContent: isCentered ? "center" : "",
        position: "relative",
      }}
    >
      {isHeading ? (
        isWithoutSvg ? (
          <>
            <span style={{ marginLeft: 5 }}>{text}</span>
          </>
        ) : (
          <>
            <span style={{ marginLeft: 5 }}>{text}</span>
            <div
              className="text-pill-checkbox"
              style={{ width: height - 10, height: height - 10 }}
            ></div>
            {isExpandOption && (
              <button
                onClick={handleClick}
                style={{
                  cursor: "pointer",
                  borderRadius: "50px",
                  padding: "5px 15px",
                  background: "blueviolet",
                  border: "none",
                  color: "white",
                  position: "absolute",
                  top: "4px",
                  right: "5px",
                }}
              >
                Expand
              </button>
            )}
          </>
        )
      ) : (
        <>
          <div
            className="text-pill-checkbox"
            style={{
              width: `${height - 10}px`,
              height: `${height - 10}px`,
            }}
          ></div>
          <span>{text}</span>
        </>
      )}
    </div>
  );
}

export default TextPill;
