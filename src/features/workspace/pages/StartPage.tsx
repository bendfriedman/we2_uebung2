import { useSelector } from "react-redux";
import type { RootState } from "../../store";

const StartPage = () => {
  const user = useSelector((state: RootState) => state.login.user);

  return (
    <div className="page" id="StartPage">
      <h2>Start Page der BHT</h2>
      <p className="page-description" id="StartPageDescription">
        <b>
          Willkommen, {user?.firstName} {user?.lastName}!
        </b>
        <br /> Hier können Sie Ihre Bewerbungen verwalten und den Status Ihrer Bewerbungen einsehen.
      </p>
    </div>
  );
};

export default StartPage;
