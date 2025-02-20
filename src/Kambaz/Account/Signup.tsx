import { Form } from "react-bootstrap";
import { Link } from "react-router";

export default function Signup() {
    return (
      <div id="wd-signup-screen" className="d-flex justify-content-center mt-5">
        <div className="w-50 p-4 border rounded shadow-sm">
          <h3 className="text-center mb-4">Sign up</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control placeholder="Username" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Verify Password" />
            </Form.Group>
            <Link to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2">
              Sign up
            </Link>
          </Form>
          <div className="text-center">
            <Link to="/Kambaz/Account/Signin">Sign in</Link>
          </div>
        </div>
      </div>
    );
  }
  