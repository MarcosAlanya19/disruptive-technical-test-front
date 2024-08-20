import { Avatar, Tooltip } from 'flowbite-react';
import React from 'react';
import { useAuth } from '../../../../context/auth-context';
import { IContent } from '../../../content/types/IContent.type';

interface IProps {
  data: IContent;
}

export const ContentCard: React.FC<IProps> = ({ data }) => {
  const { isAuthenticated } = useAuth();

  return (
    <article className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out'>
      <header className='mb-4 justify-between flex'>
        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2'>{data.title}</h5>
        <p className='text-gray-700 dark:text-gray-400 flex items-center'>
          <Avatar img={data.category.image} rounded={true} size='md' className='mr-2' />
          {data.category.name}
        </p>
      </header>
      <main className='mb-6'>
        {data?.textContent && (
          <section className='mb-4'>
            <p className='text-gray-700 dark:text-gray-400 line-clamp-3'>{data?.textContent}</p>
          </section>
        )}
        {isAuthenticated && data?.url && (
          <section className='mb-4'>
            <a href={data.url} target='_blank' rel='noopener noreferrer' className='text-blue-500 dark:text-blue-300 hover:underline break-words'>
              {data.url}
            </a>
          </section>
        )}
      </main>
      <footer className='flex'>
        <Tooltip content={`Permisos: ${data.theme.allowsImages ? 'Imagenes |' : ''} ${data.theme.allowsTexts ? 'Textos |' : ''}  ${data.theme.allowsVideos ? 'Videos' : ''}`}>
          <p className='font-normal text-gray-700 dark:text-gray-400'>Tematica: {data.theme.name}</p>
        </Tooltip>
      </footer>
    </article>
  );
};
