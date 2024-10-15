import React, { useContext, useState } from "react";
import { logout as logoutAction } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const authStoreState = useSelector((state) => state.auth);
  const logout = () => {
    dispatch(logoutAction());
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Feta
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                View Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/createpost">
                Create Post
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                Profile (testing)
              </Link>
            </li>
            {!authStoreState.isAuthenticated ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/registration">
                    Registration
                  </a>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <a className="nav-link" onClick={logout}>
                  Logout
                </a>
              </li>
            )}
          </ul>
          <span> {authStoreState.username}</span>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
