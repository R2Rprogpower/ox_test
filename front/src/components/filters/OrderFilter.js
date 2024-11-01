import React from 'react';

const OrderFilter = ({ filter, setFilter }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="filters">
        <input
          type="text"
          name="orderId"
          placeholder="Filter by Order ID"
          value={filter.orderId}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="clientName"
          placeholder="Filter by Client Name"
          value={filter.clientName}
          onChange={handleFilterChange}
        />
           <input
          type="text"
          name="productName"
          placeholder="Filter by Product Name"
          value={filter.productName}
          onChange={handleFilterChange}
        />

        <input
          type="text"
          name="status"
          placeholder="Filter by Status"
          value={filter.status}
          onChange={handleFilterChange}
        />
      </div>
  );
};

export default OrderFilter;
