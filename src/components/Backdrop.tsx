import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, ViewProps } from 'react-native';

export function Backdrop({ style, ...props }: ViewProps) {
  const { design } = useContext(GlobalContext);

  return (
    <SafeAreaView style={[{ backgroundColor: design.primary }, styles.main, style]} {...props} />
  );
}

const styles = StyleSheet.create({
  main: { flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 16 },
});
