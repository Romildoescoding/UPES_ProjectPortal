import validateEmail from "../../helpers/emailValidate";
import Loader from "../../ui/Loader";
import { useUser } from "../authentication/signin/useUser";
import Request from "./Request";
import useRequests from "./useRequests";
import EmptyComponent from "../../ui/EmptyComponent";
import Spinner from "../../ui/Spinner";

function ModalImportStudents({ setShowModal }) {
  const { data: user, isFetching } = useUser();
  const name = user?.user?.name;
  let { data: mentorshipRequests, isFetching: isFetching2 } = useRequests({
    name,
    isMentor: true,
    isMentorAccepted: "false",
  });

  console.log({
    name,
    isMentor: true,
    isMentorAccepted: "false",
  });

  //IF isFetching
  console.log(isFetching || isFetching2);
  if (isFetching || isFetching2) return <Spinner />;
  return (
    <div className="add-students">
      <button
        className="btn-close"
        onClick={(e) => {
          e.preventDefault();
          setShowModal("");
        }}
      >
        &times;
      </button>
      <div className="import-students-div">
        {!mentorshipRequests?.data?.length ? (
          <EmptyComponent
            size={24}
            msg="❗You do not have any pending mentorship request(s)❗"
          />
        ) : (
          <>
            <h3>MENTORSHIP REQUESTS</h3>
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
