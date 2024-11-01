import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeOrder, updateOrder, fetchOrderById } from '../../store/orderSlice'; 
import { fetchClients } from '../../store/clientSlice'; 
import { fetchStatuses } from '../../store/statusSlice';

const OrderForm = ({ onClose, order }) => {
  const dispatch = useDispatch();

  // Local state for form inputs
  const [formData, setFormData] = useState({
    client_id: '',
    status_id: '',
    total_amount: '',
    product_name: '',
  });

  // Fetch clients and statuses when the component mounts
  useEffect(() => {
    if (order) {
      setFormData({
        client_id: order.client_id || '',
        total_amount: order.total_amount || '',
        product_name: order.product_name || '',
      });
    }
  }, [dispatch, order]);

  // Select clients and statuses from the Redux store
  const clients = useSelector((state) => state.client.clients);
  const statuses = useSelector((state) => state.status.statuses);
  const token = localStorage.getItem('authToken'); // Get the token from localStorage
  if (token) {
    dispatch(fetchClients(token));
    dispatch(fetchStatuses(token));
  }

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); // Get the token from localStorage

    if (token) {
      try {
        if (order) {
          // If editing
          const actionResult = await dispatch(updateOrder({ orderId: order.id, formData, token }));
          if (updateOrder.fulfilled.match(actionResult)) {
             
            dispatch(fetchOrderById({ orderId: order.id, token }));
            onClose(); // Optionally close the form
        } else {
            // Handle updating error
            console.error('Failed to update order:', actionResult.error);
        }

        } else {
          // If Adding
          const actionResult =   await dispatch(storeOrder({ formData, token }));
          if (storeOrder.fulfilled.match(actionResult)) {
            const newOrderId = actionResult.payload.id;
            const fetchResult = await dispatch(fetchOrderById({ orderId: newOrderId, token }));
      
            if (fetchOrderById.fulfilled.match(fetchResult)) {
              // Order fetched successfully
              onClose(); // Optionally close the form
            } else {
              // Handle fetching error
              console.error('Failed to fetch the order:', fetchResult.error);
            }
          } else {
            // Handle order storing error
            console.error('Failed to save order:', actionResult.error);
          }

        }
        onClose(); // Close the form on successful submission
      } catch (error) {
        console.error('Failed to save order:', error);
        // Handle error (e.g., show an error message)
      }
    } else {
      console.error('No authentication token found');
      // Handle the case where token is not found (e.g., redirect to login)
    }
  };

  return (

    (!clients.length || !statuses.length) ? (
      <p>Loading clients and statuses...</p>
    ) :


    <form onSubmit={handleSubmit}>
      {/* Client Select */}
      <label>
        Client:
        <select
          name="client_id"
          value={formData.client_id}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Client</option>
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </label>

      {/* Status Select */}
      {!order && (
        <label>
          Status:
          <select
            name="status_id"
            value={formData.status_id}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Total Amount Input */}
      <label>
        Total Amount:
        <input
          type="number"
          name="total_amount"
          value={formData.total_amount}
          onChange={handleInputChange}
          min="0"
          required
        />
      </label>

      {/* Product Name Input */}
      <label>
        Product Name:
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleInputChange}
          required
        />
      </label>

      <button type="submit">{order ? 'Update' : 'Save'}</button>
    </form>
  );
};

export default OrderForm;
