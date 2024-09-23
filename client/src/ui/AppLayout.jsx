import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <ProtectedRoute>
      <main>
        <Header />
        <div className="main">
          <div className="dashboard">
            <div className="sidebar-div">
              <Sidebar />
            </div>
            <Outlet />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

export default AppLayout;
