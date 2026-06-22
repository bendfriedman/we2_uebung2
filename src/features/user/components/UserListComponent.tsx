import type { IUser } from "../../login/state/loginSlice";
import UserCardComponent from "./UserCardComponent";

interface UserListProps {
  allUsers: IUser[];
  onUserDeleted: () => void;
}

const UserList = ({ allUsers, onUserDeleted }: UserListProps) => {
  return (
    <>
      <p className="page-description">
        Hier können Sie Ihre Benutzer verwalten und den Status Ihrer Bewerbungen einsehen.
      </p>
      <div className="user-list">
        {allUsers.map((user) => (
          <UserCardComponent key={user.userID} user={user} onUserDeleted={onUserDeleted} />
        ))}
      </div>
    </>
  );
};

export default UserList;
