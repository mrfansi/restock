import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

export const Header = () => {
  const {user,logout} = useAuth();
  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar">
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          <div className="navbar-nav align-items-center">
            <div className="nav-item d-flex align-items-center">
              {user.name} | {user.email}
            </div>
          </div>

          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item lh-1 me-3">
              <span></span>
            </li>

            <li className="nav-item nav-link">
              <button className="btn btn-outline-primary" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}