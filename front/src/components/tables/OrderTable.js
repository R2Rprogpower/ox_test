import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrder, deleteOrder } from '../../store/orderSlice'; // Adjust the path as necessary
import { logout } from '../../store/authSlice'; // Assuming you have a logout action
import OrderFilter from '../filters/OrderFilter'; // Import the new filter component

const OrderTable = () => {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.order.orders);
  // const statuses = useSelector(state => state.status.statuses);

  const status = useSelector(state => state.order.status);
  const error = useSelector(state => state.order.error);
  const [authToken, setAuthToken] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState({ orderId: '', clientName: '', status: '' });


  // Get token from Redux state or localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Get the token from localStorage
    if (authToken) {
      setAuthToken(authToken); // Set the token state
    }
  }, []); 

  // Fetch orders when component mounts or authToken changes
  useEffect(() => {
    if (authToken) {
      dispatch(fetchOrders(authToken));
    }
  }, [authToken, dispatch]);


  
  const handleUpdateOrder = (orderId, updatedData) => {
    // open form.

    // dispatch when form is submitted
    dispatch(updateOrder({ orderId, updatedData, authToken }));
  };

 
  const handleDeleteOrder = useCallback(
    async (orderId) => {
      const confirmDelete = window.confirm(`Are you sure you want to delete order ID ${orderId}?`);
      if (confirmDelete) {
        
        try {
          var token = localStorage.getItem('authToken'); // Get the token from localStorage
          await dispatch(deleteOrder({ orderId, token }));

          dispatch(fetchOrders(token));

          console.log(`Deleted order with ID: ${orderId}`);
        } catch (err) {
          console.error('Failed to delete the order:', err);
        }
      }
    },
    [authToken, dispatch] // Add `authToken` and `dispatch` as dependencies
  );


  

  // Handle unauthorized access
  useEffect(() => {
    if (status === 'failed' && error) {
      if (error.message === 'Unauthorized') { // Adjust based on your API error response
        dispatch(logout());
      }
    }

    
  }, [status, error, dispatch]);


  useEffect(() => {
    const applyFilters = () => {
      let filtered = orders;

      if (filter.orderId) {
        filtered = filtered.filter(order => order.id.toString().includes(filter.orderId));
      }
      if (filter.clientName) {
        filtered = filtered.filter(order => order.client.name.toLowerCase().includes(filter.clientName.toLowerCase()));
      }
      if (filter.productName) {
        filtered = filtered.filter(order => order.product_name.toLowerCase().includes(filter.productName.toLowerCase()));
      }
      if (filter.status) {
        filtered = filtered.filter(order => 
          order.statuses.some(status => status.name.toLowerCase().includes(filter.status.toLowerCase()))
        );
      }

      setFilteredOrders(filtered);
    };

    applyFilters();
  }, [filter, orders]);

   
 

   
  const handleUpdateStatus = async (orderId, newStatusId) => {

    console.log(`Update status with ${newStatusId} for order with ID: ${orderId}`);
 
    // try {
    //   await axios.put(`/api/orders/${orderId}/status`, { status_id: newStatusId }); // Adjust the URL as necessary
    //   // Update the order status in the state
    //   setOrders(prevOrders =>
    //     prevOrders.map(order =>
    //       order.id === orderId ? { ...order, statuses: [...order.statuses, { id: newStatusId }] } : order
    //     )
    //   );
    //   setFilteredOrders(prevOrders =>
    //     prevOrders.map(order =>
    //       order.id === orderId ? { ...order, statuses: [...order.statuses, { id: newStatusId }] } : order
    //     )
    //   );
    // } catch (err) {
    //   setError('Failed to update the order status.');
    // }
  };
  
  return (
    <div>
      <h1>Order Table</h1>
      {error && <p>{error}</p>}

      <OrderFilter filter={filter} setFilter={setFilter} /> {/* Use the filter component */}




    

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product Name</th>
            <th>Total</th>
            <th>Client Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Statuses</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.product_name}</td>
                <td>{order.total_amount}</td>
                <td>{order.client.name}</td>
                <td>{order.client.email}</td>
                <td>{order.client.phone}</td>
                <td>{order.client.address}</td>
                <td>
                  {order.statuses.map(status => (
                    <span key={status.id} className="status-badge">
                      {status.name}
                    </span>
                  ))}
                </td>
                <td>
                  <button onClick={() => handleUpdateOrder(order.id)}>Edit</button>
                  <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
                  <select onChange={(e) => handleUpdateStatus(order.id, e.target.value)} defaultValue="">
                    <option value="" disabled>Select Status</option>
                    {order.statuses.map(status => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => handleUpdateStatus(order.id, order.statuses[0]?.id)}>Update Status</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No orders found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
