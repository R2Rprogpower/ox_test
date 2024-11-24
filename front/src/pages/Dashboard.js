// src/pages/Dashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeadTable from '../components/tables/LeadTable'; // Adjust the path as necessary

// import ClientForm from '../components/forms/ClientForm';
// import StatusForm from '../components/forms/StatusForm';

const Dashboard = () => {
  // Assuming orders, clients, statuses are fetched in your redux slices
  // const orders = useSelector((state) => state.order.orders);
  // const clients = useSelector((state) => state.client.clients);
  // const statuses = useSelector((state) => state.status.statuses);

  
  return (
    <div>
      <h1>Dashboard</h1>
      <LeadTable />
    </div>
  );
};

export default Dashboard;
