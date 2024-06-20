import { useEffect, useRef, useState } from "react";
import TextPill from "./TextPill";
import Pagination from "./Pagination";
import ActivityRequest from "./ActivityRequest";
import { useUser } from "../features/authentication/signin/useUser";
import useRequests from "../features/mentorship/useRequests";

function ActivityCoMarksTable({ mentorshipRequests }) {
  const [numResultsToDisplay, setNumResultsToDisplay] = useState(2);
  const [requestsToDisplay, setRequestsToDisplay] =
    useState(mentorshipRequests);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    function calculateRequestsToDisplay() {
      const containerHeight = tableContainerRef.current.clientHeight - 130;
      const containerWidth = tableContainerRef.current.clientWidth;
      const requestWidth =
        tableContainerRef.current.querySelector(".ac-request")?.clientWidth;
      const requestInWidth = Math.floor(
        (containerWidth - Math.floor(containerWidth / requestWidth) * 10) /
          requestWidth
      );
      const requestHeight =
        tableContainerRef.current.querySelector(".ac-request")?.clientHeight;
      const requestInHeight = Math.floor(containerHeight / requestHeight);
      const requestsToDisplay = requestInWidth * requestInHeight;
      //   console.log(
      //     containerHeight +
      //       "---------------" +
      //       requestHeight +
      //       "--------------" +
      //       requestsToDisplay
      //   );
      setNumResultsToDisplay(requestsToDisplay);
    }

    // THE HEIGHT IS CALCULATED AFTER EVERYTHING IS LOADED ON THE APP, ELSE IT RESULTS IN FALSE HEIGHT CALCULATION
    window.onload = calculateRequestsToDisplay;

    // Recalculate rows whenever the window is resized
    window.addEventListener("resize", calculateRequestsToDisplay);
    return () => {
      window.removeEventListener("resize", calculateRequestsToDisplay);
    };
  }, []);
  return (
    <div className="contents-bottom-faculty" ref={tableContainerRef}>
      <TextPill
        text={<span className="dashboard-heading">Marks awarded</span>}
        width={"100%"}
        height={35}
        isHeading={true}
        isCentered={true}
      />
      <div className="ac-marks-awarded" ref={tableContainerRef}>
        {requestsToDisplay?.map((request) => (
          <ActivityRequest key={request.teamid} request={request} />
        ))}
      </div>

      <Pagination
        numResultsToDisplay={numResultsToDisplay}
        projects={mentorshipRequests}
        setProjectsToDisplay={setRequestsToDisplay}
      />
    </div>
  );
}

export default ActivityCoMarksTable;
