import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";  
import { useDispatch } from "react-redux";
import * as client from "./client"; 



export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    try {
      // 1. Sign in on the server
      await client.signin(credentials);
      
      // 2. Get session-backed profile
      const profile = await client.profile();
      console.log("Profile loaded:", profile);
  
      // 3. Save in Redux
      dispatch(setCurrentUser(profile));
  
      // 4. Navigate
      navigate("/Kambaz/Dashboard");
    } catch (err) {
      console.error("Signin error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };
  
  
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h1 className="text-center mb-4">Sign in</h1>
        <Form>
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              placeholder="Enter username"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
          </Form.Group>
          <Button id="wd-signin-btn" className="btn btn-primary w-100 mb-2" onClick={signin}>
            Sign in
          </Button>
        </Form>
        <div className="text-center">
          <Button
            id="wd-signup-link"
            className="btn btn-secondary w-100"
            onClick={() => navigate("/Kambaz/Account/Signup")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
}
