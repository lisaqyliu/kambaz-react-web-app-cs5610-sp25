import { useParams, Link, useLocation } from "react-router-dom";

const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

export default function CourseNavigation() {
    const { cid } = useParams();
    const location = useLocation();

    return (
        <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
            {links.map((name) => (
                <Link 
                    key={name} 
                    to={`/Kambaz/Courses/${cid}/${name}`} 
                    className={`list-group-item ${location.pathname.includes(name) ? "active border-0" : "text-danger border-0"}`} 
                    id={`wd-course-${name.toLowerCase()}-link`}
                >
                    {name}
                </Link>
            ))}
        </div>
    );
}
