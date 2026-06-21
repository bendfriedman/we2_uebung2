import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";
import { useEffect } from "react";
import { fetchUsersThunk } from "../state/userManagementSlice";
import UserList from "../components/UserList";
import CreateUserComponent from "../components/CreateUserComponent";
import { useState } from "react";

const UserManagementPage = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const allUsers: IUser[] = useSelector(
    (state: RootState) => state.userManagement.users,
  );

  type UserView = "list" | "create" | "edit";
  const [view, setView] = useState<UserView>("list");

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (token) {
      dispatch(fetchUsersThunk(token));
    }
  }, [token, dispatch]);

  return (
    <div className="page" id="UserManagementPage">
      <h2>User Management Page der BHT</h2>
      <div className="btn-group" role="group" aria-label="User view toggle">
        <input
          type="radio"
          className="btn-check"
          name="userView"
          id="viewList"
          checked={view === "list"}
          onChange={() => setView("list")}
        />
        <label className="btn btn-outline-primary" htmlFor="viewList">
          Show All Users
        </label>

        <input
          type="radio"
          className="btn-check"
          name="userView"
          id="UserManagementPageCreateUserButton"
          checked={view === "create"}
          onChange={() => setView("create")}
        />
        <label
          className="btn btn-outline-primary"
          htmlFor="UserManagementPageCreateUserButton"
        >
          Create New User
        </label>
      </div>
      {view == "create" && <CreateUserComponent />}
      {view == "list" && <UserList allUsers={allUsers} />}
    </div>
  );
};

export default UserManagementPage;
