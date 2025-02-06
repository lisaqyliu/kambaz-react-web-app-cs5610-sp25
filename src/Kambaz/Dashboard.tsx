import { Link } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";

const courses = [
    { id: "1234", title: "React JS", img: "/images/reactjs.jpg" },
    { id: "2345", title: "HTML & CSS", img: "/images/HTML.jpg" },
    { id: "3456", title: "JavaScript", img: "/images/JS.jpg" },
    { id: "4567", title: "Node.js", img: "/images/NODE.jpg" },
    { id: "5678", title: "Session Management", img: "/images/Session.jpg" },
    { id: "6789", title: "APIs", img: "/images/APIs.jpg" },
    { id: "7890", title: "AI", img: "/images/AI.jpg" },
    { id: "8901", title: "Cybersecurity", img: "/images/Cyber.jpg" }
];

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
            <div id="wd-dashboard-courses">
                <Row xs={1} md={5} className="g-4">
                    {courses.map((course) => (
                        <Col key={course.id} className="wd-dashboard-course" style={{ width: "270px"}} >
                            <Card>
                                <Link to={`/Kambaz/Courses/${course.id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                                    <Card.Img variant="top" src={course.img} width="100%" height={160} />
                                    <Card.Body>
                                        <Card.Title className="wd-dashboard-course-title">{course.title}</Card.Title>
                                        <Card.Text className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
                                        <Button variant="primary" className="wd-dashboard-course-button">Go</Button>
                                    </Card.Body>
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
