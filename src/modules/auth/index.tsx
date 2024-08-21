import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'flowbite-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from '../@common/use-boolean';
import { InputUseForm } from '../components/form/input-use-form';
import { SelectUseForm } from '../components/form/select-use-form';
import { UseFormWrapper } from '../components/form/use-form-wrapper';
import { IAuthPayload } from '../home/containers/auth-container';
import { getValidationSchema, Iform, roleOptions } from './index.schema';

interface IProps {
  onSubmit: (args: IAuthPayload) => Promise<void>;
}

export const Auth: React.FC<IProps> = (props) => {
  const { onSubmit } = props;
  const isAuth = useBoolean(true);

  const validationSchema = getValidationSchema(!isAuth.active);

  const methods = useForm<Iform>({
    resolver: zodResolver(validationSchema),
    defaultValues: { email: '', password: '', role: null, username: '' },
  });

  console.log({ xd: zodResolver(validationSchema) });

  const onCustomSubmit = methods.handleSubmit((data) => {
    const loginPayload = {
      email: data.email,
      password: data.password,
    };

    const registerPayload = {
      ...loginPayload,
      username: data.username,
      role: data?.role?.value,
    };

    onSubmit({ isRegistering: isAuth.active, loginPayload, registerPayload }).then(() => {
      methods.reset();
    });
  });

  return (
    <div className='h-screen p-6 bg-white rounded-lg shadow-md flex flex-col justify-center items-center'>
      <div className='w-full max-w-md'>
        <h2 className='text-4xl font-semibold mb-4 text-center'>{isAuth.active ? 'INICIO DE SESION' : 'REGISTRO'}</h2>
        <UseFormWrapper methods={methods} className='grid gap-3'>
          {!isAuth.active && <InputUseForm label='Nombre de usuario' name='username' placeholder='Marcos' />}
          <InputUseForm label='Correo electronico' name='email' placeholder='email@example.com' />
          <InputUseForm type='password' label='Contraseña' name='password' placeholder='********' />
          {!isAuth.active && <SelectUseForm label='Role' name='role' options={roleOptions} defaultValue={roleOptions[0]} />}

          <div className='mt-4 text-center'>
            {isAuth.active ? (
              <p>
                ¿No tienes una cuenta?{' '}
                <span onClick={isAuth.toggle} className='text-blue-500 cursor-pointer underline'>
                  Regístrate
                </span>
              </p>
            ) : (
              <p>
                ¿Ya tienes una cuenta?{' '}
                <span onClick={isAuth.toggle} className='text-blue-500 cursor-pointer underline'>
                  Inicia sesión
                </span>
              </p>
            )}
          </div>

          <Button type='submit' className='w-full mt-4' onClick={onCustomSubmit}>
            ENVIAR
          </Button>
        </UseFormWrapper>
      </div>
    </div>
  );
};
