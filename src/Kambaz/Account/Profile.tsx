import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import * as client from "./client";

// Helper function to format date for input field
const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD
  } catch (e) {
    console.error("Date formatting error:", e);
    return "";
  }
};

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    try {
      const updated = await client.updateUser(profile);
      dispatch(setCurrentUser(updated)); 
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const signout = () => {
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  useEffect(() => {
    if (currentUser) {
      setProfile(currentUser);
    } else {
      navigate("/Kambaz/Account/Signin");
    }
  }, [currentUser, navigate]);

  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h3 className="text-center mb-4">Profile</h3>
        
        {/* Success message */}
        {success && (
          <Alert variant="success" className="mb-3">
            Profile updated successfully!
          </Alert>
        )}
        
        {profile && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={profile.username}
                id="wd-username"
                onChange={(e) =>
                  setProfile({ ...profile, username: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                defaultValue={profile.password}
                id="wd-password"
                onChange={(e) =>
                  setProfile({ ...profile, password: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={profile.firstName}
                id="wd-firstname"
                onChange={(e) =>
                  setProfile({ ...profile, firstName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={profile.lastName}
                id="wd-lastname"
                onChange={(e) =>
                  setProfile({ ...profile, lastName: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="date"
                value={formatDateForInput(profile.dob)}
                id="wd-dob"
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                defaultValue={profile.email}
                id="wd-email"
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Select
              className="form-control mb-2"
              id="wd-role"
              value={profile.role || "USER"}
              onChange={(e) =>
                setProfile({ ...profile, role: e.target.value })
              }
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
            <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
            <Button onClick={signout} className="w-100 mb-2 btn btn-danger" id="wd-signout-btn">
              Sign out
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
}
