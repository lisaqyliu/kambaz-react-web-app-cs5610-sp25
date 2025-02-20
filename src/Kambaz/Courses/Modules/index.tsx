import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import modules from "../../Database/modules.json"; // Import modules data

export default function Modules() {
    const { cid } = useParams(); // Get Course ID from URL
    const filteredModules = modules.filter(module => module.course === cid); // Get modules for selected course

    return (
        <Container fluid>
            {/* Course Title */}
            <Row className="mb-3">
                <Col xs={12} className="d-flex justify-content-start">
                    <h2 className="fw-bold">Modules for Course {cid}</h2>
                </Col>
            </Row>

            {/* Modules List */}
            <Row>
                <Col xs={12}>
                    <ListGroup className="rounded-0" id="wd-modules">
                        {filteredModules.length > 0 ? (
                            filteredModules.map(module => (
                                <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                    {/* Module Header */}
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            <span className="fw-bold wd-title">{module.name}</span>
                                        </div>
                                        <ModuleControlButtons />
                                    </div>

                                    {/* Render Lessons */}
                                    {module.lessons.length > 0 && (
                                        <ListGroup className="wd-lessons rounded-0 mt-2">
                                            {module.lessons.map(lesson => (
                                                <ListGroup.Item key={lesson._id} className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                                    <div className="d-flex align-items-center">
                                                        <BsGripVertical className="me-2 fs-3" />
                                                        {lesson.name}
                                                    </div>
                                                    <LessonControlButtons />
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
                                    )}
                                </ListGroup.Item>
                            ))
                        ) : (
                            <p className="text-muted">No modules available for this course.</p>
                        )}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}
