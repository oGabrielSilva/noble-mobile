import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { HomeScreen } from '@Noble/screens/home/stack/HomeScreen';
import { ProfileScreen } from '@Noble/screens/home/stack/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

export type RootStackParamList = {
  Home: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function LoggedRouteHandler() {
  const { design } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: design.primary,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
