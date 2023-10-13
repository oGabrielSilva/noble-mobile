import { GlobalContextProvider } from '@Noble/contexts/GlobalContext';
import AuthContextProvider from './contexts/AuthContext';
import { RouteHandler } from './routes/RouteHandler';

export default function App() {
  return (
    <GlobalContextProvider>
      <AuthContextProvider>
        <RouteHandler />
      </AuthContextProvider>
    </GlobalContextProvider>
  );
}
