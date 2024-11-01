import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../store'; // Import logout action
import { store } from '../../store'; // Assuming your store is exported from here

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const state = store.getState(); // Get the current state
  var token = state.auth.token; // Access the token
  if (!token) {
    token = localStorage.getItem('authToken'); 
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/orders', {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        });
        setUsers(response.data); // Assume response.data contains the user list
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // If unauthorized, logout the user
          dispatch(logout());
          setError('Your session has expired. Please log in again.');
        } else {
          setError('Failed to fetch users.');
        }
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token, dispatch]);

  return (
    <div>
      <h1>User List</h1>
      {error && <p>{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li> // Display user name and email
        ))}
      </ul>
    </div>
  );
};

export default UserList;
