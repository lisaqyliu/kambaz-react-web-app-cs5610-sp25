import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, { payload }) => {
      console.log("📥 Setting Assignments from server:", payload);
      state.assignments = payload;
    },

    addAssignment: (state, { payload }) => {
      const newAssignment = {
        ...payload,
        _id: payload._id,
      };
      console.log("➕ Adding New Assignment:", newAssignment);
      state.assignments = [...state.assignments, newAssignment] as any;
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      console.log("🗑️ Deleting Assignment with ID:", assignmentId);
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload }) => {
      console.log("✏️ Updating Assignment:", payload);
      state.assignments = state.assignments.map((a: any) =>
        a._id === payload._id ? { ...a, ...payload } : a
      );
    },

    editAssignment: (state, { payload: assignmentId }) => {
      console.log("🛠️ Setting Assignment into Edit Mode:", assignmentId);
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignmentId
          ? { ...a, editing: true }
          : { ...a, editing: false }
      );
    },
  },
});

export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
