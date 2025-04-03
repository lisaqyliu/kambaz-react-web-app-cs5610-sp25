import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useState } from "react";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "", verifyPassword: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    if (user.password !== user.verifyPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (err: any) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const handleGoToSignin = () => {
    navigate("/Kambaz/Account/Signin");
  };

  return (
    <div id="wd-signup-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h3 className="text-center mb-4">Sign up</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Verify Password"
              value={user.verifyPassword}
              onChange={(e) => setUser({ ...user, verifyPassword: e.target.value })}
            />
          </Form.Group>
          <Button
            id="wd-signup-btn"
            className="btn btn-primary w-100 mb-2"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </Form>
        <Button
          id="wd-signin-btn"
          variant="primary"
          className="w-100"
          onClick={handleGoToSignin}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}
