import React from 'react';
import { Button, Navbar as NavbarFB } from 'flowbite-react';
import { IoMdLogOut } from 'react-icons/io';
import { useAuth } from '../../../context/auth-context';
import { translateRole } from '../../@common/translate';

export const Navbar: React.FC = () => {
  const { user, logout, moreCredits } = useAuth();

  return (
    <NavbarFB fluid rounded className='bg-gray-800 py-2'>
      <NavbarFB.Brand href="#" className='flex items-center'>
        <span className='text-xl font-semibold text-white whitespace-nowrap'>PRUEBA-DISRUPTIVE</span>
      </NavbarFB.Brand>
      <div className='flex flex-col md:flex-row items-center justify-between w-full md:w-auto gap-6'>
        <div className='text-white text-center md:text-right mb-2 md:mb-0'>
          <div className='font-medium'>Bienvenido, {user?.data?.username}</div>
          <div className='flex flex-col md:flex-row gap-2 justify-center md:justify-end'>
            <div className='text-sm'>Créditos: {moreCredits ?? user?.data?.credits}</div>
            <div className='text-sm'>Rol: {translateRole[user?.data?.role]}</div>
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <Button
            onClick={logout}
            color='light'
            className='bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300'>
            <IoMdLogOut size={24} />
          </Button>
          <NavbarFB.Toggle />
        </div>
      </div>
    </NavbarFB>
  );
};
