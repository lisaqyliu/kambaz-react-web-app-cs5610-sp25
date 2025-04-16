import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api`;

export const createAssignment = async (moduleId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(
    `${ASSIGNMENTS_API}/modules/${moduleId}/assignments`,
    assignment
  );
  console.log("Created assignment response:", response.data);
  return response.data;
};

export const findAssignmentsForModule = async (moduleId: string) => {
  try {
    const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/modules/${moduleId}/assignments`);
    console.log("Raw response:", response);
    
    if (!Array.isArray(response.data)) {
      console.error("Expected array response but got:", typeof response.data);
      return [];
    }

    const assignments = response.data.map((assignment: any) => {
      console.log("Processing assignment:", assignment);
      return assignment;
    });

    console.log("Final assignments:", assignments);
    return assignments;
  } catch (error) {
    console.error("Error in findAssignmentsForModule:", error);
    return [];
  }
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/courses/${courseId}/assignments`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  if (!assignment._id) {
    console.error("Cannot update assignment without ID:", assignment);
    throw new Error("Cannot update assignment without ID");
  }

  console.log("Sending update for assignment:", assignment);
  
  try {
    const response = await axiosWithCredentials.put(
      `${ASSIGNMENTS_API}/assignments/${assignment._id}`,
      assignment
    );
    console.log("Update successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update assignment:", error);
    throw error;
  }
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/assignments/${assignmentId}`);
  return response.data;
};

export const findAssignmentByIdAndModule = async (assignmentId: string, moduleId: string) => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/modules/${moduleId}/assignments/${assignmentId}`
  );
  return response.data;
};

export const findAssignmentById = async (assignmentId: string, moduleId: string) => {
  const response = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/modules/${moduleId}/assignments/${assignmentId}`
  );
  return response.data;
};



