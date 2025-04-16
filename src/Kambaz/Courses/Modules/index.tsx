import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Container, FormControl } from "react-bootstrap";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  setModules,
  addModule,
  editModule,
  updateModule,
  deleteModule,
} from "./reducer";
import * as courseClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
  const [moduleName, setModuleName] = useState("");
  const isFaculty = currentUser?.role === "FACULTY";

  // Create a new module and dispatch to Redux
  const addModuleHandler = async () => {
    if (!cid) return;

    try {
      const newModule = await courseClient.createModuleForCourse(cid, {
        name: moduleName,
        course: cid,
      });
      dispatch(addModule(newModule));
      setModuleName("");
    } catch (err) {
      console.error("Failed to create module:", err);
    }
  };

  // Remove module by ID
  const removeModule = async (moduleId: string) => {
    try {
      await modulesClient.deleteModule(moduleId);
      dispatch(deleteModule(moduleId));
    } catch (err) {
      console.error("Failed to delete module:", err);
    }
  };

  // Save module edits
  const saveModule = async (module: any) => {
    try {
      await modulesClient.updateModule(module);
      dispatch(updateModule(module));
    } catch (err) {
      console.error("Failed to update module:", err);
    }
  };

  // Fetch modules when course ID changes
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const modules = await courseClient.findModulesForCourse(cid!);
        dispatch(setModules(modules));
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      }
    };

    if (cid) {
      fetchModules();
    }
  }, [cid, dispatch]);

  if (!currentUser?._id) return null;

  return (
    <Container fluid>
      <Row className="mb-3">
        <Col xs={12} className="d-flex justify-content-start align-items-center">
          <h2 className="fw-bold me-3">Modules for Course {cid}</h2>
          {isFaculty && (
            <ModulesControls
              setModuleName={setModuleName}
              moduleName={moduleName}
              addModule={addModuleHandler}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <ListGroup className="rounded-0" id="wd-modules">
            {modules.length > 0 ? (
              modules.map((module: any) => (
                <ListGroup.Item
                  key={module._id}
                  className="wd-module p-0 mb-5 fs-5 border-gray"
                >
                  <div className="d-flex align-items-center justify-content-between wd-module-header">
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      {!module.editing && (
                        <span className="fw-bold wd-title">{module.name}</span>
                      )}
                      {isFaculty && module.editing && (
                        <FormControl
                          className="w-50 d-inline-block"
                          defaultValue={module.name}
                          onChange={(e) =>
                            dispatch(updateModule({ ...module, name: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              saveModule({ ...module, editing: false });
                            }
                          }}
                        />
                      )}
                    </div>
                    {isFaculty && (
                      <ModuleControlButtons
                        moduleId={module._id}
                        deleteModule={removeModule}
                        editModule={() => dispatch(editModule(module._id))}
                      />
                    )}
                  </div>

                  {module.lessons.length > 0 && (
                    <ListGroup className="wd-lessons rounded-0">
                      {module.lessons.map((lesson: any) => (
                        <ListGroup.Item
                          key={lesson._id}
                          className="wd-lessons p-3 d-flex align-items-center justify-content-between"
                        >
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
