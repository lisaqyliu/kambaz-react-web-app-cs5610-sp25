import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateAssignment, editAssignment } from "./reducer";
import * as assignmentsClient from "./client";
import { findModulesForCourse } from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const assignment = assignments.find((a: any) => a._id?.toString() === aid);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  console.log("Editor CID:", cid);
  console.log("Editor AID:", aid);
  console.log("Redux Assignments:", assignments);
  if (currentUser?.role !== "FACULTY") {return <div className="p-4 text-danger">Unauthorized to edit assignments.</div>;}

  const [form, setForm] = useState({
    _id: aid,
    course: cid,
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
    untilDate: ""
  });

  useEffect(() => {
    const fetchAssignment = async () => {
      if (!assignment && cid && aid) {
        try {
          const modules = await findModulesForCourse(cid);
          const moduleId = modules[0]?._id;
          if (!moduleId) {
            console.warn("No module found for course", cid);
            return;
          }
  
          const result = await assignmentsClient.findAssignmentById(aid, moduleId);
          if (result) {
            setForm({ ...result, _id: String(result._id) });
          }
        } catch (err) {
          console.error("Failed to fetch assignment by ID:", err);
        }
      } else if (assignment) {
        setForm(assignment);
      }
      setLoading(false);
    };
  
    fetchAssignment();
  }, [assignment, cid, aid]);
  
  
  

  const handleSave = async () => {
    try {
      const updated = await assignmentsClient.updateAssignment(form);
      dispatch(updateAssignment(updated));
      dispatch(editAssignment("")); 
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (err) {
      console.error("Failed to update assignment:", err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleCancel = () => {
    dispatch(editAssignment("")); // Clear editing flag
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  
  
  if (loading) {
    return <div className="p-4 text-muted">Loading assignment...</div>;
  }
  
  if (!form.title) {
    return <div className="p-4 text-danger">Assignment not found.</div>;
  }
  
  

  return (
    <Container className="p-4">
      <h2 className="mb-4">Assignment Editor</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={form.title ?? ""}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.description ?? ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={form.points ?? ""}
            onChange={(e) => setForm({ ...form, points: Number(e.target.value) })}
          />
        </Form.Group>

        <Card className="mb-3 p-3">
          <Card.Body>
            <Card.Title>Due Dates</Card.Title>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Due</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.dueDate ?? ""}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.availableDate ?? ""}
                    onChange={(e) => setForm({ ...form, availableDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.untilDate ?? ""}
                    onChange={(e) => setForm({ ...form, untilDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </Container>
  );
}
