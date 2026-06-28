import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";

interface EditUserComponentProps {
  selectedUser: IUser;
  onListView: () => void;
  onUserEdited: () => void;
}

const EditUserComponent = ({
  selectedUser,
  onListView,
  onUserEdited,
}: EditUserComponentProps) => {
  const token = useSelector((state: RootState) => state.login.token);
  const [userID, setUserID] = useState<string>(selectedUser.userID);
  const [firstName, setFirstName] = useState<string>(
    selectedUser.firstName ?? "",
  );
  const [lastName, setLastName] = useState<string>(selectedUser.lastName ?? "");
  const [password, setPassword] = useState<string>("");
  const [isAdministrator, setIsAdministrator] = useState<string>(
    selectedUser.isAdministrator ? "true" : "false",
  );

  const editUser = async (editedUser: IUser) => {
    try {
      const respone = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/users/${userID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        },
      );
      if (!respone.ok) {
        throw new Error("Failed to edit new user!");
      }
      onUserEdited();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="UserManagementPageEditComponent">
      <p className="page-description">
        Here you can edit the user {selectedUser.firstName}{" "}
        {selectedUser.lastName}.
      </p>
      <button
        type="button"
        id="OpenUserManagementPageListComponentButton"
        className="btn btn-primary"
        onClick={() => onListView()}
      >
        <i className="bi bi-arrow-left-circle" />
        Back to List
      </button>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const editedUser: any = {
            firstName: firstName,
            lastName: lastName,
            isAdministrator: isAdministrator === "true",
          };
          if (password !== "") editedUser.password = password;
          editUser(editedUser);
        }}
      >
        <label>
          User ID:
          <input
            id="EditUserComponentEditUserID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            className="form-control"
            type="text"
            autoFocus
            name="userID"
            disabled
          />
        </label>
        <label>
          First Name:
          <input
            id="EditUserComponentEditFirstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
            type="text"
            name="firstName"
          />
        </label>
        <label>
          Last Name:
          <input
            id="EditUserComponentEditLastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
            type="text"
            name="lastName"
          />
        </label>
        <label>
          Password:
          <input
            id="EditUserComponentEditPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            type="password"
            name="Password"
          />
        </label>
        <label>
          isAdministrator:
          <select
            value={isAdministrator}
            onChange={(e) => setIsAdministrator(e.target.value)}
            className="form-select"
            aria-label="Default select example"
            id="EditUserComponentEditIsAdministrator"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>

        <button
          id="EditUserComponentSaveUserButton"
          className="btn btn-success"
          type="submit"
        >
          <i className="bi bi-file-earmark-arrow-up" />
          Save
        </button>
      </form>
    </div>
  );
};

export default EditUserComponent;
