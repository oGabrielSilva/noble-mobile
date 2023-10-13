import { DesignHandler } from '@Noble/handlers/DesignHandler';
import { I18nHandler } from '@Noble/handlers/I18nHandler';
import { createContext, useState } from 'react';
import { StatusBar } from 'react-native';

interface GlobalContextValues {
  design: Design;
  strings: I18N;
  changeTheme: (themeName: string) => void;
  changeLanguage: (langCode: string) => void;
}

const designHandler = new DesignHandler();
const i18nHandler = new I18nHandler();

export const GlobalContext = createContext<GlobalContextValues>({} as GlobalContextValues);

export function GlobalContextProvider({ children }: JSXChildrenProps) {
  const [design, setDesign] = useState(designHandler.initialTheme);
  const [strings, setStrings] = useState(i18nHandler.initialLanguage);

  const changeTheme = () => {
    return setDesign;
  };

  const changeLanguage = () => {
    return setStrings;
  };

  return (
    <>
      <StatusBar
        backgroundColor={design.primary}
        barStyle={design.name === 'light' ? 'dark-content' : 'light-content'}
      />
      <GlobalContext.Provider value={{ design, strings, changeTheme, changeLanguage }}>
        {children}
      </GlobalContext.Provider>
    </>
  );
}
