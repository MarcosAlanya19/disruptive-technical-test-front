/* eslint-disable react-refresh/only-export-components */
import { Controller, FieldValues, Path, RegisterOptions, useFormContext } from 'react-hook-form';
import Select, { GroupBase, Props as SelectProps, StylesConfig } from 'react-select';
import { ICustomOption } from '../../../@common/types/options';
import { FieldContent } from '../field-content';
import { baseSelectStyles } from '../../../@common/styles';

type SelectValue<V> = ICustomOption<V> | ICustomOption<V>[] | null;

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
  ...rest
}: CustomSelectProps<T, V> & SelectProps<ICustomOption<V>, boolean>) => {
  const { control, trigger } = useFormContext<T>();
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
                  defaultValue={defaultValue}
                  isMulti={isMulti}
                  styles={baseSelectStyles as StylesConfig<ICustomOption<V>, boolean, GroupBase<ICustomOption<V>>> | undefined}
                  menuPortalTarget={document.body}
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
                  filterOption={(option, inputValue) => option.label.toLowerCase().includes(inputValue.toLowerCase())}
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
