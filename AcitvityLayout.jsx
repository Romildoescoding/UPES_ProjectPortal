import { Outlet } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
// import Sidebar from "./Sidebar";
import Activitysidebar from "./Actvitysidebar";

function AppLayout() {
  return (
    <ProtectedRoute>
      <main>
        <Header />
        <div className="main">
          <div className="dashboard">
            <div className="sidebar-div">
              <Activitysidebar />
            </div>
            <Outlet/>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}

export default AcitivityLayout;
