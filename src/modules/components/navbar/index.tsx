import React from 'react';
import { Button, Navbar as NavbarFB } from 'flowbite-react';
import { IoMdLogOut } from 'react-icons/io';
import { useAuth } from '../../../context/auth-context';
import { translateRole } from '../../@common/translate';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <NavbarFB fluid rounded className='bg-gray-800 h-16 py-2'>
      <NavbarFB.Brand>
        <span className='text-xl font-semibold text-white'>PRUEBA-DISRUPTIVE</span>
      </NavbarFB.Brand>
      <div className='flex md:order-2 items-center space-x-4'>
        <div className='text-white text-right'>
          <div className='font-medium'>Bienvenido, {user?.data?.username}</div>
          <div className='flex gap-2'>
            <div className='text-sm'>Creditos: {user?.data?.credits}</div>
            <div className='text-sm'>Rol: {translateRole[user?.data?.role]}</div>
          </div>
        </div>
        <Button onClick={logout} color='light' className='bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'>
          <IoMdLogOut size={24} />
        </Button>
        <NavbarFB.Toggle />
      </div>
    </NavbarFB>
  );
};
