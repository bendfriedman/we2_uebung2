import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store";
import type { IUser } from "../../login/state/loginSlice";

interface CreateUserComponentProps {
  onUserCreated: () => void;
}

const CreateUserComponent = ({ onUserCreated }: CreateUserComponentProps) => {
  const token = useSelector((state: RootState) => state.login.token);
  const [userID, setUserID] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdministrator, setIsAdministrator] = useState<string>("false");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const createUser = async (newUser: IUser & { password: string }) => {
    try {
      const respone = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      if (!respone.ok) {
        throw new Error("Failed to create new user!");
      }
      onUserCreated();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="UserManagementPageCreateComponent">
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
          createUser(newUser);
        }}
      >
        <label>
          User ID:
          <input
            id="CreateUserComponentEditUserID"
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
            id="CreateUserComponentEditFirstName"
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
            id="CreateUserComponentEditLastName"
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
            id="CreateUserComponentEditPassword"
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
            id="CreateUserComponentEditIsAdministrator"
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </label>

        <button id="CreateUserComponentCreateUserButton" className="btn btn-success" type="submit">
          <i className="bi bi-plus-circle" />
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUserComponent;
