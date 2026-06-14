import { useState } from "react";
import "./LandingPage.scss";
import LoginDialog from "../../login/components/LoginDialog";

const LandingPage = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
    <div id="LandingPage">
      <h2>Landing Page der BHT</h2>
      <p id="LandingPageDescription">
        Willkommen im Studiengang-Bewerbungsportal der BHT Berlin. Bewerben Sie sich jetzt für Ihren Wunschstudiengang.
      </p>
      <button id="OpenLoginDialogButton" className="btn btn-primary" onClick={() => setIsLoginDialogOpen(true)}>
        Login
      </button>
      <LoginDialog isOpen={isLoginDialogOpen} onClose={() => setIsLoginDialogOpen(false)} />
    </div>
  );
};

export default LandingPage;
