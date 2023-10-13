import { forwardRef, useContext, useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity, TextInputProps } from 'react-native';
import { GlobalContext } from '@Noble/contexts/GlobalContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ExtendedTextInputProps extends TextInputProps {
  typoError: boolean;
  iconName?: string;
}

export const Input = forwardRef<TextInput, ExtendedTextInputProps>(
  ({ style, iconName, typoError: error, ...props }, ref) => {
    const { design } = useContext(GlobalContext);
    const [focused, setFocused] = useState(false);

    return (
      <View style={styles.view}>
        <TextInput
          ref={ref}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholderTextColor={design.textPlaceholder}
          style={[
            {
              color: design.text,
              borderColor: design.secondary,
              ...(focused
                ? {
                    backgroundColor: design.secondary,
                    borderColor: design.variant,
                  }
                : {}),
              ...(iconName ? { paddingEnd: 12 + 22 } : { paddingEnd: 16 }),
              ...(error ? { color: design.danger, borderColor: design.danger } : {}),
            },
            styles.input,
            style,
          ]}
          {...props}
        />
        {iconName ? (
          <Icon style={styles.icon} name={iconName as never} size={20} color={design.text} />
        ) : (
          <></>
        )}
      </View>
    );
  },
);

interface PasswordInputProps extends TextInputProps {
  typoError: boolean;
}

export const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ style, typoError: error, ...props }, ref) => {
    const { design } = useContext(GlobalContext);
    const [visible, setVisible] = useState(false);
    const [focused, setFocused] = useState(false);

    return (
      <View style={styles.view}>
        <TextInput
          secureTextEntry={!visible}
          ref={ref}
          placeholderTextColor={design.textPlaceholder}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          style={[
            styles.input,
            {
              color: design.text,
              borderColor: design.secondary,
              paddingEnd: 12 + 22,
              ...(focused
                ? {
                    backgroundColor: design.secondary,
                    borderColor: design.variant,
                  }
                : {}),
              ...(error ? { color: design.danger, borderColor: design.danger } : {}),
            },
            style,
          ]}
          {...props}
        />
        <TouchableOpacity style={styles.passwordButton} onPress={() => setVisible(v => !v)}>
          <Icon name={visible ? 'visibility-off' : 'visibility'} size={20} color={design.text} />
        </TouchableOpacity>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  view: { position: 'relative' },
  input: {
    borderWidth: 2,
    paddingVertical: 8,
    paddingStart: 16,
    borderRadius: 8,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    marginEnd: 8,
    right: 0,
    transform: [{ translateY: -10 }],
  },
  passwordButton: {
    padding: 4,
    position: 'absolute',
    top: '50%',
    marginEnd: 8,
    right: 0,
    transform: [{ translateY: -14 }],
  },
});
