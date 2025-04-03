import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

// ✅ Get all enrollments for a user
export const findEnrollmentsForUser = async (userId: string) =>
  (await axios.get(`${USERS_API}/${userId}/enrollments`)).data;

// ✅ Enroll user in a course
export const enrollUser = async (userId: string, courseId: string) =>
  (await axios.post(`${USERS_API}/${userId}/courses/${courseId}`)).data;

// ✅ Unenroll using enrollment ID (🛠️ this matches your backend!)
export const unenrollUser = async (enrollmentId: string) =>
  (await axios.delete(`${REMOTE_SERVER}/api/enrollments/${enrollmentId}`)).data;

// ✅ Get all available courses
export const findAllCourses = async () =>
  (await axios.get(`${COURSES_API}`)).data;

// ✅ Find courses a student is enrolled in
export const findCoursesForStudent = async (userId: string) => {
  const enrollments = await findEnrollmentsForUser(userId);
  const allCourses = await findAllCourses();

  const enrolledCourses = allCourses.filter((course: any) =>
    enrollments.some((enrollment: any) => enrollment.course === course._id)
  );

  return enrolledCourses;
};
