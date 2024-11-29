import React from 'react';

const OrderSort = ({ sortField, setSortField, sortOrder, setSortOrder }) => {
  const handleSortChange = (e) => {
    setSortField(e.target.value);
  };

  const handleOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      <label>
        Sort by:
        <select value={sortField} onChange={handleSortChange}>
          <option value="id">Order ID</option>
          <option value="product_name">Product Name</option>
          <option value="total_amount">Total Amount</option>
          <option value="client_name">Client Name</option>
        </select>
      </label>

      <label>
        Order:
        <select value={sortOrder} onChange={handleOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};

export default OrderSort;
