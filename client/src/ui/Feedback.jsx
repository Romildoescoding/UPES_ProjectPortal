import Pill from "./Pill";

function Feedback() {
  return (
    <div className="feedback">
      <div className="feedback-header">
        <p className="dashboard-heading">Feedback Received</p>
        <p className="dashboard-heading-sm">Marks Allotted: 100</p>
      </div>

      <div className="feedback-container">
        <div className="feedback-row header-row">
          <div className="column">Name</div>
          <div className="column">Received</div>
          <div className="column">Action</div>
        </div>

        <div className="table-body">
          <div className="feedback-row">
            <div className="column">Nelson Web Development</div>
            <div className="column">May 25, 2024</div>
            <div className="column">
              <Pill text="Completed" type="safe" />
            </div>
          </div>

          <div className="feedback-row">
            <div className="column">Datacale app</div>
            <div className="column">June 30, 2024</div>
            <div className="column">
              <Pill text="Delayed" type="normal" />
            </div>
          </div>

          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>

          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>
          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>
          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>
          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>
          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>
          <div className="feedback-row">
            <div className="column">Media channel broadcast</div>
            <div className="column">Sept 22, 2022</div>
            <div className="column">
              <Pill text="At Risk" type="danger" />
            </div>
          </div>

          {/* Add more rows as necessary */}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
