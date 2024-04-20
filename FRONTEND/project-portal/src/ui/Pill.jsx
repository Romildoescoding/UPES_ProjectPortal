function Pill({ text, type }) {
  return <div className={`pill ${type}-pill`}>{text}</div>;
}

export default Pill;
