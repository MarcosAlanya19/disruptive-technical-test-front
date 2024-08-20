import { StylesConfig } from "react-select";
import { IOption } from "../types/options";

// eslint-disable-next-line react-refresh/only-export-components
export const baseSelectStyles: StylesConfig<IOption, false, never>  = {
  menuPortal: (base: React.CSSProperties) => ({
    ...base,
    zIndex: 99,
  }),
  placeholder: (provided: React.CSSProperties) => ({
    ...provided,
  }),
  control: (provided: React.CSSProperties) => ({
    ...provided,
    borderWidth: '1px',
    borderRadius: '8px',
    fontSize: '14px',
    minHeight: '45px',
  }),
  menuList: (provided: React.CSSProperties) => ({
    ...provided,
    overflowX: 'hidden',
  }),
};
