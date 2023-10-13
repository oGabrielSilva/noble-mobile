import dark from './src/resources/theme/dark.ts';
import strings from './src/resources/i18n/pt-BR.ts';

type TD = typeof dark;
type TS = typeof strings;

interface D extends TD {
  name: 'dark' | 'light';
}

export declare global {
  type Design = D;
  type I18N = TS;
  type Gender = 'M' | 'F' | 'O';

  interface JSXChildrenProps {
    children: JSX.Element;
  }

  interface CustomFonts {
    font?: 'Poppins';
  }
}
