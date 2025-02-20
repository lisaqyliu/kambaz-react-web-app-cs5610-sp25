import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div id="wd-signin-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h1 className="text-center mb-4">Sign in</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control id="wd-username" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control id="wd-password" type="password" placeholder="Password" />
          </Form.Group>
          <Link id="wd-signin-btn" to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2">
            Sign in
          </Link>
        </Form>
        <div className="text-center">
          <Link id="wd-signup-link" to="/Kambaz/Account/Signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

