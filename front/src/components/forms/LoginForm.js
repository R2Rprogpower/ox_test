import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const authError = useSelector(state => state.auth.error);

  const onSubmit = (data) => {
    data.token_name = "v1";
    dispatch(loginUser(data)).then((result) => {
      if (result.type === 'auth/loginUser/fulfilled') {
        navigate('/dashboard');
      }
    });
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

      {authStatus === 'loading' && <p>Loading...</p>}
      {authError && <p>{typeof authError === 'string' ? authError : authError.message || 'An error occurred.'}</p>}

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
