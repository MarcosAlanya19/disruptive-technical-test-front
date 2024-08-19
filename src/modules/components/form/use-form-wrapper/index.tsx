import React from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
  onSubmit?: (data: T) => void | Promise<void>;
  style?: React.CSSProperties;
  className?: string;
}

export const UseFormWrapper = <T extends FieldValues>({ children, methods, onSubmit, style, className }: IProps<T>) => {
  return (
    <FormProvider {...methods}>
      <form style={style} className={className} onSubmit={methods.handleSubmit(onSubmit ?? (() => {}))}>
        {children}
      </form>
    </FormProvider>
  );
};
