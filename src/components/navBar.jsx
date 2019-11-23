import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <div>
      {user && (
        <React.Fragment>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/movies">
              Video City
            </Link>

            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#collapse_target"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="collapse_target">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/movies">
                    Movies <span className="sr-only">(current)</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/customers">
                    Customers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/rentals">
                    Rentals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    {user.name}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </React.Fragment>
      )}
    </div>
  );
};

export default NavBar;
