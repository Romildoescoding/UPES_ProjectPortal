function EmptyComponent({ msg, color, size, isTable }) {
  return isTable ? (
    <tr
      className="empty-comp"
      style={{ backgroundColor: color || "transparent", fontSize: size || 16 }}
    >
      <td>{msg}</td>
    </tr>
  ) : (
    <div
      className="empty-comp"
      style={{
        backgroundColor: color || "transparent",
        fontSize: size || 16,
      }}
    >
      <span>{msg}</span>
    </div>
  );
}

export default EmptyComponent;
