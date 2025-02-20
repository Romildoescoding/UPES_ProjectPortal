import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";
import SidebarToggle from "../../public/svg/SidebarToggle";
import { createContext, useEffect, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import ErrorBoundary from "../pages/ErrorBoundary";

// const ContextProvider = createContext();
function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const bodyWidth = document.body.getBoundingClientRect().width;
    if (bodyWidth > 1005) {
      setIsSidebarOpen(true);
    }
    if (bodyWidth < 1005) {
      setIsSidebarOpen(false);
    }
  }, []);
  return (
    <ErrorBoundary>
      <ProtectedRoute>
        {/* <ContextProvider.Provider value={{confirm, setConfirm}}> */}
        <main>
          <Header />
          <div className="main">
            <div className="dashboard">
              <div
                // ref={ref}
                className="sidebar-toggle"
                onClick={() => setIsSidebarOpen((isOpen) => !isOpen)}
              >
                <SidebarToggle rotate={isSidebarOpen ? "90deg" : "0deg"} />
              </div>
              <div
                className="sidebar-div"
                style={{ display: isSidebarOpen ? "flex" : "none" }}
              >
                <Sidebar />
              </div>
              <Outlet />
            </div>
          </div>
        </main>
        {/* </ContextProvider.Provider> */}
      </ProtectedRoute>
    </ErrorBoundary>
  );
}

export default AppLayout;
