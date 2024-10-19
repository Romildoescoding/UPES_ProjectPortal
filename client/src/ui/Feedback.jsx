import Lock from "../../public/svg/Lock";
import { useUser } from "../features/authentication/signin/useUser";
import useGrades from "../features/mentorship/useGrades";
import useRemoteVariables from "../features/mentorship/useRemoteVariables";
import Pill from "./Pill";
import Spinner from "./Spinner";

function Feedback() {
  const { data: user, isLoading } = useUser();
  const mail = user?.user?.mail;
  const { data: variables, isFetching } = useRemoteVariables();
  const visibility = variables?.variables?.[0]?.["value"] || "false";
  console.log(visibility);

  const { data, isFetching: isFetching2 } = useGrades({
    mail,
  });
  console.log(data);
  if (isFetching || isFetching2) return <Spinner />;
  return (
    <div className="feedback">
      {visibility === "true" ? (
        <>
          <div className="feedback-header">
            <p className="dashboard-heading">Grades Received</p>
            <p className="dashboard-heading-sm">Marks Allotted: 100</p>
          </div>

          <div className="feedback-container">
            <div className="feedback-row header-row">
              <div className="column">Event Name</div>
              <div className="column">Grade Recieved</div>
              <div className="column">Status</div>
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
        </>
      ) : (
        <>
          <div className="hidden-feedback-overlay">
            <Lock />
            <p>
              Your AC has chosen not to allow students the access to their marks
            </p>
          </div>
          <div className="hidden-feedback">
            <div className="feedback-header">
              <p className="dashboard-heading">Grades Received</p>
              <p className="dashboard-heading-sm">Marks Allotted: O_O</p>
            </div>

            <div className="feedback-container">
              <div className="feedback-row header-row">
                <div className="column">Name</div>
                <div className="column">Received</div>
                <div className="column">Action</div>
              </div>

              <div className="feedback-row">
                <div className="column">Caught you tryna be Smart !</div>
                <div className="column">Right now</div>
                <div className="column">
                  <Pill text="At Risk" type="danger" />
                </div>
              </div>
              <div className="feedback-row">
                <div className="column">Altering the CSS !!</div>
                <div className="column">Damn! O_O</div>
                <div className="column">
                  <Pill text="At Risk" type="safe" />
                </div>
              </div>
              <div className="feedback-row">
                <div className="column">Comeon man !!!</div>
                <div className="column">Whatever it is &gt;&lt;</div>
                <div className="column">
                  <Pill text="At Risk" type="normal" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Feedback;
