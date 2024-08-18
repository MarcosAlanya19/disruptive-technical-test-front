import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../context/auth-context';
import { IregisterPayload } from '../services/register.service';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IregisterPayload>();
  const { signup, isAuthenticated } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    await signup(values);
  });

  React.useEffect(() => {
    isAuthenticated && navigate('/tasks');
  }, [isAuthenticated, navigate]);

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input className='input-custom' type='text' {...register('username', { required: true })} />
        <input className='input-custom' type='text' {...register('email', { required: true })} />
        <input className='input-custom' type='password' {...register('password', { required: true })} />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};

export const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<IregisterPayload>();

  const { signin } = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    console.log({data})
    await signin(data);
  });

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input className='input-custom' type='text' {...register('email', { required: true })} />
        <input className='input-custom' type='password' {...register('password', { required: true })} />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
};
