import { Row, Col, ListGroup, Container } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
    return (
        <Container fluid>
            {/* Controls Section (Now Positioned Above All Content) */}
            <Row className="mb-3">
                <Col xs={12} className="d-flex justify-content-start">
                    <ModulesControls />
                </Col>
            </Row>

            {/* Modules Content */}
            <Row>
                <Col xs={12}>
                    <ListGroup className="rounded-0" id="wd-modules">
                        {/* Week 1 */}
                        <ListGroup.Item className="wd-module p-0  mb-5 fs-5 border-gray" >
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <span className="fw-bold wd-title ">Week 1</span>
                                </div>
                                <ModuleControlButtons />
                            </div>

                            <ListGroup className="wd-lessons rounded-0 mt-2">
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LEARNING OBJECTIVES
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        Introduction to the course
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        Learn what is Web Development
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LESSON 1
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LESSON 2
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                        </ListGroup>
                        </Col>
                </Row>
                        
                <Row className="mt-4">
                <Col xs={12}>
                        {/* Week 2 */}
                        <ListGroup className="rounded-0 wd-modules">
                        <ListGroup.Item className="wd-module p-3 mb-4 border-gray">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <BsGripVertical className="me-2 fs-3" />
                                    <span className="fw-bold">Week 2</span>
                                </div>
                                <ModuleControlButtons />
                            </div>

                            <ListGroup className="wd-lessons rounded-0 mt-2">
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LEARNING OBJECTIVES
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LESSON 1
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                                <ListGroup.Item className="wd-lessons p-3 d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <BsGripVertical className="me-2 fs-3" />
                                        LESSON 2
                                    </div>
                                    <LessonControlButtons />
                                </ListGroup.Item>
                            </ListGroup>
                        </ListGroup.Item>
                    </ListGroup>
                    
                </Col>
            </Row>
        </Container>
    );
}
