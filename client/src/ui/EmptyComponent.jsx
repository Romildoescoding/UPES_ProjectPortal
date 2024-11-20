function EmptyComponent({
  msg,
  color,
  size,
  isTable,
  isAbsolute,
  isMarks = false,
}) {
  return isTable ? (
    <tr
      className="empty-comp"
      style={{
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
        backgroundColor: color || "transparent",
        fontSize: size || 16,
        position: isAbsolute ? "absolute" : "static",
        top: isMarks ? "50%" : "unset",
        left: isMarks ? "50%" : "unset",
        transform: isMarks ? "translate(-50%,-50%)" : "unset",
      }}
    >
      <span>{msg}</span>
    </div>
  );
}

export default EmptyComponent;
