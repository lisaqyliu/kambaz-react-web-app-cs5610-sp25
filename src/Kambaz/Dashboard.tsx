import { Link } from "react-router-dom";

const courses = [
    { id: "1234", title: "React JS", img: "/images/reactjs.jpg" },
    { id: "2345", title: "HTML & CSS", img: "/images/HTML.jpg" },
    { id: "3456", title: "JavaScript", img: "/images/JS.jpg" },
    { id: "4567", title: "Node.js", img: "/images/NODE.jpg" },
    { id: "5678", title: "Session Management", img: "/images/Session.jpg" },
    { id: "6789", title: "APIs", img: "/images/APIs.jpg" },
    { id: "7890", title: "AI", img: "/images/AI.jpg" },
    { id: "8901", title: "Cybersecurity", img: "/images/Cyber.jpg" }
];

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1>
            <hr />
            <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
            <hr />
            <div id="wd-dashboard-courses">
                {courses.map((course) => (
                    <div key={course.id} className="wd-dashboard-course">
                        <Link to={`/Kambaz/Courses/${course.id}/Home`} className="wd-dashboard-course-link">
                            <img src={course.img} width={200} alt={course.title} />
                            <div>
                                <h5>{course.title}</h5>
                                <p className="wd-dashboard-course-title">Full Stack software developer</p>
                                <button>Go</button>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
