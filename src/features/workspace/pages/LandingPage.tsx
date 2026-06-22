import { useState } from "react";
import LoginDialog from "../../login/components/LoginDialogComponent";

const LandingPage = () => {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  return (
    <div className="page" id="LandingPage">
      <h2>Landing Page der BHT</h2>
      <p className="page-description" id="LandingPageDescription">
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
