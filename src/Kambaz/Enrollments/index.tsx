import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as client from "./client";
import { Card, ListGroup, Button } from "react-bootstrap";

export default function Enrollments() {
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  const loadData = async () => {
    if (!currentUser?._id) return;
    try {
      const enrolled = await client.findCoursesForStudent(currentUser._id);
      const all = await client.findAllCourses();
      setEnrolledCourses(enrolled);
      setAllCourses(all);
    } catch (err) {
      console.error("Failed to load data:", err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    await client.enrollUser(currentUser._id, courseId);
    await loadData();
  };

  const handleUnenroll = async (courseId: string) => {
    const enrollment = await client.findEnrollmentsForUser(currentUser._id);
    const match = enrollment.find((e: any) => e.course == courseId);
    if (match) {
      await client.unenrollUser(match._id);
      await loadData();
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  if (!currentUser?._id) return <div>Loading user info...</div>;

  return (
    <div className="p-4">
      <h2 className="mb-4">Courses</h2>
      <Card>
        <ListGroup variant="flush">
          {allCourses.map((course: any) => {
            const isEnrolled = enrolledCourses.some((c) => c._id == course._id);

            console.log("Checking course:", course._id);
            console.log("EnrolledCourses IDs:", enrolledCourses.map(c => c._id));

            return (
              <ListGroup.Item
                key={course._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <a
                    href={`#/Kambaz/Courses/${course._id}/Home`}
                    className="text-decoration-none"
                  >
                    <h5 className="mb-0">
                      {course.name}{" "}
                      <span className="badge bg-secondary">{course._id}</span>
                    </h5>
                  </a>
                </div>
                <div>
                  {isEnrolled ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUnenroll(course._id)}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEnroll(course._id)}
                    >
                      Enroll
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card>
    </div>
  );
}
