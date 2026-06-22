import { useState } from "react";
import type { IUser } from "../../login/state/loginSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import ConfirmDeleteDialogComponent from "./ConfirmDeleteDialogComponent";
import userImage from "../../../assets/user.png";

interface UserCardComponentProps {
  user: IUser;
  onUserDeleted: () => void;
  onEditView: (selectedUser: IUser) => void;
}

const UserCardComponent = ({ user, onUserDeleted, onEditView }: UserCardComponentProps) => {
  const token = useSelector((state: RootState) => state.login.token);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const deleteUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/users/${user.userID}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="card user-card" id={`UserItem${user.userID}`}>
      <img src={userImage} className="card-img-top" id="UserCardImage" alt="user image" />
      <ul className="list-group list-group-flush">
        <li className="list-group-item" id="UserID">
          UserID: {user.userID}
        </li>
        <li className="list-group-item" id="FirstName">
          First Name: {user.firstName}
        </li>
        <li className="list-group-item" id="LastName">
          Last Name: {user.lastName}
        </li>
        <li className="list-group-item">Administrator: {user.isAdministrator ? "Yes" : "No"}</li>
      </ul>
      <div className="card-body" id="UserCardButtons">
        <button
          type="button"
          className="btn btn-warning"
          id={`UserItemEditButton${user.userID}`}
          onClick={() => onEditView(user)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-danger"
          id={`UserItemDeleteButton${user.userID}`}
          onClick={() => setIsDialogOpen(true)}
        >
          Delete
        </button>
      </div>
      <ConfirmDeleteDialogComponent
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={async () => {
          await deleteUser();
          onUserDeleted();
          setIsDialogOpen(false);
        }}
        user={user}
      />
    </div>
  );
};

export default UserCardComponent;
