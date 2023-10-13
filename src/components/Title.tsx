import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { Text, TextProps } from 'react-native';

interface TitleProps extends TextProps, CustomFonts {
  titleType?: 'large' | 'normal' | 'small' | 'evenSmaller';
}

export function Title({ style, font, titleType = 'large', ...props }: TitleProps) {
  const { design } = useContext(GlobalContext);
  return (
    <Text
      style={[
        {
          fontSize:
            titleType === 'large'
              ? 38
              : titleType === 'normal'
              ? 32
              : titleType === 'small'
              ? 26
              : 20,
          fontWeight: 'bold',
          color: design.title,
          ...(font === 'Poppins' ? { fontFamily: 'Poppins' } : {}),
        },
        style,
      ]}
      {...props}
    />
  );
}
