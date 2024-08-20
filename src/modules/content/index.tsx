import { Button } from 'flowbite-react';
import React from 'react';
import Select from 'react-select';
import { baseSelectStyles } from '../@common/styles';
import { useBoolean } from '../@common/use-boolean';
import { ContentCard } from '../home/components/content-card';
import { CreateContentModal } from '../home/components/create-content-modal';
import { IcontentPayload } from './services/createContent.service';
import { IContent } from './types/IContent.type';


interface IProps {
  data: IContent[]
  onSubmit: (payload: IcontentPayload) => void;
  isLoading: boolean
}

export const Content: React.FC<IProps> = (props) => {
  const { data, onSubmit } = props
  const createContentModal = useBoolean();

  return (
    <>
      <div className='bg-gray-100 p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Contenido adicional</h2>
          {/* {user?.data?.role === ERoleUser.CREATOR && <Button onClick={createContentModal.on}>Nuevo contenido</Button>} */}
          <Button onClick={createContentModal.on}>Nuevo contenido</Button>
        </div>
        <div className='bg-white p-4 mb-6 rounded-lg shadow-md flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6'>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Temática</label>
            <Select styles={baseSelectStyles} options={[{ label: 'hola', value: '' }]} />
          </div>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Categoría</label>
            <Select styles={baseSelectStyles} options={[{ label: 'hola', value: '' }]} />
          </div>
          <div className='flex-1'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Nombre</label>
            <Select styles={baseSelectStyles} options={[{ label: 'hola', value: '' }]} />
          </div>
        </div>
        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
          {data?.map((content) => (
            <ContentCard key={content.url} data={content} />
          ))}
        </div>
      </div>

      <CreateContentModal onSubmit={onSubmit} showModal={createContentModal.active} onCloseModal={createContentModal.off} />
    </>
  );
};
