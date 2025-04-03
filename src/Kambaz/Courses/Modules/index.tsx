import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container, FormControl } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
    const { cid } = useParams(); // Get Course ID from URL
    const [moduleName, setModuleName] = useState("");
    const dispatch = useDispatch();
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";
    console.log("Current user:", currentUser);
    console.log("Is Faculty?", isFaculty);

    if (!currentUser?._id) return <></>;  // or null
    const createModuleForCourse = async () => {
        if (!cid) return;
      
        const newModule = { name: moduleName, course: cid };
      
        try {
          const savedModule = await coursesClient.createModuleForCourse(cid, newModule);
          dispatch(addModule(savedModule)); // this module now has a real _id
          setModuleName(""); // clear input
        } catch (err) {
          console.error("❌ Failed to create module:", err);
        }
      };
      
    const removeModule = async (moduleId: string) => {
        await modulesClient.deleteModule(moduleId);
        dispatch(deleteModule(moduleId));
    };
    const saveModule = async (module: any) => {
        await modulesClient.updateModule(module);
        dispatch(updateModule(module));
    };
        
    
    useEffect(() => {
        const fetchModules = async () => {
          try {
            const modules = await coursesClient.findModulesForCourse(cid as string);
            dispatch(setModules(modules));
          } catch (err) {
            console.error("❌ Failed to fetch modules:", err);
          }
        };
      
        if (cid) {
          fetchModules();
        }
    }, [cid, dispatch]);
      

    return (
        <Container fluid>
            {/* Course Title */}
            <Row className="mb-3">
                <Col xs={12} className="d-flex justify-content-start">
                    <h2 className="fw-bold">Modules for Course {cid}</h2>
                    {isFaculty && (<ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={createModuleForCourse} />)}
                </Col>
            </Row>

            {/* Modules List */}
            <Row>
                <Col xs={12}>
                    <ListGroup className="rounded-0" id="wd-modules">
                        {modules.length > 0 ? (
                            modules.map((module: any) => (
                                <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
                                    {/* Module Header */}
                                    <div className="d-flex align-items-center justify-content-between wd-module-header">
                                        <div className="d-flex align-items-center">
                                            <BsGripVertical className="me-2 fs-3" />
                                            {!module.editing && (<span className="fw-bold wd-title">{module.name}</span>)}
                                            {isFaculty && module.editing && (
                                                <FormControl 
                                                    className="w-50 d-inline-block"
                                                    defaultValue={module.name} 
                                                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            saveModule({ ...module, editing: false });
                                                        }
                                                    }}
                                                /> 
                                            )}
                                        </div>
                                        {isFaculty && (<ModuleControlButtons moduleId={module._id} deleteModule={(moduleId) => removeModule(moduleId)} editModule={(moduleId) => dispatch(editModule(moduleId))}/>)}
                                        
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
