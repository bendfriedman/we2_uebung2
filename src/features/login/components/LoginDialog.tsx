import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { loginThunk } from "../state/loginSlice";

interface LoginDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginDialog = ({ isOpen, onClose }: LoginDialogProps) => {
  const [userID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state: RootState) => state.login.error);
  const loading = useSelector((state: RootState) => state.login.loading);

  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) return null;
  return (
    <div id="LoginDialog" className="modal d-block" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Dialog</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>

          <form
            id="LoginForm"
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(loginThunk({ userID, password }));
            }}
          >
            <div className="modal-body">
              <label>
                User ID:
                <input
                  id="LoginDialogUserIDText"
                  className="form-control"
                  type="text"
                  autoFocus
                  name="userID"
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                />
              </label>
              <br />
              <label>
                Password:
                <input
                  id="LoginDialogPasswordText"
                  className="form-control"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <br />
            <div className="modal-footer">
              {error && (
                <p id="LoginErrorMessage" style={{ color: "red" }}>
                  {error}
                </p>
              )}

              {loading ? (
                <button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status"> Logging in...</span>
                </button>
              ) : (
                <button id="PerformLoginButton" className="btn btn-primary" type="submit">
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
