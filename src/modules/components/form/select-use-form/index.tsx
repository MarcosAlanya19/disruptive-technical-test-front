/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { Controller, FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';
import Select, { Props as SelectProps } from 'react-select';
import { FieldContent } from '../field-content';
import { ICustomOption } from '../../../@common/types/options';

type SelectValue<V> = ICustomOption<V> | ICustomOption<V>[] | null;

interface Style {
  menuPortal?: React.CSSProperties;
  placeholder?: React.CSSProperties;
  control?: React.CSSProperties;
  menuList?: React.CSSProperties;
}

export const baseSelectUseFormStyles = (
  style?: Partial<Style>,
  formState?: any,
  name?: string
) => ({
  menuPortal: (base: React.CSSProperties) => ({
    ...base,
    zIndex: 99,
    ...style?.menuPortal,
  }),
  placeholder: (provided: React.CSSProperties) => ({
    ...provided,
    ...style?.placeholder,
  }),
  control: (provided: React.CSSProperties) => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '45px',
    borderColor: formState?.errors[name] ? 'rgb(190, 28, 18)' : provided.borderColor,
    ...style?.control,
  }),
  menuList: (provided: React.CSSProperties) => ({
    ...provided,
    overflowX: 'hidden',
    ...style?.menuList,
  }),
  ...style,
});

interface CustomSelectProps<T extends FieldValues, V = string> {
  name: Path<T>;
  label?: string;
  rules?: RegisterOptions<T>;
  defaultValue?: SelectValue<V>;
  options: ICustomOption<V>[];
  isMulti?: boolean;
  placeholder?: string;
  onChange?: (value?: SelectValue<V>) => void;
  allOption?: boolean | string;
  initialValue?: V;
  style?: Partial<SelectProps<ICustomOption<V>, boolean>>;
}

export const SelectUseForm = <T extends FieldValues, V extends string | string[] = string>({
  name,
  label,
  rules,
  defaultValue,
  options: propOptions,
  isMulti = false,
  placeholder,
  onChange,
  style,
  ...rest
}: CustomSelectProps<T, V> & SelectProps<ICustomOption<V>, boolean>) => {
  const { control, trigger, formState } = useFormContext<T>();
  const options = [...propOptions];

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue as never}
      render={({ field, fieldState }) => {
        const { error } = fieldState;

        return (
          <div>
            <FieldContent
              label={label ?? undefined}
              error={error?.message}
              content={
                <Select<ICustomOption<V>, boolean>
                  placeholder={placeholder || 'Selecciona una opción'}
                  styles={baseSelectUseFormStyles(style, formState, name)}
                  defaultValue={defaultValue}
                  isMulti={isMulti}
                  onBlur={() => {
                    field.onBlur();
                    trigger(name);
                  }}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption);
                    trigger(name);
                    onChange && onChange(selectedOption as SelectValue<V>);
                  }}
                  value={field.value}
                  options={options}
                  filterOption={(option, inputValue) =>
                    option.label.toLowerCase().includes(inputValue.toLowerCase())
                  }
                  {...rest}
                />
              }
            />
          </div>
        );
      }}
    />
  );
};
