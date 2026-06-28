import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";
import { useEffect } from "react";
import UserListComponent from "../components/UserListComponent";
import CreateUserComponent from "../components/CreateUserComponent";
import EditUserComponent from "../components/EditUserComponent";

type UserView = "list" | "create" | "edit";

const UserManagementPage = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [view, setView] = useState<UserView>("list");
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<IUser | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const loadAllUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const result = await response.json();
      setAllUsers(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadAllUsers();
    }
  }, [token]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  return (
    <div className="page" id="UserManagementPage">
      {/* Hidden button for silenium tests by prof */}
      <button
        id="UserManagementPageCreateUserButton"
        style={{ display: "none" }}
        onClick={() => setView("create")}
      />
      {/* // */}
      <h2>User Management Page der BHT</h2>
      <div
        className="btn-group"
        role="group"
        aria-label="User view toggle"
        id="user-view-toggle"
      >
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
          onChange={() => {
            setView("create");
            setSuccessMessage(null);
          }}
        />
        <label className="btn btn-outline-primary" htmlFor="createView">
          Create New User
        </label>
      </div>
      {successMessage && (
        <div
          className="alert alert-success alert-dismissible"
          id="user-mgmt-success-message"
          role="alert"
        >
          {successMessage}
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccessMessage(null)}
          />
        </div>
      )}

      {view == "create" && (
        <CreateUserComponent
          onUserCreated={() => {
            setSuccessMessage("User successfully created!");
            loadAllUsers();
            setView("list");
          }}
        />
      )}
      {view == "list" && (
        <UserListComponent
          allUsers={allUsers}
          onUserDeleted={() => {
            loadAllUsers();
            setSuccessMessage("User successfully deleted!");
          }}
          onEditView={(selectedUser) => {
            setSelectedUserForEdit(selectedUser);
            setView("edit");
            setSuccessMessage(null);
          }}
          loading={loading}
        />
      )}
      {view == "edit" && (
        <EditUserComponent
          selectedUser={selectedUserForEdit!}
          onListView={() => setView("list")}
          onUserEdited={() => {
            setSuccessMessage("User successfully edited!");
            loadAllUsers();
            setView("list");
          }}
        />
      )}
    </div>
  );
};

export default UserManagementPage;
