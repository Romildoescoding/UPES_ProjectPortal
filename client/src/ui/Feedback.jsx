import Pill from "./Pill";

function Feedback() {
  return (
    <div className="feedback">
      <div className="feedback-header">
        <p className="dashboard-heading">Feedback Received</p>
        <p className="dashboard-heading-sm">Marks Allotted: 100</p>
      </div>
      {/* <div className="feedback-container"> */}
      <table className="feedback-table">
        <thead>
          <tr className="feedback-row">
            <th>Name</th>
            <th>Received</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr className="feedback-row">
            <td>Nelson Web Development</td>
            <td>May 25, 2024</td>
            <td>
              <Pill text="Completed" type="safe" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Datacale app</td>
            <td>June 30, 2024</td>
            <td>
              <Pill text="Delayed" type="normal" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>

          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="danger" />
            </td>
          </tr>
          <tr className="feedback-row">
            <td>Media channel broadcast</td>
            <td>Sept 22, 2022</td>
            <td>
              <Pill text="At Risk" type="safe" />
            </td>
          </tr>
        </tbody>
      </table>
      {/* </div> */}
    </div>
  );
}

export default Feedback;
