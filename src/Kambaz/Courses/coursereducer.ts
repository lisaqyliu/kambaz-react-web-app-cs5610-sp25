import { createSlice } from "@reduxjs/toolkit";
import db from "./../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  courses: db.courses,
  currentCourse: {}
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state) => {
      const newCourse = {
        _id: uuidv4(),
        name: "New Course",
        number: "CS1234",
        department: "CS",
        startDate: "2025-01-01",
        endDate: "2025-06-01",
        credits: 3,
        description: "",
        img: "/images/reactjs.jpg"
      };
      state.courses.push(newCourse);
    },

    updateCourse: (state, { payload }) => {
      state.courses = state.courses.map((c) =>
        c._id === payload._id ? payload : c
      );
    },

    deleteCourse: (state, { payload }) => {
      state.courses = state.courses.filter((c) => c._id !== payload);
    },

    setCurrentCourse: (state, { payload }) => {
      state.currentCourse = payload;
    }
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  setCurrentCourse
} = courseSlice.actions;

export default courseSlice.reducer;
