import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../store/orderSlice';

const OrderForm = ({ onClose }) => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrder({ name }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Order Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Save</button>
    </form>
  );
};

export default OrderForm;