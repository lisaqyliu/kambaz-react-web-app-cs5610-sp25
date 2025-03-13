import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as db from "../Database";


export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = () => {
    const user = db.default.users.find(
      (u: any) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) {
      console.log("Invalid credentials");
      return;
    }
    console.log("Signed in successfully:", user);
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };
  
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h1 className="text-center mb-4">Sign in</h1>
        <Form>
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="Enter username" value={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control type="password" value={credentials.password} placeholder="Enter password"
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value})} />
          </Form.Group>
          <Button id="wd-signin-btn" className="btn btn-primary w-100 mb-2" onClick={signin}>
            Sign in
          </Button>
        </Form>
        <div className="text-center">
          <Button id="wd-signup-link" className="btn btn-primary w-100" onClick={() => navigate("/Kambaz/Account/Signup")}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}

