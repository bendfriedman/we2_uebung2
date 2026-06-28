import type { IUser } from "../../login/state/loginSlice";
import UserCardComponent from "./UserCardComponent";

interface UserListProps {
  allUsers: IUser[];
  onUserDeleted: () => void;
  onEditView: (selectedUser: IUser) => void;
  loading: Boolean;
}

const UserListComponent = ({
  allUsers,
  onUserDeleted,
  onEditView,
  loading,
}: UserListProps) => {
  return (
    <div id="UserManagementPageListComponent">
      <p className="page-description">
        Hier können Sie Ihre Benutzer verwalten und den Status Ihrer Bewerbungen
        einsehen.
      </p>
      {loading && (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="user-list">
        {allUsers.map((user) => (
          <UserCardComponent
            key={user.userID}
            user={user}
            onUserDeleted={onUserDeleted}
            onEditView={onEditView}
          />
        ))}
      </div>
    </div>
  );
};

export default UserListComponent;
