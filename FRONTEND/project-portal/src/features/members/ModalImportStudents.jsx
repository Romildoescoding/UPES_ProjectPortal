import validateEmail from "../../helpers/emailValidate";

const mentorshipRequests = [
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
  {
    id: 1234,
    name: "PYTHONS",
    leader: "Romil",
    idea: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus enim quo aut officia, omnis odit eveniet molestias rem possimus odio mollitia excepturi aperiam laboriosam quibusdam asperiores numquam ipsa non sed?",
  },
];
function ModalImportStudents({ setShowModal }) {
  return (
    <div className="add-students">
      <div className="import-students-div">
        <button
          className="btn-close-import"
          onClick={(e) => {
            e.preventDefault();
            setShowModal("");
          }}
        >
          &times;
        </button>
        <h3>IMPORT STUDENTS</h3>
        <div className="requests-div">
          <div className="request">
            <h1>TEAM NAME</h1>
            <div className="request-area">
              <span>TEAM ID</span>
              <div className="request-text"></div>
            </div>
            <div className="request-area">
              <span>TEAM LEADER</span>
              <div className="request-text"></div>
            </div>
            <div className="request-area">
              <span>PROJECT IDEA</span>
              <div className="request-text"></div>
            </div>
            <div className="btn-div-import">
              <button className="btn-black-import">ACCEPT</button>
              <button className="btn-black-import">DECLINE</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalImportStudents;
