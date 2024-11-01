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
      console.log('Response from API:', response);

      return orderId; // Return the response data after successful deletion
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
  async ({ orderId, formData, token }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/orders/${orderId}`, formData, {
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
export const storeOrder = createAsyncThunk(
  'order/storeOrder',
  async ({formData, token}, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/orders', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if needed
        },
      });
      return response.data; // Return the added order data from the response
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const fetchOrderById = createAsyncThunk(
  'order/fetchOrderById',
  async ({ orderId, token }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Return the response data directly
    } catch (error) {
      // Handle errors
      return handleFetchError(error, rejectWithValue);
    }
  }
);
const handleFetchError = (error, rejectWithValue) => {
  if (error.response) {
    return rejectWithValue(error.response.data);
  } else if (error.request) {
    return rejectWithValue({ message: 'No response from server' });
  } else {
    return rejectWithValue({ message: error.message });
  }
};

export  const orderSlice = createSlice({
  name: 'order',
  initialState: { orders: [], status: 'idle', error: null },
  reducers: {
    storeOrder: (state, action) => {
      state.orders.push(action.payload); // Adds a new order to the state
    },
    updateOrder: (state, action) => {
      const { id, updatedOrder } = action.payload;
      const index = state.orders.findIndex(order => order.id === id);
      if (index !== -1) {
        state.orders[index] = { ...state.orders[index], ...updatedOrder }; // Updates the specific order
      }
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
        const orderId = action.meta.arg.orderId; // Accessing orderId from action meta
        state.orders = state.orders.filter(order => order.id !== orderId); // Remove the order from state
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || { message: 'Failed to fetch orders' };
      })    .addCase(storeOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(storeOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';

      })
      .addCase(storeOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        if (action.payload) {
          const existingOrderIndex = state.orders.findIndex(order => order.id === action.payload.id);
          
          if (existingOrderIndex === -1) {
              // If the order does not exist, push it to the orders array
              state.orders.push(action.payload);
          } else {
              // Optionally update the existing order with new data if needed
              state.orders[existingOrderIndex] = action.payload;
          }
        }
      });
  },
});

export const { reducer: orderReducer } = orderSlice;
export default orderReducer;
