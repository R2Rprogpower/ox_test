import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching statuses
export const fetchStatuses = createAsyncThunk(
  'status/fetchStatuses',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/statuses', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });
      return response.data; // Return the list of statuses
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const statusSlice = createSlice({
  name: 'status',
  initialState: {
    statuses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatuses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStatuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.statuses = action.payload; // Update state with the fetched statuses
      })
      .addCase(fetchStatuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default statusSlice.reducer;
