import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";

interface EditUserComponentProps {
  onUsereditd: () => void;
}

const EditUserComponent = () => {
  const token = useSelector((state: RootState) => state.login.token);
  const [userID, setUserID] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdministrator, setIsAdministrator] = useState<string>("");

  const editUser = async (newUser: IUser & { password: string }) => {
    try {
      const respone = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!respone.ok) {
        throw new Error("Failed to edit new user!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="UserManagementPageEditComponent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newUser = {
            userID: userID,
            firstName: firstName,
            lastName: lastName,
            password: password,
            isAdministrator: isAdministrator === "true",
          };
          editUser(newUser);
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

        <button id="EditUserComponenteditUserButton" className="btn btn-success" type="submit">
          <i className="bi bi-plus-circle" />
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditUserComponent;
