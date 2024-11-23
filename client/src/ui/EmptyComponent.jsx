function EmptyComponent({
  msg,
  color,
  size,
  isTable,
  isAbsolute,
  isMarks = false,
  isNotWrap = false,
}) {
  return isTable ? (
    <tr
      className="empty-comp"
      style={{
        color: "#333",
        backgroundColor: color || "transparent",
        fontSize: size || 16,
      }}
    >
      <td>{msg}</td>
    </tr>
  ) : (
    <div
      className="empty-comp"
      style={{
        textWrap: isNotWrap ? "wrap" : "nowrap",
        width: isNotWrap ? "100%" : "unset",
        color: "#555",
        backgroundColor: color || "transparent",
        fontSize: size || 16,
        position: isAbsolute ? "absolute" : "static",
        top: isMarks ? "50%" : "unset",
        left: isMarks ? "50%" : "unset",
        transform: isMarks ? "translate(-50%,-50%)" : "unset",
      }}
    >
      {isNotWrap ? <>{msg}</> : <span>{msg}</span>}
    </div>
  );
}

export default EmptyComponent;
