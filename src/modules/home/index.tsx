import React from 'react';

/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import { Button } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';
import { IOption } from '../@common/types/options';
import { useBoolean } from '../@common/use-boolean';
import { InputUseForm } from '../components/form/input-use-form';
import { SelectUseForm } from '../components/form/select-use-form';
import { UseFormWrapper } from '../components/form/use-form-wrapper';
import { ERolseUser, IregisterPayload } from '../register/services/register.service';

export const roleOptions: IOption[] = [
  { label: 'Lector', value: ERolseUser.READER },
  { label: 'Creador', value: ERolseUser.CREATOR },
  { label: 'Administrador', value: ERolseUser.ADMIN },
];

export const Home = () => {
  const navigate = useNavigate();

  const { isAuthenticated, signup, signin } = useAuth();
  const isAuth = useBoolean(true);

  const methods = useForm<IregisterPayload>();
  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    const payloadInitSesion = {
      email: data.email,
      password: data.password,
    };

    const payloadRegister = {
      ...payloadInitSesion,
      username: data.username,
      role: data.role,
    };

    if (isAuth.active) {
      return signup(payloadRegister);
    }
    signin(payloadInitSesion);
  });

  React.useEffect(() => {
    isAuthenticated && navigate('/tasks');
  }, [isAuthenticated, navigate]);

  return (
    <div className={clsx('grid bg-slate-200 gap-2 h-screen', !isAuthenticated && 'grid-cols-[400px_1fr]')}>
      {!isAuthenticated && (
        <div className='h-screen p-6 bg-white rounded-lg shadow-md grid items-center'>
          <div>
            <h2 className='text-4xl font-semibold mb-4 flex justify-center'>{isAuth.active ? 'REGISTRO' : 'INICIO DE SESION'}</h2>
            <UseFormWrapper methods={methods} className='grid gap-3'>
              {isAuth.active && <InputUseForm label='Nombre de usuario' name='username' placeholder='Marcos' />}
              <InputUseForm label='Correo electronico' name='email' placeholder='email@example.com' />
              <InputUseForm type='password' label='Contraseña' name='password' placeholder='********' />
              {isAuth.active && <SelectUseForm label='Role' name='role' options={roleOptions} defaultValue={roleOptions[0]} />}

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                {isAuth.active ? (
                  <p>
                    ¿Ya tienes una cuenta?{' '}
                    <span onClick={isAuth.toggle} style={{ color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}>
                      Inicia sesión
                    </span>
                  </p>
                ) : (
                  <p>
                    ¿No tienes una cuenta?{' '}
                    <span onClick={isAuth.toggle} style={{ color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}>
                      Regístrate
                    </span>
                  </p>
                )}
              </div>

              <Button type='submit' className='w-full' onClick={onSubmit}>
                ENVIAR
              </Button>
            </UseFormWrapper>
          </div>
        </div>
      )}
      <div className='bg-gray-100 p-6'>Contenido adicional</div>
    </div>
  );
};
