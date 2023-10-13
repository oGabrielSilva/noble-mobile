import { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Backdrop } from '@Noble/components/Backdrop';
import { Title } from '@Noble/components/Title';
import { GlobalContext } from '@Noble/contexts/GlobalContext';

type RootStackParamList = {
  Screen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function SplashScreen() {
  const { design } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: design.primary,
        }}>
        <Stack.Screen name="Screen" component={Screen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Screen = () => {
  const { strings } = useContext(GlobalContext);

  return (
    <Backdrop style={styles.content}>
      <Title font="Poppins" style={styles.title} titleType="small">
        {strings.appName}
      </Title>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  content: { justifyContent: 'center', alignItems: 'center', paddingTop: 0 },
  title: {
    fontWeight: '400',
  },
});
