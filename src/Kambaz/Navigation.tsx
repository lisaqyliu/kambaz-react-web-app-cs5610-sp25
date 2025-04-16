import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ListGroup, Offcanvas, Button } from "react-bootstrap";  
import { MdGroups } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function KambazNavigation() {
    const { pathname } = useLocation();
    const [showCoursesPopup, setShowCoursesPopup] = useState(false);
    const courses = useSelector((state: any) => state.courseReducer?.courses || []);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const isFaculty = currentUser?.role === "FACULTY";
    const [showEnrolledOnly, setShowEnrolledOnly] = useState(false);

    // Filter courses based on enrollment status
    const displayedCourses = showEnrolledOnly && !isFaculty
        ? courses.filter((course: any) => course.enrolled)
        : courses;

    return (
        <>
        <ListGroup 
            id="wd-kambaz-navigation" 
            style={{ width: 120 }} 
            className="rounded-0 position-fixed bottom-0 top-0 
                       d-none d-md-block bg-black z-2">

            {/* NEU Logo */}
            <ListGroup.Item 
                id="wd-neu-link" 
                action 
                target="_blank" 
                href="https://www.northeastern.edu/" 
                className="bg-black border-0 text-center">
                
                <img 
                    src="/images/NEU.png" 
                    width="75px" 
                />
            </ListGroup.Item>

            {/* Account Link */}
            <ListGroup.Item 
                as={Link} 
                to="/Kambaz/Account"
                className={`text-center border-0 
                            ${pathname.includes("Account") 
                                ? "bg-white text-danger" 
                                : "bg-black text-white"}`}>
                
                <FaRegCircleUser 
                    className="fs-1 text-danger" 
                />
                <br /> Account
            </ListGroup.Item>

                {/* Dashboard Link */}
                <ListGroup.Item 
                    as={Link}
                    to="/Kambaz/Dashboard"
                    className={`text-center border-0 
                                ${pathname.includes("/Dashboard") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}>
                    <AiOutlineDashboard 
                        className="fs-1 text-danger" 
                    />
                    <br /> Dashboard
                </ListGroup.Item>

                {/* Courses Button (Opens Popup) */}
                <ListGroup.Item 
                    onClick={() => setShowCoursesPopup(true)}
                    className={`text-center border-0 cursor-pointer
                                ${pathname.includes("/Courses") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}
                    style={{ cursor: 'pointer' }}>
                    <LiaBookSolid 
                        className="fs-1 text-danger" 
                    />
                    <br /> Courses
                </ListGroup.Item>

                {/* Other Navigation Links */}
                <ListGroup.Item 
                    as={Link}
                    to="/Kambaz/Calendar"
                    className={`text-center border-0 
                                ${pathname.includes("/Calendar") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}>
                    <IoCalendarOutline 
                        className="fs-1 text-danger" 
                    />
                    <br /> Calendar
                </ListGroup.Item>

                <ListGroup.Item 
                    as={Link}
                    to="/Kambaz/Inbox"
                    className={`text-center border-0 
                                ${pathname.includes("/Inbox") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}>
                    <FaInbox 
                        className="fs-1 text-danger" 
                    />
                    <br /> Inbox
                </ListGroup.Item>

                <ListGroup.Item 
                    as={Link} 
                    to="/Labs"
                    className={`text-center border-0 
                                ${pathname.includes("/Labs") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}>
                    <LiaCogSolid 
                        className="fs-1 text-danger" 
                    />
                    <br /> Labs
                </ListGroup.Item>

                <ListGroup.Item 
                    as={Link}
                    to="/Kambaz/Enrollments"
                    className={`text-center border-0 
                                ${pathname.includes("/Enrollments") 
                                    ? "bg-white text-danger" 
                                    : "bg-black text-white"}`}>
                    <MdGroups 
                        className="fs-1 text-danger" 
                    />
                    <br /> Enrollments
                </ListGroup.Item>
            </ListGroup>

            {/* Courses Popup */}
            <Offcanvas 
                show={showCoursesPopup} 
                onHide={() => setShowCoursesPopup(false)} 
                placement="end"
            >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <LiaBookSolid className="me-2" />
                            {showEnrolledOnly ? "My Courses" : "All Courses"} ({displayedCourses.length})
                        </div>
                        {!isFaculty && (
                            <Button 
                                variant={showEnrolledOnly ? "primary" : "outline-primary"} 
                                size="sm"
                                onClick={() => setShowEnrolledOnly(!showEnrolledOnly)}
                            >
                                {showEnrolledOnly ? "Show All Courses" : "Show My Courses"}
                            </Button>
                        )}
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {displayedCourses.length > 0 ? (
                        <ListGroup variant="flush">
                            {displayedCourses.map((course: any) => (
                                <ListGroup.Item 
                                    key={course._id}
                                    action
                                    as={Link}
                                    to={`/Kambaz/Courses/${course._id}/Home`}
                                    onClick={() => setShowCoursesPopup(false)}
                                    className={`d-flex align-items-center p-3 border-bottom`}
                                >
                                    <img 
                                        src={course.img} 
                                        alt={course.name}
                                        className="me-3 rounded"
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        onError={(e) => e.currentTarget.src = "/images/reactjs.jpg"}
                                    />
                                    <div className="flex-grow-1">
                                        <h6 className="mb-1">{course.name}</h6>
                                        <small className="text-muted">
                                            {course.description?.length > 60 
                                                ? course.description.substring(0, 60) + "..."
                                                : course.description}
                                        </small>
                                    </div>
                                    {course.enrolled && (
                                        <span className="badge bg-success ms-2">Enrolled</span>
                                    )}
                </ListGroup.Item>
            ))}
        </ListGroup>
                    ) : (
                        <div className="text-center p-4 text-muted">
                            <LiaBookSolid className="fs-1 mb-2" />
                            <p>
                                {showEnrolledOnly 
                                    ? "You haven't enrolled in any courses yet" 
                                    : "No courses available"}
                            </p>
                        </div>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
