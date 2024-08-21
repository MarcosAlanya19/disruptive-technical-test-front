interface Option {
  label: string;
  value: string;
}

const initialOption: Option = { label: "Todos", value: "" };

export const mapOptions = <T>(
  data: T[] | undefined,
  labelKey: keyof T,
  valueKey: keyof T,
  includeInitialOption?: boolean
): Option[] => {
  const options =
    data?.map((item, index) => ({
      label: item[labelKey] as unknown as string,
      value: item[valueKey] as unknown as string,
      key: `${item[valueKey]}-${index}`
    })) || [];

  if (includeInitialOption) {
    return [{ ...initialOption, key: "initial" }, ...options];
  }

  return options;
};
