import { useParams, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import assignments from "../../Database/assignments.json"; // Import assignments data

export default function AssignmentEditor() {
    const { cid, aid } = useParams(); // Get Course ID and Assignment ID from URL
    const assignment = assignments.find(a => a._id === aid); // Find the selected assignment

    // Default values if assignment is not found
    const defaultAssignment = { 
        title: "Unknown Assignment", 
        description: "No description available.", 
        points: 100, 
        dueDate: "2024-05-13T23:59", 
        availableDate: "2024-05-06T00:00", 
        untilDate: "2024-05-20T12:00" 
    };

    const selectedAssignment = assignment || defaultAssignment;

    return (
        <Container className="p-4">
            <h2 className="mb-4">Assignment Editor</h2>

            <Form>
                {/* Assignment Name */}
                <Form.Group className="mb-3">
                    <Form.Label>Assignment Name</Form.Label>
                    <Form.Control defaultValue={selectedAssignment.title} readOnly />
                </Form.Group>

                {/* Assignment Instructions */}
                <Card className="mb-3 p-3">
                    <Card.Body>
                        <Card.Text className="text-danger fw-bold">The assignment is available online</Card.Text>
                        <p>Submit a link to the landing page of your Web application running on <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</a>.</p>
                        <p>The landing page should include the following:</p>
                        <ul>
                            <li>Your full name and section</li>
                            <li>Links to each of the lab assignments</li>
                            <li>Link to the Kanbas application</li>
                            <li>Links to all relevant source code repositories</li>
                        </ul>
                        <p>The <a href="https://www.kanbas.com/" target="_blank" rel="noopener noreferrer">Kanbas</a> application should include a link to navigate back to the landing page.</p>
                    </Card.Body>
                </Card>

                {/* Points */}
                <Form.Group className="mb-3">
                    <Form.Label>Points</Form.Label>
                    <Form.Control type="number" defaultValue={selectedAssignment.points} />
                </Form.Group>

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
                                    <Form.Control type="datetime-local" defaultValue={selectedAssignment.dueDate} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Available From</Form.Label>
                                    <Form.Control type="datetime-local" defaultValue={selectedAssignment.availableDate} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Until</Form.Label>
                                    <Form.Control type="datetime-local" defaultValue={selectedAssignment.untilDate} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>

                {/* Buttons */}
                <div className="d-flex justify-content-end">
                    <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
                        <Button variant="secondary" className="me-2">Cancel</Button>
                    </Link>
                    <Button variant="danger">Save</Button>
                </div>
            </Form>
        </Container>
    );
}
