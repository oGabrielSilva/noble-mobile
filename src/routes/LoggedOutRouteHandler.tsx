import { GlobalContext } from '@Noble/contexts/GlobalContext';
import { CompleteSignUpByProvider } from '@Noble/screens/auth/CompleteSignUpByProvider';
import { SignInScreen } from '@Noble/screens/auth/SignInScreen';
import { SignUpScreen } from '@Noble/screens/auth/SignUpScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext } from 'react';

interface SignUpProps {
  email: string;
  password: string;
}

export type RootStackParamList = {
  SignIn: undefined;
  CompleteSignUpByProvider: undefined;
  SignUp: SignUpProps;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function LoggedOutRouteHandler() {
  const { design } = useContext(GlobalContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          navigationBarColor: design.primary,
          animation: 'slide_from_right',
        }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="CompleteSignUpByProvider" component={CompleteSignUpByProvider} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
