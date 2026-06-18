import UserCard from "../components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";
import { useEffect } from "react";
import { fetchUsersThunk } from "../state/userManagementSlice";

const UserManagementPage = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const allUsers: IUser[] = useSelector((state: RootState) => state.userManagement.users);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsersThunk(token));
    }
  }, []);

  return (
    <div className="page" id="UserManagementPage">
      <h2>User Management Page der BHT</h2>
      <p className="page-description">
        Hier können Sie Ihre Benutzer verwalten und den Status Ihrer Bewerbungen einsehen.
      </p>
      {allUsers.map((user) => (
        <UserCard key={user.userID} user={user} />
      ))}
    </div>
  );
};

export default UserManagementPage;
