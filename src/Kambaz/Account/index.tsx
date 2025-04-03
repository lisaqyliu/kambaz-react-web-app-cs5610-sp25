import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Profile from "./Profile";
import Signup from "./Signup";
import AccountNavigation from "./Navigation"; // Sidebar navigation
import { useSelector } from "react-redux";
import Session from "./Session";


export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  console.log("Current user:", currentUser);

  return (
    <Session>
      <div id="wd-account-screen">
        <h2>Account</h2>
        <div className="d-flex">
          {/* Sidebar Navigation */}
          <div className="p-3">
            <AccountNavigation />
          </div>

          {/* Account Content Area */}
          <div className="flex-fill p-3">
            <Routes>
              <Route path="/" element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />} />
              <Route path="Signin" element={<Signin />} />
              <Route path="Profile" element={<Profile />} />
              <Route path="Signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </div>
    </Session>
  );
}


 