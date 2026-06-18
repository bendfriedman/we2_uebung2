import type { IUser } from "../../login/state/loginSlice";

const UserCard = ({ user }: { user: IUser | null }) => {
  return (
    <div className="card user-card" id="UserCard">
      <img src="../../src/assets/user.png" className="card-img-top" id="UserCardImage" alt="user image" />
      <ul className="list-group list-group-flush">
        <li className="list-group-item">UserID: {user?.userID}</li>
        <li className="list-group-item">First Name: {user?.firstName}</li>
        <li className="list-group-item">Last Name: {user?.lastName}</li>
        <li className="list-group-item">Administrator: {user?.isAdministrator ? "Yes" : "No"}</li>
      </ul>
      <div className="card-body" id="UserCardButtons">
        <button type="button" className="btn btn-warning">
          Update
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;
