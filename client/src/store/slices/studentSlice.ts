import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { Student } from '../../features/students/types';
import axios from 'axios';

// GET
export const getAllUser = createAsyncThunk<Student[]>(
  'students/getAllUser',
  async () => {
    const response = await axios.get('http://localhost:8080/students?name_like=');
    return response.data;
  }
);

// ADD
export const addUser = createAsyncThunk<Student, Omit<Student, 'id'>>(
  'students/addUser',
  async (newUser) => {
    const response = await axios.post('http://localhost:8080/students', newUser);
    return response.data;
  }
);

// UPDATE
export const updateUser = createAsyncThunk<Student, Student>(
  'students/updateUser',
  async (user) => {
    const resp = await axios.put(`http://localhost:8080/students/${user.id}`, user);
    return resp.data;
  }
);

// DELETE
export const deleteUser = createAsyncThunk<string, string>(
  'students/deleteUser',
  async (id) => {
    await axios.delete(`http://localhost:8080/students/${id}`);
    return id;
  }
);

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // chỉ update khi payload có dữ liệu
        if (!action.payload) return;
        const idx = state.students.findIndex((s) => s.id === action.payload.id);
        if (idx !== -1) {
          state.students[idx] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.students = state.students.filter((d) => d.id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
