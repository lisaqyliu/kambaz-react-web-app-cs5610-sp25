import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// ✅ Get all enrollments for a user
export const findEnrollmentsForUser = async (userId: string) =>
  (await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`)).data;

// ✅ Enroll user in a course
export const enrollUser = async (userId: string, courseId: string) =>
  (await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`)).data;

// ✅ Unenroll using enrollment ID
export const unenrollUser = async (enrollmentId: string) =>
  (await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/enrollments/${enrollmentId}`)).data;

// ✅ Get all available courses
export const findAllCourses = async () =>
  (await axiosWithCredentials.get(`${COURSES_API}`)).data;

// ✅ Find courses a student is enrolled in (using server-side filtering)
export const findCoursesForStudent = async (userId: string) =>
  (await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`)).data;
