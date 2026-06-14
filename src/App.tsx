import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import type { RootState } from "./store";
import LandingPage from "./react/landingPage/components/LandingPage";
import StartPage from "./react/startPage/components/StartPage";
import Navbar from "./react/shared/components/Navbar";

function App() {
  const token = useSelector((state: RootState) => state.login.token);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={token ? <Navigate to="/start" replace /> : <LandingPage />} />
        <Route path="/start" element={token ? <StartPage /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
