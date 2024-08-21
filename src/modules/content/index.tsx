import React from 'react';

import { Button } from 'flowbite-react';
import Skeleton from 'react-loading-skeleton';
import Select, { SingleValue } from 'react-select';
import { useAuth } from '../../context/auth-context';
import { useOptions } from '../../context/options-context';
import { baseSelectStyles } from '../@common/styles';
import { IOption } from '../@common/types/options';
import { useBoolean } from '../@common/use-boolean';
import { ERoleUser } from '../auth/services/register.service';
import { ContentCard } from '../home/components/content-card';
import { CreateContentModal } from '../home/components/create-content-modal';
import { IcontentPayload } from './services/createContent.service';
import { IcontentQueryParams } from './services/getContent.service';
import { IContent } from './types/IContent.type';

interface IProps {
  data: IContent[];
  onSubmit: (payload: IcontentPayload) => Promise<void>;
  onChangeFilters: React.Dispatch<React.SetStateAction<IcontentQueryParams>>;
  isLoading: boolean;
  refreshContent: () => void;
}

export const Content: React.FC<IProps> = (props) => {
  const { data, onSubmit, isLoading, refreshContent, onChangeFilters } = props;
  const { user } = useAuth();

  const createContentModal = useBoolean();

  return (
    <>
      <div className='bg-gray-100 p-6 min-h-[calc(100vh-4rem)]'>
        <div className='flex flex-col sm:flex-row justify-between items-center mb-4'>
          <h2 className='text-xl font-bold mb-4 sm:mb-0'>Contenido adicional</h2>
          {user?.data?.role === ERoleUser.CREATOR && <Button onClick={createContentModal.on}>Nuevo contenido</Button>}
        </div>

        <FilterSection onChangeFilters={onChangeFilters} data={data} />
        {isLoading ? (
          <div className='flex justify-center items-center'>
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
              <Skeleton height={200} className='rounded-lg' />
              <Skeleton height={200} className='rounded-lg' />
              <Skeleton height={200} className='rounded-lg' />
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className='flex justify-center items-center h-20'>
            <p>No hay contenido disponible.</p>
          </div>
        ) : (
          <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
            {data?.map((content) => (
              <ContentCard key={content.uuid} data={content} />
            ))}
          </div>
        )}
      </div>

      <CreateContentModal refreshContent={refreshContent} onSubmit={onSubmit} showModal={createContentModal.active} onCloseModal={createContentModal.off} />
    </>
  );
};

function FilterSection({ data, onChangeFilters }: { data: IContent[]; onChangeFilters: React.Dispatch<React.SetStateAction<IcontentQueryParams>> }) {
  const { category, theme } = useOptions();

  const [initialOptionsName, setInitialOptionsName] = React.useState<IOption[]>([]);

  React.useEffect(() => {
    if (data.length > 0) {
      const uniqueTitles = new Set<string>(data.map((content) => content.title));

      setInitialOptionsName([
        { label: 'Todos', value: '' },
        ...Array.from(uniqueTitles).map((title) => ({
          label: title,
          value: title,
        })),
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const categoryOptions = [{ label: 'Todos', value: '' }, ...(category?.options || [])];
  const themeOptions = [{ label: 'Todos', value: '' }, ...(theme?.options || [])];

  const options: { label: string; options: IOption[]; isLoading: boolean }[] = [
    { label: 'Temática', options: themeOptions, isLoading: theme?.loading || false },
    { label: 'Categoría', options: categoryOptions, isLoading: category?.loading || false },
    {
      label: 'Nombre',
      options: initialOptionsName,
      isLoading: false,
    },
  ];

  const handleFilterChange = (selectedOption: SingleValue<IOption>, name: string) => {
    onChangeFilters((prevFilters) => ({
      ...prevFilters,
      [name]: selectedOption ? selectedOption.value : '',
    }));
  };

  const hasOptions = options.some((option) => option.options.length > 0);
  if (!hasOptions) return null;

  return (
    <div className='bg-white p-4 mb-6 rounded-lg shadow-md flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
      <div className='flex-1'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre</label>
        <Select
          name='name'
          defaultValue={initialOptionsName[0]}
          options={initialOptionsName}
          styles={baseSelectStyles}
          onChange={(option) => handleFilterChange(option as SingleValue<IOption>, 'name')}
        />
      </div>
      <div className='flex-1'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Categoría</label>
        <Select
          name='category'
          defaultValue={options.find((option) => option.label === 'Categoría')?.options[0]}
          options={options.find((option) => option.label === 'Categoría')?.options || []}
          styles={baseSelectStyles}
          onChange={(option) => handleFilterChange(option as SingleValue<IOption>, 'category')}
        />
      </div>
      <div className='flex-1'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Temática</label>
        <Select
          name='theme'
          defaultValue={options.find((option) => option.label === 'Temática')?.options[0]}
          options={options.find((option) => option.label === 'Temática')?.options || []}
          styles={baseSelectStyles}
          onChange={(option) => handleFilterChange(option as SingleValue<IOption>, 'theme')}
        />
      </div>
    </div>
  );
}
