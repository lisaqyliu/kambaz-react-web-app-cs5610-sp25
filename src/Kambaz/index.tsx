import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css"
import { useEffect, useState } from "react";
import * as userClient from "./Account/client"; 
import * as courseClient from "./Courses/client";
import { useSelector } from "react-redux";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import Enrollments from "./Enrollments";


export default function Kambaz() {
    const [courses, setCourses] = useState<any[]>([]);
      const [course, setCourse] = useState<any>({
          _id: "0", name: "New Course", number: "New Number",
          startDate: "2023-09-10", endDate: "2023-12-15",
          img: "/images/reactjs.jpg", description: "New Description"
      });
      const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
      const addNewCourse = async () => {
        try {
          const newCourse = await userClient.createCourse(course);  
          setCourses([...courses, newCourse]);  
        } catch (err) {
          console.error("❌ Failed to create course:", err);
        }
      };      
      const deleteCourse = async (courseId: string) => {
        try {
          await courseClient.deleteCourse(courseId);  // ⬅️ call the API
          setCourses(courses.filter((course) => course._id !== courseId)); // ⬅️ update local state
        } catch (err) {
          console.error("❌ Failed to delete course:", err);
        }
      };
      const updateCourse = async () => {
        if (course._id === "0") {
          alert("Please select a course to update.");
          return;
        }
        try {
          await courseClient.updateCourse(course);
          setCourses(courses.map((c) => c._id === course._id ? course : c));
        } catch (err) {
          console.error("❌ Failed to update course:", err);
        }
      };
      

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const courses = await userClient.findMyCourses();
            setCourses(courses);
          } catch (err) {
            console.error("Failed to load courses:", err);
          }
        };
    
        if (currentUser) {
          fetchCourses();
        }
      }, [currentUser]);
    
  return (
    <Session>
        <div id="wd-kambaz">
            <KambazNavigation/>
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
                    <Route path="/Account/*" element={<Account />} />
                    <Route path="/Dashboard" element={<ProtectedRoute><Dashboard courses={courses} course={course} setCourse={setCourse} addNewCourse={addNewCourse} deleteCourse={deleteCourse} updateCourse={updateCourse}/> </ProtectedRoute>} />
                    <Route path="/Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses}/> </ProtectedRoute>} />
                    <Route path="/Calendar" element={<h1>Calendar</h1>} />
                    <Route path="/Inbox" element={<h1>Inbox</h1>} />
                    <Route path="/Enrollments" element={<Enrollments />} />

                </Routes>
            </div>
        </div>
    </Session>
  );
}
