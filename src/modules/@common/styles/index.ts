import { GroupBase, StylesConfig } from 'react-select';
import { IOption } from '../types/options';

// Define the styles for the base select component
export const baseSelectStyles: StylesConfig<IOption, boolean, GroupBase<IOption>> | undefined = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 99,
  }),
  placeholder: (provided) => ({
    ...provided,
  }),
  control: (provided) => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '45px',
  }),
  menuList: (provided) => ({
    ...provided,
    overflowX: 'hidden',
  }),
};
