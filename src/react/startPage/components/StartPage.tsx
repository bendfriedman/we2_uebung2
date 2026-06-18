import { useSelector } from "react-redux";
import "./StartPage.scss";
import type { RootState } from "../../../store";

const StartPage = () => {
  const userID = useSelector((state: RootState) => state.login.userID);
  console.log("StartPage: userID =", userID);
  return (
    <div id="StartPage">
      <h2>Start Page der BHT</h2>
      <p id="StartPageDescription">
        <b>Willkommen, {userID}!</b>
        <br /> Hier können Sie Ihre Bewerbungen verwalten und den Status Ihrer
        Bewerbungen einsehen.
      </p>
    </div>
  );
};

export default StartPage;
