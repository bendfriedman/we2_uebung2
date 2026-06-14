import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../login/state/loginSlice";
import "./Navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.login.token);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          BHT
        </a>
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
