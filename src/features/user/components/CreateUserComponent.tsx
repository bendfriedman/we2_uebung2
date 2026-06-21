const CreateUserComponent = () => {
  return (
    <div id="UserManagementPageCreateComponent">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <label>
          User ID:
          <input
            id="CreateUserComponentEditUserID"
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
            className="form-control"
            type="text"
            name="firstName"
          />
        </label>
        <label>
          Last Name:
          <input
            id="CreateUserComponentEditLastName"
            className="form-control"
            type="text"
            name="lastName"
          />
        </label>
        <label>
          Password:
          <input
            id="CreateUserComponentEditPassword"
            className="form-control"
            type="password"
            name="Password"
          />
        </label>
        <label>
          isAdministrator:
          <select className="form-select" aria-label="Default select example">
            <option selected value="false">
              No
            </option>
            <option value="true">Yes</option>
          </select>
        </label>

        <button
          id="CreateUserComponentCreateUserButton"
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUserComponent;

// • CreateUserComponentCreateUserButton: ID des Eingabefelds, mit dem der User zum Administrator gemacht werden kann
