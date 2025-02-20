import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import assignments from "../../Database/assignments.json"; 

export default function Assignments() {
  const { cid } = useParams(); 
  const filteredAssignments = assignments.filter(a => a.course === cid);

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
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map(assignment => (
            <Link 
              key={assignment._id} 
              to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} 
              className="list-group-item list-group-item-action"
            >
              <h5 className="mb-1">{assignment.title}</h5>
              <small className="text-muted">Due May 20 at 11:59pm | 100pts</small>
            </Link>
          ))
        ) : (
          <p className="text-muted">No assignments available for this course.</p>
        )}
      </div>
    </div>
  );
}
