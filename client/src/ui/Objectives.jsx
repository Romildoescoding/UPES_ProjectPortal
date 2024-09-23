import { useSearchParams } from "react-router-dom";
import Checkbox from "./Checkbox";
import Pill from "./Pill";
import { useEffect } from "react";

function Objectives() {
  const [searchParams, setSearchParams] = useSearchParams();
  function filterObjectives(value) {
    searchParams.set("objectives", value);
    setSearchParams(searchParams);
  }
  let params = searchParams.get("objectives");

  return (
    <div className="objectives">
      <p className="dashboard-heading">Objectives</p>
      <ul className="objectives-options-list">
        <li
          className={`${params === "all" && "active-list"}`}
          onClick={() => filterObjectives("all")}
        >
          All
        </li>
        <li
          className={`${params === "important" && "active-list"}`}
          onClick={() => filterObjectives("important")}
        >
          Important
        </li>
        <li
          className={`${params === "links" && "active-list"}`}
          onClick={() => filterObjectives("links")}
        >
          Links
        </li>
      </ul>

      <ul className="objectives-list">
        <li>
          <div>
            <Checkbox name="obj1" id="obj1" defaultChecked={true} />
            <label htmlFor="obj1">Objective1</label>
          </div>
          <Pill text="Approved" type="safe" />
        </li>
        <li>
          <div>
            <Checkbox name="obj2" id="obj2" defaultChecked={true} />
            <label htmlFor="obj2">Objective2</label>
          </div>
          <Pill text="In Review" type="danger" />
        </li>
        <li>
          <div>
            <Checkbox name="obj3" id="obj3" defaultChecked={true} />
            <label htmlFor="obj3">Objective3</label>
          </div>
          <Pill text="In Review" type="danger" />
        </li>
        <li>
          <div>
            <Checkbox name="obj4" id="obj4" />
            <label htmlFor="obj4">Objective4</label>
          </div>
          <Pill text="On going" type="normal" />
        </li>
        <li>
          <div>
            <Checkbox name="obj5" id="obj5" defaultChecked={true} />
            <label htmlFor="obj5">Objective5</label>
          </div>
          <Pill text="In Review" type="safe" />
        </li>
      </ul>
    </div>
  );
}

export default Objectives;
