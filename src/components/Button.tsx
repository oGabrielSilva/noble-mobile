import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext, useState } from 'react';
import { StyleSheet, TouchableHighlight, TouchableHighlightProps } from 'react-native';

interface ExtendedTouchableHighlightProps extends TouchableHighlightProps {
  onPress: () => void;
}

export function Button({ style, ...props }: ExtendedTouchableHighlightProps) {
  const { design } = useContext(GlobalContext);

  const [press, setPress] = useState(false);

  return (
    <TouchableHighlight
      underlayColor={design.secondary}
      onHideUnderlay={() => setPress(false)}
      onShowUnderlay={() => setPress(true)}
      style={[
        {
          borderColor: press ? design.variant : design.secondary,
        },
        styles.button,
        style,
      ]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
});
