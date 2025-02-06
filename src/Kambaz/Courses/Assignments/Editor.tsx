import { useParams } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const assignmentsData: Record<string, { name: string; description: string }> = {
  "123": { name: "A1 - ENV + HTML", description: "Submit a link to Netlify." },
  "124": { name: "A2 - CSS + BOOTSTRAP", description: "Apply styles using CSS and Bootstrap." },
  "125": { name: "A3 - JAVASCRIPT + REACT", description: "Build interactive components using React." }
};


export default function AssignmentEditor() {
  const { aid } = useParams(); // Get assignment ID from URL

  // Lookup assignment details, default to "Unknown Assignment"
  const assignment = assignmentsData[aid ?? ""] || { name: "Unknown Assignment", description: "No description available." };

  return (
    <Container className="p-4">
      <h2>Edit Assignment</h2>

      <Form>
        {/* Assignment Name and Description */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment.name} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} defaultValue={assignment.description} />
        </Form.Group>

        {/* Points and Assignment Group in a row */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" defaultValue="100" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select defaultValue="Assignments">
                <option>Assignments</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Display Grade As */}
        <Form.Group className="mb-3">
          <Form.Label>Display Grade As</Form.Label>
          <Form.Select>
            <option>Percentage</option>
            <option>Points</option>
          </Form.Select>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group className="mb-3">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select>
            <option>Online</option>
            <option>Text Entry</option>
            <option>Website URL</option>
            <option>Media Recordings</option>
            <option>Student Annotation</option>
            <option>File Uploads</option>
          </Form.Select>
        </Form.Group>

        {/* Online Entry Options inside a Card */}
        <Card className="mb-3 p-3">
          <Card.Body>
            <Card.Title>Online Entry Options</Card.Title>
            <Form.Check type="checkbox" label="Text Entry" />
            <Form.Check type="checkbox" label="Website URL" />
            <Form.Check type="checkbox" label="Media Recordings" />
            <Form.Check type="checkbox" label="Student Annotation" />
            <Form.Check type="checkbox" label="File Uploads" />
          </Card.Body>
        </Card>

        {/* Assign Section */}
        <Form.Group className="mb-3">
          <Form.Label>Assign To</Form.Label>
          <Form.Control defaultValue="Everyone" />
        </Form.Group>

        {/* Due Dates Section inside a Card */}
        <Card className="mb-3 p-3">
          <Card.Body>
            <Card.Title>Due Dates</Card.Title>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Due</Form.Label>
                  <Form.Control type="date" defaultValue="2024-05-13" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Available From</Form.Label>
                  <Form.Control type="date" defaultValue="2024-05-06" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Until</Form.Label>
                  <Form.Control type="date" defaultValue="2024-05-20" />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Buttons */}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </Container>
  );
}
