import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import courses from "./Database/courses.json"; 
import "./style.css"; // Import global styles

export default function Dashboard() {
    return (
        <Container id="wd-dashboard" className="p-4">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>

            <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {courses.map((course) => (
                    <Col key={course._id} className="d-flex">
                        <Card className="wd-course-card shadow-sm flex-grow-1">
                            <Link 
                                to={`/Kambaz/Courses/${course._id}/Home`} 
                                className="wd-dashboard-course-link text-decoration-none text-dark"
                            >
                                <Card.Img 
                                    variant="top" 
                                    src={course.img} 
                                    className="wd-course-image"
                                    onError={(e) => e.currentTarget.src = "/images/default-course.jpg"} 
                                />
                                <Card.Body>
                                    <Card.Title className="wd-dashboard-course-title">
                                        {course.name}
                                    </Card.Title>
                                    <Card.Text className="wd-dashboard-course-description">
                                        {course.description.length > 100 
                                            ? course.description.substring(0, 100) + "..." 
                                            : course.description}
                                    </Card.Text>
                                    <Button variant="primary" className="wd-dashboard-course-button">Go</Button>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
