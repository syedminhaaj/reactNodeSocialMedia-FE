import React, { useEffect, useState, useRef } from "react";
import { logout as logoutAction } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../features/postSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./allStyles/Navbar.css";
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [searchText, setSearchText] = useState("");

  const authStoreState = useSelector((state) => state.auth);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);
    dispatch(setSearchQuery(query)); // Dispatch the search query to Redux
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const logout = () => {
    dispatch(logoutAction());
    navigation("/login");
    setIsOpen(false);
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
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/createpost">
                    Create Post
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/profile/${authStoreState?.username}`}
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item dropdown navbar-nav">
                  <span className="nav-link" onClick={toggleDropdown}>
                    {authStoreState.username} ▼
                  </span>
                  {isOpen && (
                    <div className="dropdown-menu show" ref={dropdownRef}>
                      <ul style={{ listStyle: "none" }}>
                        <li>
                          <Link to="/login" onClick={logout}>
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search posts..."
                    value={searchText}
                    onChange={handleSearch}
                    style={{ maxWidth: "300px", marginLeft: "20px" }}
                  />
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
