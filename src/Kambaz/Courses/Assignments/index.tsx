import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment, addAssignment } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const filteredAssignments = assignments.filter((a: any) => a.course === cid);

  const handleDelete = (assignmentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleAddAssignment = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
  };

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
          {currentUser?.role === "FACULTY" && (
            <Button variant="danger" onClick={handleAddAssignment}>
              <FaPlus className="me-2" /> Assignment
            </Button>
          )}
        </div>
      </div>

      {/* Assignments List */}
      <div className="list-group">
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment: any) => (
            <div key={assignment._id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link 
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} 
                className="text-decoration-none flex-grow-1"
              >
                <h5 className="mb-1">{assignment.title}</h5>
                <small className="text-muted">
                  Due {assignment.dueDate || "N/A"} | {assignment.points} pts
                </small>
              </Link>
              {currentUser?.role === "FACULTY" && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(assignment._id)}
                >
                  <FaTrash />
                </Button>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted">No assignments available for this course.</p>
        )}
      </div>
    </div>
  );
}