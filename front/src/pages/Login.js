import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data) => {
    data.token_name = "v1";

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', data);
      const { user, token } = response.data;

      localStorage.setItem('authToken', token);

      dispatch(setAuth({ user: user, token: token }));
      navigate('/users'); // Redirect to the User List on successful login

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        {...register('password', { required: 'Password is required' })}
        type="password"
        placeholder="Password"
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
