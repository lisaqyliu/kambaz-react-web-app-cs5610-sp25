import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();

  return (
    <div className="d-flex flex-column">
      <Link
        to="/Kambaz/Account/Signin"
        className={`fs-5 text-decoration-none mb-2 d-flex align-items-center ${location.pathname.includes("Signin") ? "fw-bold text-dark" : "text-danger"}`}
        style={location.pathname.includes("Signin") ? { borderLeft: "4px solid black", paddingLeft: "8px" } : { paddingLeft: "12px" }}
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        className={`fs-5 text-decoration-none mb-2 d-flex align-items-center ${location.pathname.includes("Signup") ? "fw-bold text-dark" : "text-danger"}`}
        style={location.pathname.includes("Signup") ? { borderLeft: "4px solid black", paddingLeft: "8px" } : { paddingLeft: "12px" }}
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        className={`fs-5 text-decoration-none d-flex align-items-center ${location.pathname.includes("Profile") ? "fw-bold text-dark" : "text-danger"}`}
        style={location.pathname.includes("Profile") ? { borderLeft: "4px solid black", paddingLeft: "8px" } : { paddingLeft: "12px" }}
      >
        Profile
      </Link>
    </div>
  );
}

