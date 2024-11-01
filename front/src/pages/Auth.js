
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../components/forms/LoginForm';
import Register from '../components/forms/RegisterForm';

const Auth = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="*" element={<Navigate to="login" />} />
  </Routes>
);

export default Auth;