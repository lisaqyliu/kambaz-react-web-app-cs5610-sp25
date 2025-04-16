import { Form, Button, InputGroup } from "react-bootstrap";
import { FaSearch, FaPlus, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAssignments, deleteAssignment, addAssignment, editAssignment } from "./reducer";
import * as assignmentsClient from "../Assignments/client";
import { useEffect } from "react";
import { findModulesForCourse } from "../client";


export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const filteredAssignments = assignments.filter((a: any) => a.course === cid);

  const handleDelete = async (assignmentId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this assignment?");
    if (confirmDelete) {
      try {
        await assignmentsClient.deleteAssignment(assignmentId);
        dispatch(deleteAssignment(assignmentId));
      } catch (err) {
        console.error("Failed to delete assignment:", err);
      }
    }
  };
  
  const handleAddAssignment = async () => {
    if (currentUser?.role === "FACULTY") {
      try {
        const modules = await findModulesForCourse(cid!);
        if (!modules || modules.length === 0) {
          alert("No module found for this course. Please add a module first.");
          return;
        }
  
        const moduleId = modules[0]._id;
        const newAssignment = {
          title: "New Assignment",
          description: "",
          points: 100,
          dueDate: "",
          availableDate: "",
          untilDate: "",
          module: moduleId,
          course: cid,
        };
  
        const createdAssignment = await assignmentsClient.createAssignment(moduleId, newAssignment);
        console.log("Created assignment from backend:", createdAssignment);
  
        const assignmentId = createdAssignment?._id?.toString();
        if (!assignmentId) {
          console.error("Invalid assignment ID:", createdAssignment._id);
          alert("Assignment creation failed: invalid ID.");
          return;
        }
  
        dispatch(addAssignment({ ...createdAssignment, course: cid, module: moduleId }));
        dispatch(editAssignment(assignmentId));
        navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
      } catch (err) {
        console.error("Failed to add assignment:", err);
        alert("Assignment creation failed.");
      }
    }
  };
  
  const handleEdit = (assignmentId: string) => {
    console.log("Navigating to Assignment:", assignmentId);
    if (!assignmentId) {
      console.warn("Tried to edit undefined assignment!");
      return;
    }
  
    dispatch(editAssignment(assignmentId));
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };
  

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const modules = await findModulesForCourse(cid);
        if (!modules || modules.length === 0) {
          console.warn("No modules found for this course");
          return;
        }
  
        const moduleId = modules[0]._id;
        const fetchedAssignments = await assignmentsClient.findAssignmentsForModule(moduleId);
        
        console.log("Raw fetched assignments:", fetchedAssignments);
        const enriched = fetchedAssignments.map((a: any, index: number) => {
          // Generate a temporary ID if none exists
          const assignmentId = a._id || `temp-${moduleId}-${index}`;
          
          return {
            ...a,
            course: cid,
            _id: assignmentId
          };
        });
        
        console.log("Enriched assignment list:", enriched);
        dispatch(setAssignments(enriched));
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
      }
    };
  
    fetchAssignments();
  }, [cid, dispatch]);

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
          filteredAssignments.map((assignment: any, index: number) => (
            <div key={assignment._id || `index-${index}`} className="list-group-item d-flex justify-content-between align-items-center">
              <div
                className="text-decoration-none flex-grow-1 cursor-pointer"
                onClick={() => {
                  if (!assignment._id) {
                    console.warn("Skipping assignment with missing ID:", assignment);
                    return;
                  }
                  handleEdit(assignment._id);
                }}
              >
                <h5 className="mb-1">{assignment.title}</h5>
                <small className="text-muted">
                  Due {assignment.dueDate || "N/A"} | {assignment.points} pts
                </small>
              </div>
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
