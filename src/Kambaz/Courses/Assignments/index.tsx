import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function Assignments() {
  const { cid } = useParams();
  return (
    <div className="p-4">
      <h3 className="mb-3">Assignments</h3>

      {/* Search Bar & Buttons */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control placeholder="Search for Assignments" />
        </InputGroup>

        <div>
          <Button variant="light" className="me-2">+ Group</Button>
          <Button variant="danger">
            <FaPlus className="me-2" />  Assignment
          </Button>
        </div>
      </div>

      {/* Assignments List */}
      <div className="list-group">
        <Link to={`/Kambaz/Courses/${cid}/Assignments/123`} className="list-group-item list-group-item-action">
          <h5 className="mb-1">A1 - ENV + HTML</h5>
          <small className="text-muted">Due May 13 at 11:59pm | 100pts</small>
        </Link>

        <Link to={`/Kambaz/Courses/${cid}/Assignments/124`} className="list-group-item list-group-item-action">
          <h5 className="mb-1">A2 - CSS + BOOTSTRAP</h5>
          <small className="text-muted">Due May 20 at 11:59pm | 100pts</small>
        </Link>

        <Link to={`/Kambaz/Courses/${cid}/Assignments/125`} className="list-group-item list-group-item-action">
          <h5 className="mb-1">A3 - JAVASCRIPT + REACT</h5>
          <small className="text-muted">Due May 27 at 11:59pm | 100pts</small>
        </Link>
      </div>
    </div>
  );
}
