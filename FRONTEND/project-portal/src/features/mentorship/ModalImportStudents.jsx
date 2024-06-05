import validateEmail from "../../helpers/emailValidate";
import Request from "./Request";

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
    leader: "Dhruv",
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
    leader: "Harsh",
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
          {mentorshipRequests.map((request) => (
            <Request request={request} key={request.id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ModalImportStudents;
