import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "module123",
    name: "CS5610",
    description: "Web Development",
    course: "Computer Science"
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      {/* 1. Modifying Assignment Title */}
      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <FormControl className="w-75 mb-2" id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <hr />

      {/* 2. Retrieving Assignment */}
      <h4>Retrieving Assignment</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>
      <hr />

      {/* 3. Retrieving Assignment Title */}
      <h4>Retrieving Assignment Title</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>
      <hr />

      {/* 4. Module Object */}
      <h4>Module</h4>
      <a id="wd-retrieve-module" className="btn btn-primary me-2"
         href={`${MODULE_API_URL}`}>
        Get Module
      </a>

      <a id="wd-retrieve-module-name" className="btn btn-secondary me-2"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <FormControl className="w-75 mb-2" id="wd-module-name"
        value={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />

      <a id="wd-update-module-name" className="btn btn-success"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Module Name
      </a>

      <hr />
    </div>
  );
}

