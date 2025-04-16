import axios from "axios";
import.meta.env.VITE_REMOTE_SERVER


const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;

export const signin = async (credentials: { username: string; password: string }) =>
  (await axiosWithCredentials.post(`${USERS_API}/signin`, credentials)).data;

export const signout = async () =>
  (await axiosWithCredentials.post(`${USERS_API}/signout`)).data;

export const signup = async (credentials: { username: string; password: string }) =>
  (await axiosWithCredentials.post(`${USERS_API}/signup`, credentials)).data;

export const account = async () =>
  (await axiosWithCredentials.post(`${USERS_API}/account`)).data;

export const updateUser = async (user: any) =>
  (await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user)).data;

export const findUserById = async (id: string) =>
  (await axiosWithCredentials.get(`${USERS_API}/${id}`)).data;

export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const findMyCourses = async () => {
    const response = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
    return response.data;
};

export const createCourse = async (course: any) => {
    const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
    return data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);
  return response.data;
}
  
export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete( `${USERS_API}/${userId}` );
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}`, user);
  return response.data;
};

export const findCoursesForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};
 