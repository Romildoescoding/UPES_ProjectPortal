import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <main>
      <Header />
      <div className="main">
        <Outlet />
      </div>
    </main>
  );
}

export default AppLayout;
