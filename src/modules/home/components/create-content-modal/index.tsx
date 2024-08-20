import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useOptions } from '../../../../context/options-context';
import { IOption } from '../../../@common/types/options';
import { InputUseForm } from '../../../components/form/input-use-form';
import { SelectUseForm } from '../../../components/form/select-use-form';
import { UseFormWrapper } from '../../../components/form/use-form-wrapper';
import { contentSchema } from '../../../content/index.schema';
import { IcontentPayload } from '../../../content/services/createContent.service';

interface IProps {
  showModal: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: IcontentPayload) => Promise<void>;
  refreshContent: () => void;
}

export interface Iform extends Omit<IcontentPayload, 'themeId' | 'categoryId' | 'credits'> {
  categoryId: IOption;
  themeId: IOption;
}

export const CreateContentModal: React.FC<IProps> = (props) => {
  const { onCloseModal, refreshContent, showModal, onSubmit } = props;
  const { category, theme } = useOptions();

  const methods = useForm<Iform>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      title: '',
      url: '',
      textContent: '',
    },
  });

  const handleCloseModal = () => {
    methods.reset();
    onCloseModal();
  };

  const customSubmit = methods.handleSubmit((values) => {
    console.log({ values });
    const createContentPayload: IcontentPayload = {
      title: values.title,
      categoryId: values.categoryId.value,
      themeId: values.themeId.value,
      ...(values.textContent && {
        textContent: values.textContent,
      }),
      ...(values.url && {
        url: values.url,
      }),
    };

    onSubmit(createContentPayload).then(() => {
      handleCloseModal();
      refreshContent();
    });
  });

  return (
    <Modal show={showModal} size='md' onClose={handleCloseModal} popup>
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
            <SelectUseForm label='Categoría' name='categoryId' options={category.options} isLoading={category.loading} />
            <SelectUseForm label='Tema' name='themeId' options={theme.options} isLoading={theme.loading} />
          </div>

          <div className='flex justify-end'>
            <Button onClick={customSubmit} className='text-white font-bold py-1 px-1 rounded-md'>
              Crear Contenido
            </Button>
          </div>
        </UseFormWrapper>
      </Modal.Body>
    </Modal>
  );
};
