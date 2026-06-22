import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../login/state/loginSlice";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.login.token);
  const user = useSelector((state: RootState) => state.login.user);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/start">
          BHT
        </NavLink>

        {token && (
          <div className="navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/start" id="OpenStartPageButton">
                  Home
                </NavLink>
              </li>
              {user?.isAdministrator && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/userManagement" id="OpenUserManagementPageButton">
                    User Management
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        )}

        <div>
          {token && (
            <button id="LogoutButton" className="btn btn-outline-danger" onClick={() => dispatch(logout())}>
              Logout
            </button>
          )}

          <button className="btn btn-outline-secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? (
              <i className="bi bi-moon-fill" onClick={() => setDarkMode(!darkMode)} />
            ) : (
              <i className="bi bi-moon" onClick={() => setDarkMode(!darkMode)} />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
