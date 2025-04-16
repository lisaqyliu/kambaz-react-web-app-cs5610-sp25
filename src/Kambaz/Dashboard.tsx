import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Container, FormControl, Offcanvas } from "react-bootstrap";
import "./style.css";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard({
  courses, course, setCourse, addNewCourse,
  deleteCourse, updateCourse, enrolling, setEnrolling, updateEnrollment,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
  enrolling: boolean;
  setEnrolling: React.Dispatch<React.SetStateAction<boolean>>;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const handleCardClick = (course: any) => {
    setSelectedCourse(course);
    setShowSidebar(true);
  };

  return (
    <Container id="wd-dashboard" className="p-4">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button className="btn btn-primary float-end" onClick={() => setEnrolling(!enrolling)}>
          {enrolling ? "My Courses" : "All Courses"}
        </button>
      </h1>

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

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>

      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {courses.map((course) => (
          <Col key={course._id} className="d-flex">
            <Card 
              className="wd-course-card shadow-sm flex-grow-1"
              onClick={() => handleCardClick(course)}
              style={{ cursor: 'pointer' }}
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

                {enrolling && (
                  <Button 
                    onClick={(event) => {
                      event.stopPropagation();
                      updateEnrollment(course._id, !course.enrolled);
                    }}
                    className={`btn float-end ${course.enrolled ? "btn-danger" : "btn-success"}`}
                  >
                    {course.enrolled ? "Unenroll" : "Enroll"}
                  </Button>
                )}

                <Link 
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button className="btn btn-primary">Go</Button>
                </Link>

                {isFaculty && (
                  <>
                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
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
                        event.stopPropagation();
                        setCourse(course);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Side Popup */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Course Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedCourse && (
            <div>
              <img
                src={selectedCourse.img}
                alt={selectedCourse.name}
                className="w-100 mb-3"
                style={{ maxHeight: '200px', objectFit: 'cover' }}
                onError={(e) => e.currentTarget.src = "/images/reactjs.jpg"}
              />
              <h3>{selectedCourse.name}</h3>
              <p>{selectedCourse.description}</p>
              <hr />
              <h4>Quick Actions</h4>
              <div className="d-grid gap-2">
                <Link 
                  to={`/Kambaz/Courses/${selectedCourse._id}/Home`}
                  className="text-decoration-none"
                >
                  <Button className="w-100 mb-2">Go to Course</Button>
                </Link>
                {enrolling && (
                  <Button
                    onClick={() => updateEnrollment(selectedCourse._id, !selectedCourse.enrolled)}
                    className={`w-100 ${selectedCourse.enrolled ? "btn-danger" : "btn-success"}`}
                  >
                    {selectedCourse.enrolled ? "Unenroll" : "Enroll"}
                  </Button>
                )}
              </div>
              {isFaculty && (
                <>
                  <hr />
                  <h4>Faculty Actions</h4>
                  <div className="d-grid gap-2">
                    <Button
                      variant="warning"
                      onClick={() => setCourse(selectedCourse)}
                      className="w-100 mb-2"
                    >
                      Edit Course
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteCourse(selectedCourse._id);
                        setShowSidebar(false);
                      }}
                      className="w-100"
                    >
                      Delete Course
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}
