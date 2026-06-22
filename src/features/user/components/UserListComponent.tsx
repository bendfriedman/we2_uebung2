import type { IUser } from "../../login/state/loginSlice";
import UserCardComponent from "./UserCardComponent";

interface UserListProps {
  allUsers: IUser[];
  onUserDeleted: () => void;
  onEditView: (selectedUser: IUser) => void;
}

const UserList = ({ allUsers, onUserDeleted, onEditView }: UserListProps) => {
  return (
    <div id="UserManagementPageListComponent">
      <p className="page-description">
        Hier können Sie Ihre Benutzer verwalten und den Status Ihrer Bewerbungen einsehen.
      </p>
      <div className="user-list">
        {allUsers.map((user) => (
          <UserCardComponent key={user.userID} user={user} onUserDeleted={onUserDeleted} onEditView={onEditView} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
