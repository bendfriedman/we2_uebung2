import type { IUser } from "../../login/state/loginSlice";
import UserCard from "./UserCard";

const UserList = ({ allUsers }: { allUsers: IUser[] }) => {
  return (
    <div>
      <p className="page-description">
        Hier können Sie Ihre Benutzer verwalten und den Status Ihrer Bewerbungen
        einsehen.
      </p>
      <div className="user-list">
        {allUsers.map((user) => (
          <UserCard key={user.userID} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
