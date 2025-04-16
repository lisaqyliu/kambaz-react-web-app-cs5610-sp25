import { useParams, useLocation, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
import { Routes, Route } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments/index";
import AssignmentEditor from "./Assignments/Editor";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import PeopleTable from "./People/Table";
import { useSelector } from "react-redux";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const location = useLocation();
    const [showSidebar, setShowSidebar] = useState(true);
    const course = courses.find((course) => course._id === cid);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowSidebar(false);
            } else {
                setShowSidebar(true);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const sectionName = location.pathname.split("/")[4];

    return (
        <div id="wd-courses">
            {/* Breadcrumb */}
            <h2 className="text-danger d-flex align-items-center">
                <FaBars
                    className="me-2 d-md-none"
                    onClick={() => setShowSidebar(!showSidebar)}
                    style={{ cursor: "pointer" }}
                />
                {`Course ${cid}`} {sectionName ? `> ${sectionName}` : ""}
            </h2>
            <hr />

            {/* Display Course Name if Available */}
            {course ? (
                <h3 className="text-primary">Course Name: {course.name}</h3>
            ) : (
                <h3 className="text-warning">Course Not Found</h3>
            )}

            <div className="d-flex">
                {showSidebar && (
                    <div className="d-md-block d-flex flex-column">
                        <CourseNavigation />
                    </div>
                )}

                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route
                        path="Assignments/:aid"
                        element={<AssignmentEditor />}
                        />
                        <Route
                        path="Assignments/undefined"
                        element={<Navigate to="../Assignments" replace />}
                        />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
