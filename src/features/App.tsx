import "./index.scss";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import type { RootState } from "./store";
import LandingPage from "./workspace/pages/LandingPage";
import StartPage from "./workspace/pages/StartPage";
import Navbar from "./workspace/components/Navbar";
import UserManagementPage from "./user/pages/UserManagementPage";
import NotFoundPage from "./workspace/pages/NotFoundPage";

function App() {
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/start" replace /> : <LandingPage />}
        />
        <Route
          path="/start"
          element={token ? <StartPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/userManagement"
          element={
            token && user?.isAdministrator ? (
              <UserManagementPage />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
