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
    data?.map((item) => ({
      label: item[labelKey] as unknown as string,
      value: item[valueKey] as unknown as string,
    })) || [];

  if (includeInitialOption) {
    return [initialOption, ...options];
  }

  return options;
};
