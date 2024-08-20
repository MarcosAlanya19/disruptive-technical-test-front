import React from 'react';
import { IContent } from '../../../content/types/IContent.type';

interface IProps {
  data: IContent;
}

export const ContentCard: React.FC<IProps> = ({ data }) => {
  return (
    <article className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex flex-col justify-between">
      <div>
        <header>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {data.title}
          </h5>
        </header>
        <main>
          <section className="mb-4">
            <p className="font-normal text-gray-700 dark:text-gray-400">{data?.textContent}</p>
          </section>
          <section className="mb-4">
            <a
              href={data?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal text-blue-500 dark:text-blue-300 hover:underline break-words max-w-full"
            >
              {data.url}
            </a>
          </section>
        </main>
      </div>
      <footer className="flex justify-between">
        <p className="font-normal text-gray-700 dark:text-gray-400">{data.credits}</p>
        <p className="font-normal text-gray-700 dark:text-gray-400">{data.type}</p>
      </footer>
    </article>
  );
};
