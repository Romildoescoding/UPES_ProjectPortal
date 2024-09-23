import validateEmail from "../../helpers/emailValidate";
import Loader from "../../ui/Loader";
import { useUser } from "../authentication/signin/useUser";
import Request from "./Request";
import useRequests from "./useRequests";
import EmptyComponent from "../../ui/EmptyComponent";

function ModalImportStudents({ setShowModal }) {
  const { data: user, isLoading } = useUser();
  const name = user?.user?.name;
  let { data: mentorshipRequests, isLoading2 } = useRequests({
    name,
    isMentor: true,
    isMentorAccepted: "false",
  });

  console.log({
    name,
    isMentor: true,
    isMentorAccepted: "false",
  });

  //IF ISLOADING
  if (isLoading || isLoading2) <Loader />;
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
        {!mentorshipRequests?.data?.length ? (
          <EmptyComponent
            size={32}
            msg="❗You do not have any pending mentorship request(s)❗"
          />
        ) : (
          <>
            {" "}
            <h1 className="project-field-heading">MENTORSHIP REQUESTS</h1>
            <div className="requests-div">
              {mentorshipRequests?.data?.map((request) => (
                <Request request={request} key={request.id} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalImportStudents;
