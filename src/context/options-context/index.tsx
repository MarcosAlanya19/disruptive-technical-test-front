import React from 'react';
import { mapOptions } from '../../modules/@common/map-options';
import { IOption } from '../../modules/@common/types/options';
import { useCategories } from '../../modules/content/hooks/useCategories';
import { useThemes } from '../../modules/content/hooks/useThemes';
import { useUsers } from '../../modules/content/hooks/useUsers';

interface IProps {
  children: React.ReactNode;
}

interface MapOptions {
  loading: boolean;
  options: IOption[];
}

interface IConfigContext {
  user: MapOptions;
  theme: MapOptions;
  category: MapOptions;
}

const OptionsContext = React.createContext<IConfigContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useOptions = () => {
  const context = React.useContext(OptionsContext);
  if (!context) throw new Error('useOptions must be used within an AuthProvider');
  return context;
};

export const OptionsProvider: React.FC<IProps> = ({ children }) => {
  const { data: dataUsers, handle: getUsers, loading: userLoging } = useUsers();
  const { data: dataThemes, handle: getThemes, loading: themeLoging } = useThemes();
  const { data: dataCategories, handle: getCategories, loading: categoryLoging } = useCategories();

  const userOptions = mapOptions(dataUsers, 'name', 'uuid', true);
  const themeOptions = mapOptions(dataThemes, 'name', 'uuid', true);
  const categoryOptions = mapOptions(dataCategories, 'name', 'uuid', true);

  React.useEffect(() => {
    (async () => {
      await Promise.all([getUsers(), getThemes(), getCategories()]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OptionsContext.Provider
      value={{
        category: {
          loading: categoryLoging,
          options: categoryOptions,
        },
        theme: {
          loading: themeLoging,
          options: themeOptions,
        },
        user: {
          loading: userLoging,
          options: userOptions,
        },
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};
