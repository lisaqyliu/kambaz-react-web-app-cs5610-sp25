import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api`;

export const createAssignment = async (moduleId: string, assignment: any) => {
  const response = await axios.post(`${ASSIGNMENTS_API}/modules/${moduleId}/assignments`, assignment);
  return response.data;
};

export const findAssignmentsForModule = async (moduleId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/modules/${moduleId}/assignments`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/assignments/${assignment._id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
  return response.data;
};
