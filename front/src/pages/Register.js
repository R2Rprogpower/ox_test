import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store';

function Register() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();


    const password = watch('password');


    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/register', data);
            dispatch(setAuth({ user: response.data.user, token: response.data.token }));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register('name', { required: 'Name is required' })}
                placeholder="Name"
            />
            {errors.name && <p>{errors.name.message}</p>}

            <input
                {...register('email', { required: 'Email is required' })}
                placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}

            <input
                {...register('password', {
                    required: 'Password is required',
                    minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                })}
                type="password"
                placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
                {...register('password_confirmation', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                        value === password || 'Passwords do not match'
                })}
                type="password"
                placeholder="Confirm Password"
            />
            {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}

            <button type="submit">Register</button>
        </form>
    );
}

export default Register;
