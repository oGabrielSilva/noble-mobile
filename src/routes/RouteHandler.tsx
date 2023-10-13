import { AuthContext } from '@Noble/contexts/AuthContext';
import { useContext } from 'react';
import { LoggedOutRouteHandler } from './LoggedOutRouteHandler';
import { SplashScreen } from '@Noble/screens/SplashScreen';
import { LoggedRouteHandler } from './LoggedRouteHandler';

export function RouteHandler() {
  const { prepared, user } = useContext(AuthContext);

  if (!prepared) return <SplashScreen />;

  return user ? <LoggedRouteHandler /> : <LoggedOutRouteHandler />;
}
