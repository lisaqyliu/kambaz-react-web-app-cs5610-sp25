import { useParams, Link, useLocation } from "react-router-dom";

export default function CourseNavigation() {
    const { cid } = useParams();
    const location = useLocation();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            <Link to={`/Kambaz/Courses/${cid}/Home`} className={`list-group-item ${location.pathname.includes("Home") ? "active border-0" : "text-danger border-0"}`} id="wd-course-home-link" >Home</Link>
            <Link to={`/Kambaz/Courses/${cid}/Modules`} className={`list-group-item ${location.pathname.includes("Modules") ? "active border-0" : "text-danger border-0"}`} id="wd-course-modules-link" >Modules</Link>
            <Link to={`/Kambaz/Courses/${cid}/Piazza`} className={`list-group-item ${location.pathname.includes("Piazza") ? "active border-0" : "text-danger border-0"}`} id="wd-course-piazza-link" >Piazza</Link>
            <Link to={`/Kambaz/Courses/${cid}/Zoom`} className={`list-group-item ${location.pathname.includes("Zoom") ? "active border-0" : "text-danger border-0"}`} id="wd-course-zoom-link" >Zoom</Link>
            <Link to={`/Kambaz/Courses/${cid}/Assignments`} className={`list-group-item ${location.pathname.includes("Assignments") ? "active border-0" : "text-danger border-0"}`} id="wd-course-assignments-link">Assignments</Link>
            <Link to={`/Kambaz/Courses/${cid}/Quizzes`} className={`list-group-item ${location.pathname.includes("Quizzes") ? "active border-0" : "text-danger border-0"}`} id="wd-course-quizzes-link">Quizzes</Link>
            <Link to={`/Kambaz/Courses/${cid}/Grades`} className={`list-group-item ${location.pathname.includes("Grades") ? "active border-0" : "text-danger border-0"}`} id="wd-course-grades-link">Grades</Link>
            <Link to={`/Kambaz/Courses/${cid}/People`} className={`list-group-item ${location.pathname.includes("People") ? "active border-0" : "text-danger border-0" }`} id="wd-course-people-link">People</Link>
        </div>
    );
}
