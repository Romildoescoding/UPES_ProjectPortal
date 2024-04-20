import "../styles/checkbox.css";

function Checkbox({ name, id, defaultChecked, val = true, setVal }) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={val}
        defaultChecked={defaultChecked}
        onChange={(e) => {
          //   console.log(e.target.checked);
          if (setVal) setVal(e.target.checked);
        }}
      />
      <label htmlFor={id} className="cbx"></label>
    </div>
  );
}

export default Checkbox;
