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
    <article className='p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 transition-all duration-300 ease-in-out'>
      <header className='mb-4 flex justify-between items-center'>
        <h5 className='text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-2'>{data.title}</h5>
        <div className='flex items-center space-x-2'>
          <Avatar img={data.category.image} rounded={true} size='sm' />
          <p className='text-sm text-gray-700 dark:text-gray-400'>{data.category.name}</p>
        </div>
      </header>
      <main className='mb-4'>
        {data?.textContent && (
          <section className='mb-2'>
            <p className='text-sm text-gray-700 dark:text-gray-400 line-clamp-3'>{data?.textContent}</p>
          </section>
        )}
        {isAuthenticated && data?.url && (
          <section className='mb-2'>
            <a href={data.url} target='_blank' rel='noopener noreferrer' className='text-sm text-blue-500 dark:text-blue-300 hover:underline break-words'>
              {data.url}
            </a>
          </section>
        )}
      </main>
      <footer className='flex items-center'>
        <Tooltip content={`Permisos: ${data.theme.allowsImages ? 'Imagenes |' : ''} ${data.theme.allowsTexts ? 'Textos |' : ''} ${data.theme.allowsVideos ? 'Videos' : ''}`}>
          <p className='text-sm text-gray-700 dark:text-gray-400'>Temática: {data.theme.name}</p>
        </Tooltip>
      </footer>
    </article>
  );
};
