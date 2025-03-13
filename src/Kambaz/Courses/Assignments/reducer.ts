import { createSlice } from "@reduxjs/toolkit";
import db from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: db.assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        _id: uuidv4(),
        ...payload,
      };
      state.assignments.push(newAssignment);
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(a => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map(a => a._id === payload._id ? { ...a, ...payload } : a);
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map(a =>
        a._id === assignmentId ? { ...a, editing: true } : { ...a, editing: false }
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
