import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import Enrollments from "./Enrollments";
import Calendar from "./Calendar";
import Inbox from "./Inbox";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    img: "/images/reactjs.jpg", description: "New Description"
  });
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

  // Create a new course
  const addNewCourse = async () => {
    try {
      const newCourse = await courseClient.createCourse(course);
      setCourses([...courses, newCourse]);
    } catch (err) {
      console.error("Failed to create course:", err);
    }
  };

  // Delete a course
  const deleteCourse = async (courseId: string) => {
    try {
      await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  // Update a course
  const updateCourse = async () => {
    if (course._id === "0") {
      alert("Please select a course to update.");
      return;
    }
    try {
      await courseClient.updateCourse(course);
      setCourses(courses.map((c) => c._id === course._id ? course : c));
    } catch (err) {
      console.error("Failed to update course:", err);
    }
  };

  // Fetch only enrolled courses
  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (err) {
      console.error("Failed to load enrolled courses:", err);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (!currentUser) return;
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }
  
      setCourses(
        courses.map((course) =>
          course._id === courseId ? { ...course, enrolled } : course
        )
      );
    } catch (err) {
      console.error("Failed to update enrollment:", err);
    }
  };
   

  // Fetch all courses and add `enrolled: true` if the user is enrolled
  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findMyCourses();
      const enrolledCourseIds = enrolledCourses.map((c: any) => c._id);
      const mergedCourses = allCourses.map((course: any) =>
        enrolledCourseIds.includes(course._id)
          ? { ...course, enrolled: true }
          : course
      );
      setCourses(mergedCourses);
    } catch (err) {
      console.error("Failed to load all courses:", err);
    }
  };

  // React to login state or enrolling mode change
  useEffect(() => {
    if (!currentUser) return;
    if (enrolling || currentUser?.role === "ADMIN") {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                  enrolling={enrolling}
                  setEnrolling={setEnrolling}
                  updateEnrollment={updateEnrollment}
                />
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/Inbox" element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            } />
            <Route path="/Enrollments" element={<Enrollments />} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
