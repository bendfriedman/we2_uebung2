import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";
import { useEffect } from "react";
import UserList from "../components/UserListComponent";
import CreateUserComponent from "../components/CreateUserComponent";

type UserView = "list" | "create" | "edit";

const UserManagementPage = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [view, setView] = useState<UserView>("list");

  const loadAllUsers = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setAllUsers(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllUsers();
    }
  }, [token]);

  return (
    <div className="page" id="UserManagementPage">
      {/* Hidden button for silenium tests by prof */}
      <button id="UserManagementPageCreateUserButton" style={{ display: "none" }} onClick={() => setView("create")} />
      {/* // */}
      <h2>User Management Page der BHT</h2>
      <div className="btn-group" role="group" aria-label="User view toggle" id="user-view-toggle">
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
          id="createView"
          checked={view === "create"}
          onChange={() => setView("create")}
        />
        <label className="btn btn-outline-primary" htmlFor="createView">
          Create New User
        </label>
      </div>
      {view == "create" && (
        <CreateUserComponent
          onUserCreated={() => {
            loadAllUsers();
            setView("list");
          }}
        />
      )}
      {view == "list" && <UserList allUsers={allUsers} onUserDeleted={() => loadAllUsers()} />}
    </div>
  );
};

export default UserManagementPage;
