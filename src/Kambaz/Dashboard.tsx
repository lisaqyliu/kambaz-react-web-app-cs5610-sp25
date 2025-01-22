import { Link } from "react-router-dom";
export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboarrd-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses">
                <div className="wd-dashboard-course">
                    <Link to="/Kambaz/Courses/1234/Home" className="wd-dashboard-course-link">
                        <img src="/images/reactjs.jpg" width={200} />
                        <div>
                            <h5> CS1234 React JS </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/2345/Home" className="wd-dashboard-course-link">
                        <img src="/images/HTML.jpg" width={200} />
                        <div>
                            <h5> CS2345 HTML&CSS </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/3456/Home" className="wd-dashboard-course-link">
                        <img src="images/JS.jpg" width={200} />
                        <div>
                            <h5> CS 3456 JavaScript </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/4567/Home" className="wd-dashboard-course-link">
                        <img src="images/NODE.jpg" width={200} />
                        <div>
                            <h5> CS 4567 Node.js </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/5678/Home" className="wd-dashboard-course-link">
                        <img src="images/Session.jpg" width={200} />
                        <div>
                            <h5> CS 5678 Session </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/6789/Home" className="wd-dashboard-course-link">
                        <img src="images/APIs.jpg" width={200} />
                        <div>
                            <h5> CS 6789 APIs </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/7890/Home" className="wd-dashboard-course-link">
                        <img src="images/AI.jpg" width={200} />
                        <div>
                            <h5> CS 7890 AI </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
                <div className="wd-dashboard-course">
                    <Link to="Kambaz/Courses/8901/Home" className="wd-dashboard-course-link">
                        <img src="images/Cyber.jpg" width={200} />
                        <div>
                            <h5> CS 8901 Cybersecurity </h5>
                            <p className="wd-dashboard-course-title"> Full Stack software developer </p>
                            <button> Go </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}