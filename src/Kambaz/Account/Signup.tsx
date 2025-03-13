import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Signup() {
  const navigate = useNavigate();
  const handleSignup = () => {
    navigate("/Kambaz/Account/Profile");
  }
  const handleGoToSignin = () => {
    navigate("/Kambaz/Account/Signin");
  }
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
            <Button id="wd-signmup-btn" className="btn btn-primary w-100 mb-2" onClick={handleSignup}>
              Sign up
            </Button>
          </Form>
          <Button id="wd-signin-btn" variant="primary" className="w-100" onClick={handleGoToSignin}>Sign in</Button>
        </div>
      </div>
    );
  }
  