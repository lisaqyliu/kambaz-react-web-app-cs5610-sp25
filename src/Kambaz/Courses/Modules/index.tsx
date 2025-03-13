import { useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container, FormControl } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
    const { cid } = useParams(); // Get Course ID from URL
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const filteredModules = modules.filter((module: any) => module.course === cid); // Get modules for selected course

    return (
        <Container fluid>
            {/* Course Title */}
            <Row className="mb-3">
                <Col xs={12} className="d-flex justify-content-start">
                    <h2 className="fw-bold">Modules for Course {cid}</h2>
                    <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {dispatch(addModule({ name: moduleName, course: cid })); setModuleName(""); }} />
                </Col>
            </Row>

            {/* Modules List */}
            <Row>
                <Col xs={12}>
                    <ListGroup className="rounded-0" id="wd-modules">
                        {filteredModules.length > 0 ? (
                            filteredModules.map((module: any) => (
                                <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                    {/* Module Header */}
                                    <div className="d-flex align-items-center justify-content-between wd-module-header">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {!module.editing && (<span className="fw-bold wd-title">{module.name}</span>)}
                                            {module.editing && (
                                                <FormControl 
                                                    className="w-50 d-inline-block"
                                                    defaultValue={module.name} 
                                                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            dispatch(updateModule({ ...module, editing: false }));
                                                        }
                                                    }}
                                                /> 
                                            )}
                                        </div>
                                        <ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => {dispatch(deleteModule(moduleId)); }} editModule={(moduleId) => dispatch(editModule(moduleId))}/>
                                        
                                    </div>

                                    {/* Render Lessons */}
                                    {module.lessons.length > 0 && (
                                        <ListGroup className="wd-lessons rounded-0 ">
                                            {module.lessons.map((lesson: any) => (
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
