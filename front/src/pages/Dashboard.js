// src/pages/Dashboard.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Popup from '../components/Popup';
import OrderForm from '../components/forms/OrderForm';
import OrderTable from '../components/tables/OrderTable'; // Adjust the path as necessary

// import ClientForm from '../components/forms/ClientForm';
// import StatusForm from '../components/forms/StatusForm';

const Dashboard = () => {
  // Assuming orders, clients, statuses are fetched in your redux slices
  const orders = useSelector((state) => state.order.orders);
  // const clients = useSelector((state) => state.client.clients);
  // const statuses = useSelector((state) => state.status.statuses);

  
  return (
    <div>
      <h1>Dashboard</h1>
      <OrderTable />
      {/* Orders List */}
      <section>
        <h2>Orders</h2>
        <button onClick={() => console.log('add order')}>Add Order</button>
        {orders.map((order) => (
          <div key={order.id}>{order.name}</div>
        ))}
      </section>
      {/* Similar sections for clients and statuses */}
      <Popup>
        {/* Use the Popup component to render forms conditionally */}
      </Popup>
    </div>
  );
};

export default Dashboard;
