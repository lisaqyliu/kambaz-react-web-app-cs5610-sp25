import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { updateAssignment, editAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const assignments = useSelector((state: any) => state.assignmentsReducer.assignments);
  const assignment = assignments.find((a: any) => a._id === aid);

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
    if (assignment) {
      setForm(assignment);
    }
  }, [assignment]);

  const handleSave = () => {
    dispatch(updateAssignment(form));
    dispatch(editAssignment("")); // Clear editing flag
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    dispatch(editAssignment("")); // Clear editing flag
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (!assignment) return <div>Assignment not found.</div>;

  return (
    <Container className="p-4">
      <h2 className="mb-4">Assignment Editor</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={form.points}
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
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.availableDate}
                    onChange={(e) => setForm({ ...form, availableDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={form.untilDate}
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
