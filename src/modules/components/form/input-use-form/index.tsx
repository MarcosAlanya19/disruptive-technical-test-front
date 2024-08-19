import React from 'react';
import clsx from 'clsx';
import { Label, TextInput } from 'flowbite-react';
import { Controller, RegisterOptions, useFormContext, FieldValues, Path } from 'react-hook-form';

interface IBaseInput extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  alert?: boolean;
  fullWidth?: boolean;
  minHeight?: number;
  startEl?: JSX.Element | null;
  endEl?: JSX.Element | null;
  inputRef?: React.Ref<HTMLInputElement>;
  containerProps?: React.ComponentPropsWithRef<'div'>;
}

interface IExtendedBaseInputProps extends IBaseInput {
  optional?: boolean;
  helperText?: string;
}

type InputType = 'text' | 'email' | 'number' | 'password' | 'date' | 'tel' | 'url';

interface InputProps<T extends FieldValues> extends Omit<IExtendedBaseInputProps, 'name'> {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions;
  type?: InputType;
  defaultValue?: string;
  showError?: boolean;
}

export const InputUseForm = <T extends FieldValues>({
  name,
  label,
  rules,
  type = 'text',
  defaultValue = '',
  optional = false,
  helperText,
  showError = true,
  ...rest
}: InputProps<T>) => {
  const { control, trigger } = useFormContext<T>();

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={rules as RegisterOptions<T, Path<T>>}
        defaultValue={defaultValue as never}
        render={({ field, fieldState }) => {
          const { error } = fieldState;

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            field.onChange(e);
            trigger(name);
          };

          const handleBlur = () => {
            field.onBlur();
            trigger(name);
          };

          return (
            <div className='grid gap-1'>
              {label && <LabelComponent label={label} optional={optional} />}
              <div className={clsx('p-0 min-w-full border rounded-lg', error ? 'border-[#BE1C12]' : 'border-gray-300', rest.disabled && 'bg-gray-200 opacity-50')}>
                <TextInput
                  style={{ cursor: rest.disabled ? 'not-allowed' : 'auto' }}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={type}
                  value={field.value || ''}
                  {...rest}
                />
              </div>
              {helperText && <div className='text-gray-500'>{helperText}</div>}
              {showError && error && <div className='text-red-500'>{error.message}</div>}
            </div>
          );
        }}
      />
    </div>
  );
};

function LabelComponent({ label, optional, style }: { label: string; optional: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...style }}>
      <Label>{label}</Label>
      {optional && <div style={{ backgroundColor: '#E9ECEF', borderRadius: '14px', padding: '2px 8px' }}>Opcional</div>}
    </div>
  );
}
