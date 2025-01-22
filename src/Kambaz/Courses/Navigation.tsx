import { useParams, Link } from "react-router-dom";

export default function CourseNavigation() {
    const { cid } = useParams();

    return (
        <div id="wd-courses-navigation">
            <Link to={`/Kambaz/Courses/${cid}/Home`}>Home</Link><br />
            <Link to={`/Kambaz/Courses/${cid}/Modules`}>Modules</Link><br />
            <Link to={`/Kambaz/Courses/${cid}/Assignments`}>Assignments</Link><br />
            <Link to={`/Kambaz/Courses/${cid}/Quizzes`}>Quizzes</Link><br />
            <Link to={`/Kambaz/Courses/${cid}/Grades`}>Grades</Link><br />
            <Link to={`/Kambaz/People`}>People</Link><br />
        </div>
    );
}
