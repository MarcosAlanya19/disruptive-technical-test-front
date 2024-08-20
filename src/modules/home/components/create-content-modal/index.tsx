import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { IOption } from '../../../@common/types/options';
import { InputUseForm } from '../../../components/form/input-use-form';
import { SelectUseForm } from '../../../components/form/select-use-form';
import { UseFormWrapper } from '../../../components/form/use-form-wrapper';
import { EContentType } from '../../../content/types/IContent.type';
import { IcontentPayload } from '../../../content/services/createContent.service';

// eslint-disable-next-line react-refresh/only-export-components
export const typeOptions: IOption[] = [
  { label: 'Imagen', value: EContentType.IMAGE },
  { label: 'Texto', value: EContentType.TEXT },
  { label: 'Video', value: EContentType.VIDEO },
];

interface IProps {
  showModal: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: IcontentPayload) => void;
}

export const CreateContentModal: React.FC<IProps> = (props) => {
  const { onCloseModal, showModal, onSubmit } = props;

  const methods = useForm<IcontentPayload>();

  const customSubmit = methods.handleSubmit((values) => {
    onSubmit(values);
  });

  return (
    <Modal show={showModal} size='md' onClose={onCloseModal} popup>
      <Modal.Header className='bg-gray-100 border-b border-gray-300 rounded-t-lg'>
        <div className='flex items-center justify-between p-4'>
          <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>Nuevo contenido</h3>
        </div>
      </Modal.Header>
      <Modal.Body className='p-6'>
        <UseFormWrapper methods={methods} className='space-y-6'>
          <div className='space-y-4'>
            <InputUseForm label='Título' name='title' placeholder='Ingresa un título' />
            <InputUseForm label='Descripción' name='textContent' placeholder='Ingresa una descripción' />
            <InputUseForm label='URL' name='url' placeholder='Ingresa una URL' />
            <SelectUseForm label='Tipo' name='type' options={typeOptions} />
          </div>

          <div className='flex justify-end'>
            <Button type='submit' onClick={customSubmit} className='text-white font-bold py-1 px-1 rounded-md'>
              Crear Contenido
            </Button>
          </div>
        </UseFormWrapper>
      </Modal.Body>
    </Modal>
  );
};
