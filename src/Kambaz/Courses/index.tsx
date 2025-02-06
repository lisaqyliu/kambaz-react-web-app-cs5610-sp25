import { useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments/index";
import AssignmentEditor from "./Assignments/Editor"; 
import { FaBars } from "react-icons/fa"; // Import menu icon
import { useState, useEffect } from "react";
import PeopleTable from "./People/Table";

export default function Courses() {
    const { cid } = useParams();
    const [showSidebar, setShowSidebar] = useState(true); // Track sidebar visibility

    // Automatically hide sidebar on small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setShowSidebar(false); // Hide sidebar on small screens
            } else {
                setShowSidebar(true); // Show sidebar on larger screens
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Call on mount

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div id="wd-courses">
            {/* Toggleable Menu Icon (Click to Show/Hide Sidebar) */}
            <h2 className="text-danger d-flex align-items-center">
                <FaBars
                    className="me-2 d-md-none" // Only show on small screens
                    onClick={() => setShowSidebar(!showSidebar)} // Toggle sidebar
                    style={{ cursor: "pointer" }}
                />
                Course {cid}
            </h2>
            <hr />

            <div className="d-flex">
                {/* Sidebar: Hide on small screens, show when toggled */}
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
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="People" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
