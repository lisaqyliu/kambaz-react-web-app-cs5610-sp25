import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();

  const isActive = (route: string) => location.pathname.includes(route);

  return (
    <div className="d-flex flex-column">
      {!currentUser && (
        <>
          <Link
            to="/Kambaz/Account/Signin"
            className={`fs-5 text-decoration-none mb-2 d-flex align-items-center ${
              isActive("Signin") ? "fw-bold text-dark" : "text-danger"
            }`}
            style={
              isActive("Signin")
                ? { borderLeft: "4px solid black", paddingLeft: "8px" }
                : { paddingLeft: "12px" }
            }
          >
            Signin
          </Link>

          <Link
            to="/Kambaz/Account/Signup"
            className={`fs-5 text-decoration-none mb-2 d-flex align-items-center ${
              isActive("Signup") ? "fw-bold text-dark" : "text-danger"
            }`}
            style={
              isActive("Signup")
                ? { borderLeft: "4px solid black", paddingLeft: "8px" }
                : { paddingLeft: "12px" }
            }
          >
            Signup
          </Link>
        </>
      )}

      {currentUser && (
        <>
          <Link
            to="/Kambaz/Account/Profile"
            className={`fs-5 text-decoration-none mb-2 d-flex align-items-center ${
              isActive("Profile") ? "fw-bold text-dark" : "text-danger"
            }`}
            style={
              isActive("Profile")
                ? { borderLeft: "4px solid black", paddingLeft: "8px" }
                : { paddingLeft: "12px" }
            }
          >
            Profile
          </Link>

          {currentUser.role === "ADMIN" && (
            <Link
              to="/Kambaz/Account/Users"
              className={`fs-5 text-decoration-none d-flex align-items-center ${
                isActive("Users") ? "fw-bold text-dark" : "text-danger"
              }`}
              style={
                isActive("Users")
                  ? { borderLeft: "4px solid black", paddingLeft: "8px" }
                  : { paddingLeft: "12px" }
              }
            >
              Users
            </Link>
          )}
        </>
      )}
    </div>
  );
}
