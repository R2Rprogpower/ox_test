import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Rename async thunk to avoid conflict with the slice action
export const fetchClients = createAsyncThunk(
  'client/fetchClients',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/clients', {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue({ message: 'No response from server' });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

// Rename async thunk to avoid conflict
export const storeClient = createAsyncThunk(
  'client/storeClient', // Changed name to 'storeClient'
  async ({ clientData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/clients', clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const clientSlice = createSlice({
  name: 'client',
  initialState: { clients: [], status: 'idle', error: null },
  reducers: {
    addClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const { id, updatedClient } = action.payload;
      const index = state.clients.findIndex(client => client.id === id);
      if (index !== -1) {
        state.clients[index] = { ...state.clients[index], ...updatedClient };
      }
    },
    deleteClient: (state, action) => {
      const clientId = action.payload;
      state.clients = state.clients.filter(client => client.id !== clientId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(storeClient.pending, (state) => { // Use renamed async thunk here
        state.status = 'loading';
      })
      .addCase(storeClient.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clients.push(action.payload);
      })
      .addCase(storeClient.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default clientSlice.reducer;
export const { addClient, updateClient, deleteClient } = clientSlice.actions;
