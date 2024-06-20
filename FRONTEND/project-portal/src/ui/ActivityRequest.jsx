function ActivityRequest() {
  return (
    <div className="ac-request">
      <span className="ac-marks-heading">PYTHONS</span>
      <div className="members-container overflow-hidden">
        <table className="members-table">
          <thead>
            <tr className="ac-members-row color-gray">
              <th>Name</th>
              <th>Contact</th>
              <th>Marks Awarded</th>
            </tr>
          </thead>
          <tbody>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
            <tr className="ac-members-row">
              <td>Romil</td>
              <td>9876543210</td>
              <td>99/100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivityRequest;
