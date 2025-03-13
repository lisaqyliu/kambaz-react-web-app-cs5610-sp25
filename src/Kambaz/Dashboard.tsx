import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, FormControl } from "react-bootstrap";
import "./style.css"; // Import global styles
import { useSelector } from "react-redux";
import * as db from "./Database";
import { useState } from "react";

export default function Dashboard({
  courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse
}: {
  courses: any[]; course: any; setCourse: (course: any) => void;
  addNewCourse: () => void; deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  type Enrollment = { user: string; course: string };
  const [enrollments, setEnrollments] = useState<Enrollment[]>(db.default.enrollments);

  // Check if a user is enrolled
  const isEnrolled = (courseId: string) =>
    enrollments.some((e: any) => e.user === currentUser._id && e.course === courseId);

  // Enroll user in a course
  const handleEnroll = (courseId: string) => {
    setEnrollments([...enrollments, { user: currentUser._id, course: courseId }]);
  };

  const userCourses = courses.filter((c) =>
    enrollments.some((e: any) => e.user === currentUser._id && e.course === c._id)
  );

  return (
    <Container id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">Dashboard</h1>

      {/* Only FACULTY can add/update course form */}
      {isFaculty && (
        <>
          <h5>New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            > Add </button>
            <Button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >Update</Button>
          </h5>
          <hr /><br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({userCourses.length})</h2>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {userCourses.map((course) => {
          const enrolled = isEnrolled(course._id);
          return (
            <Col key={course._id} className="d-flex">
              <Card className="wd-course-card shadow-sm flex-grow-1">
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => !enrolled && e.preventDefault()}
                >
                  <Card.Img
                    variant="top"
                    src={course.img}
                    className="wd-course-image"
                    onError={(e) => e.currentTarget.src = "/images/reactjs.jpg"}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title">
                      {course.name}
                    </Card.Title>
                    <Card.Text className="wd-dashboard-course-description">
                      {course.description.length > 100
                        ? course.description.substring(0, 100) + "..."
                        : course.description}
                    </Card.Text>

                    {enrolled ? (
                      <>
                        <Button className="btn btn-primary">Go</Button>
                        {/* Only FACULTY can edit/delete */}
                        {isFaculty && (
                          <>
                            <Button
                              onClick={(event) => {
                                event.preventDefault();
                                deleteCourse(course._id);
                              }}
                              className="btn btn-danger float-end"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </Button>
                            <Button
                              id="wd-edit-course-click"
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse(course);
                              }}
                              className="btn btn-warning me-2 float-end"
                            >
                              Edit
                            </Button>
                          </>
                        )}
                      </>
                    ) : (
                      <Button
                        className="btn btn-success"
                        onClick={(e) => {
                          e.preventDefault();
                          handleEnroll(course._id);
                        }}
                      >
                        Enroll
                      </Button>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
