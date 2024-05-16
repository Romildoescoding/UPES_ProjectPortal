import { useEffect, useState } from "react";
import BackwardArrows from "../../public/svg/BackwardArrows";
import ForwardArrows from "../../public/svg/ForwardArrows";

function Pagination({
  numResultsToDisplay = 10,
  projects,
  setProjectsToDisplay,
}) {
  const [selectedPage, setSelectedPage] = useState(1);
  const pageNum = projects.length;
  const maxPage = Math.floor(pageNum / numResultsToDisplay) + 1;
  const pageArr = Array.from({ length: maxPage }, (_, i) => i + 1);

  useEffect(handlePageChange, [
    selectedPage,
    numResultsToDisplay,
    projects,
    setProjectsToDisplay,
  ]);

  function handlePageChange() {
    setProjectsToDisplay(
      projects.filter(
        (project, i) =>
          i + 1 <= selectedPage * numResultsToDisplay &&
          i + 1 > (selectedPage - 1) * numResultsToDisplay
      )
    );
  }
  return (
    <div className="pagination-div">
      <ul className="pagination">
        <button
          className="btn-arrows"
          onClick={() =>
            setSelectedPage((selectedPage) => {
              if (selectedPage === 1) return selectedPage;
              return selectedPage - 1;
            })
          }
        >
          <BackwardArrows />
        </button>
        {pageArr.map((page) => (
          <button
            className={`${selectedPage === page ? "selectedPage" : "pageNum"}`}
            key={page}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </button>
        ))}
        {
          <button
            className="btn-arrows"
            onClick={() =>
              setSelectedPage((selectedPage) => {
                if (selectedPage === maxPage) return selectedPage;
                return selectedPage + 1;
              })
            }
          >
            <ForwardArrows />
          </button>
        }
      </ul>
    </div>
  );
}

export default Pagination;
