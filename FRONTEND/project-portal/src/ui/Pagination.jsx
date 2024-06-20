import { useEffect, useState } from "react";
import BackwardArrows from "../../public/svg/BackwardArrows";
import ForwardArrows from "../../public/svg/ForwardArrows";

function Pagination({ numResultsToDisplay, projects, setProjectsToDisplay }) {
  console.log(projects);
  console.log(numResultsToDisplay);
  console.log(numResultsToDisplay);
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
    <div
      className="pagination-div"
      style={{ display: numResultsToDisplay >= projects.length ? "none" : "" }}
    >
      <ul className="pagination">
        <button
          className="btn-arrows pagination-btn"
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
            className={`${
              selectedPage === page ? "selectedPage" : "pageNum"
            } pagination-btn`}
            key={page}
            onClick={() => setSelectedPage(page)}
          >
            {page}
          </button>
        ))}
        {
          <button
            className="btn-arrows pagination-btn"
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
