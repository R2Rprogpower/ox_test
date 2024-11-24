import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, deleteOrder, updateOrder, fetchOrderById} from '../../store/orderSlice'; // Adjust the path as necessary
import { fetchClients } from '../../store/clientSlice'; 
import { fetchStatuses } from '../../store/statusSlice';

import { logout } from '../../store/authSlice'; // Assuming you have a logout action
import OrderFilter from '../filters/OrderFilter'; // Import the new filter component
import OrderForm from '../forms/OrderForm';

import OrderSort from '../sorts/OrderSort'; // Import the sorting component

// @todo: fix naming issue
import Popup from '../Popup';

const LeadTable = () => {
  const dispatch = useDispatch();
  const clients = useSelector(state => state.client.clients);
  // const clients = useSelector((state) => state.client.clients);
  // const statuses = useSelector((state) => state.status.statuses);


 
  const status = useSelector(state => state.order.status);
  const error = useSelector(state => state.order.error);
  const [authToken, setAuthToken] = useState('');
  // const [filteredOrders, setFilteredOrders] = useState([]);
  const [filter, setFilter] = useState({ orderId: '', clientName: '', status: '' });

  const [sortField, setSortField] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get token from Redux state or localStorage
  useEffect(() => {
    const authToken = localStorage.getItem('authToken'); // Get the token from localStorage
    if (authToken) {
      setAuthToken(authToken); // Set the token state
      // dispatch(fetchOrders(authToken));
      dispatch(fetchClients(authToken));
      // dispatch(fetchStatuses(authToken));
    }
  }, []); 

 

 

  const handleDeleteOrder = async (orderId) => {
    var token = localStorage.getItem('authToken'); // Get the token from localStorage
    const resultAction = await dispatch(deleteOrder({ orderId, token }));
  
    if (deleteOrder.fulfilled.match(resultAction)) {
      console.log(`Deleted order with ID: ${orderId}`);
      console.log('Attempting to delete order with ID:', orderId);
    } else {
      console.error('Failed to delete order:', resultAction.payload);
    }
  };
  

  // Handle unauthorized access
  useEffect(() => {
    if (status === 'failed' && error) {
      if (error.message === 'Unauthorized') { // Adjust based on your API error response
        dispatch(logout());
      }
    }

    
  }, [status, error, dispatch]);


  // useEffect(() => {
  //   const applyFiltersAndSort = () => {
  //     let filtered = orders;

  //     if (filter.orderId) {
  //       filtered = filtered.filter(order => order.id.toString().includes(filter.orderId));
  //     }
  //     if (filter.clientName) {
  //       filtered = filtered.filter(order => order.client.name.toLowerCase().includes(filter.clientName.toLowerCase()));
  //     }
  //     if (filter.productName) {
  //       filtered = filtered.filter(order => order.product_name.toLowerCase().includes(filter.productName.toLowerCase()));
  //     }
  //     if (filter.status) {
  //       filtered = filtered.filter(order => 
  //         order.statuses.some(status => status.name.toLowerCase().includes(filter.status.toLowerCase()))
  //       );
  //     }


  //     const filteredCopy = [...filtered]; // Create a shallow copy

  //     if (sortField && sortOrder) {
  //       filteredCopy.sort((a, b) => {
  //         const aValue = a[sortField];
  //         const bValue = b[sortField];
    
  //         if (aValue < bValue) {
  //           return sortOrder === 'asc' ? -1 : 1;
  //         }
  //         if (aValue > bValue) {
  //           return sortOrder === 'asc' ? 1 : -1;
  //         }
  //         return 0;
  //       });
  //     }
    
  //     // Set the filtered orders to the sorted copy
  //     setFilteredOrders(filteredCopy);  
  //   };

  //   applyFiltersAndSort();
  // }, [filter, sortField, sortOrder]);

   
 
  
  const handleUpdateStatus = (orderId, statusId) => {
    if (statusId) {
        const formData = { status_id: statusId }; // Create formData with the status_id to update
        const token = localStorage.getItem('authToken'); // Get the token from localStorage

        if (token) {
            dispatch(updateOrder({ orderId, formData, token })) // Dispatch updateOrder with orderId and formData
                .then((actionResult) => {
                    if (updateOrder.fulfilled.match(actionResult)) {
                        // Handle successful update (e.g., show a success message or refresh order data)
                        console.log('Order status updated successfully');
                        dispatch(fetchOrderById({ orderId, token })); // Optionally fetch updated order
                    } else {
                        // Handle updating error
                        console.error('Failed to update order status:', actionResult.error);
                    }
                })
                .catch((error) => {
                    console.error('Error updating order status:', error);
                });
        } else {
            console.error('No authentication token found');
            // Handle the case where the token is not found (e.g., redirect to login)
        }
    }
};
 

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedOrder(null); // Reset selected order when closing
  };

  // const handleUpdateOrder = (orderId) => {
  //   const orderToEdit = orders.find(order => order.id === orderId);
  //   setSelectedOrder(orderToEdit); // Set the selected order for editing
  //   handleOpenPopup(); // Open the popup
  // };
  const handleStoreOrder = () => {
    handleOpenPopup(); // Open the popup
  };
  return (        
    <div>
      <h1>Lead Table</h1>
      {error && <p>{error}</p>}
 
      <table>
        <thead>
        <tr>
          <th>Order ID</th>
          <th>Person</th>
          <th>Company</th>
          <th>Comment</th>
          <th>Tag Names</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Statuses</th>
      </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map(client => (
              <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.person}</td>
                  <td>{client.company}</td>
                  <td>{client.comment}</td>
                  <td>{client.tag_names.length > 0 ? client.tag_names.join(", ") : "No tags"}</td>
                  <td>{client.phones && client.phones.length > 0 ? client.phones.join(", ") : "No phone"}</td>
                  <td>{client.address ? client.address : "No address"}</td>
                  <td>
                    {client.statuses && client.statuses.length > 0 ? (
                      client.statuses.map(status => (
                        <span key={status.id} className="status-badge" style={{ backgroundColor: status.color }}>
                          {status.name}
                        </span>
                      ))
                    ) : (
                      <span>No status</span>
                    )}
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

export default LeadTable;
