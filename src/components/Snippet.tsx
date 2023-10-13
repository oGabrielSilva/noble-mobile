import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextProps } from 'react-native';

interface ExtendedTextProps extends TextProps, CustomFonts {
  snippetType?:
    | 'normal'
    | 'alert'
    | 'small-alert'
    | 'error'
    | 'small-error'
    | 'link'
    | 'small-link';
}

export function Snippet({ style, font, snippetType = 'normal', ...props }: ExtendedTextProps) {
  const { design } = useContext(GlobalContext);
  return (
    <Text
      style={[
        styles.default,
        {
          color: design.text,
          ...(font === 'Poppins' ? { fontFamily: 'Poppins' } : {}),
          ...(snippetType === 'small-alert'
            ? {
                color: design.warning,
                fontSize: 12,
              }
            : {}),
          ...(snippetType === 'link'
            ? {
                color: design.link,
                fontSize: 16,
                textDecorationLine: 'underline',
              }
            : {}),
          ...(snippetType === 'small-link'
            ? {
                color: design.link,
                fontSize: 12,
                textDecorationLine: 'underline',
              }
            : {}),
        },
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
  },
});
