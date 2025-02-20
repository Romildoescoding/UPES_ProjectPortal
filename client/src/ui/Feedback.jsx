import Lock from "../../public/svg/Lock";
import { useUser } from "../features/authentication/signin/useUser";
import useGrades from "../features/mentorship/useGrades";
import useRemoteVariables from "../features/mentorship/useRemoteVariables";
import Pill from "./Pill";
import Spinner from "./Spinner";
import { useEvents } from "../features/events/useEvents";
import { useMemo } from "react";
import EmptyComponent from "../ui/EmptyComponent";

function Feedback() {
  const { data: user, isLoading } = useUser();
  const mail = user?.user?.mail;
  const branch = user?.user?.program;
  const type = useMemo(() => {
    switch (user?.user?.semester) {
      case 5:
        return "Minor-I";
      case 6:
        return "Minor-II";
      case 7:
        return "Major-I";
      case 8:
        return "Major-II";
      default:
        return "Unknown Project Type";
    }
  }, [user?.user?.semester]);

  const { data: variables, isFetching } = useRemoteVariables({
    branch,
    type,
  });

  const visibility = variables?.variables?.[0]?.["value"] || "false";

  const { data: grades, isFetching: isFetching2 } = useGrades({
    mail,
  });

  const { data: events, isFetching: isFetching3 } = useEvents();
  const gradesInformation = useMemo(() => {
    const gradesMap = new Map();

    // Pre-map events by their id for quick access
    const eventsMap = new Map(events?.data?.map((event) => [event.id, event]));

    // Process grades
    return grades?.data?.map((grade) => {
      const cachedEvent = gradesMap.get(grade["event-id"]);
      if (cachedEvent) return cachedEvent;

      // Look up the respective event using the pre-mapped events
      const respectiveEvent = eventsMap.get(grade["event-id"]);

      const gradeInfo = { grade, respectiveEvent };
      gradesMap.set(grade["event-id"], gradeInfo);

      return gradeInfo;
    });
  }, [grades?.data, events?.data]);

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
              <div className="column">Project Type</div>
              <div className="column">Grade Received</div>
            </div>

            {gradesInformation?.length > 0 ? (
              <div className="table-body">
                {gradesInformation?.map((grade, i) => (
                  <div key={i} className="feedback-row">
                    <div className="column">{grade.respectiveEvent?.name}</div>
                    <div className="column">{grade.respectiveEvent?.type}</div>
                    <div className="column">
                      <Pill
                        text={`${grade.grade?.grades} / 100`}
                        type={
                          grade.grade?.grades > 75
                            ? "safe"
                            : grade.grade?.grades > 50
                            ? "normal"
                            : "danger"
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ color: "black !important" }}>
                <EmptyComponent msg={"No grades to show yet."} />
              </span>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="hidden-feedback-overlay">
            <Lock />
            <p style={{ color: "#464646" }}>
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
                <div className="column">Event Name</div>
                <div className="column">Date</div>
                <div className="column">Grade Received</div>
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
