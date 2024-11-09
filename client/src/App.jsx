import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FacultyDashboard from "./pages/FacultyDashboard";
import ActivityCoDashboard from "./pages/ActivityCoDashboard";
import PanelMembersDashboard from "./pages/PanelMembersDashboard";
import toast, { Toaster } from "react-hot-toast";
import PasswordReset from "./pages/PasswordReset";
import Error from "./ui/Error";
import DoesNotExist from "./ui/DoesNotExist";
import ErrorBoundary from "./pages/ErrorBoundary.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/student", element: <Dashboard /> },
      { path: "/faculty", element: <FacultyDashboard /> },
      { path: "/activity-coordinator", element: <ActivityCoDashboard /> },
      { path: "/panel-members", element: <PanelMembersDashboard /> },
    ],
  },
  { path: "/signin", element: <Signin /> },
  { path: "/reset-password/:token", element: <PasswordReset /> },
  {
    path: "*",
    element: <DoesNotExist />,
  },
]);

function App() {
  return (
    <>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
