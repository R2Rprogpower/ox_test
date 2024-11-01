import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/orders', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      return response.data; // Return the response data directly

    } catch (error) {
      // Handle errors
      if (error.response) {
        // The request was made and the server responded with a status code
        return rejectWithValue(error.response.data); // Use the server's response data for errors
      } else if (error.request) {
        // The request was made but no response was received
        return rejectWithValue({ message: 'No response from server' });
      } else {
        // Something happened in setting up the request that triggered an Error
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const deleteOrder = createAsyncThunk(
  'order/deleteOrder',
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the headers
        },
      });

      return response.data; // Return the response data after successful deletion
    } catch (error) {
      // Handle errors
      if (error.response) {
        return rejectWithValue(error.response.data); // Use server's error response
      } else if (error.request) {
        return rejectWithValue({ message: 'No response from server' });
      } else {
        return rejectWithValue({ message: error.message });
      }
    }
  }
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async ({ orderId, updatedData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/orders/${orderId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return updated order data

    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);



// Async thunk for adding a new order
export const addOrder = createAsyncThunk(
  'order/addOrder',
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/orders', newOrder, {
        headers: {
          Authorization: `Bearer ${newOrder.token}`, // Include token if needed
        },
      });
      return response.data; // Return the added order data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export  const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], status: 'idle', error: null },
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload); // Adds a new order to the state
    },
    updateOrder: (state, action) => {
      const { id, updatedOrder } = action.payload;
      const index = state.orders.findIndex(order => order.id === id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder }; // Updates the specific order
      }
    },
    deleteOrder: (state, action) => {
     
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; 
      }).addCase(deleteOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const orderId = action.payload;
        state.orders = state.orders.filter(order => order.id !== orderId); // Removes the order from the state
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Failed to fetch orders' };
      })    .addCase(addOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const {} = orderSlice.actions;
