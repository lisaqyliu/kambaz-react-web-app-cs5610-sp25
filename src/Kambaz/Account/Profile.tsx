import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="d-flex justify-content-center mt-5">
      <div className="w-50 p-4 border rounded shadow-sm">
        <h3 className="text-center mb-4">Profile</h3>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="alice" placeholder="Username" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="123" type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="Alice" placeholder="First Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="Wonderland" placeholder="Last Name" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="2000-01-01" type="date" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control defaultValue="alice@wonderland" type="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select defaultValue="FACULTY">
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control as="textarea" placeholder="Additional Info" />
          </Form.Group>
          <Link to="/Kambaz/Account/Signin" className="btn btn-danger w-100">
            Sign out
          </Link>
        </Form>
      </div>
    </div>
  );
}
