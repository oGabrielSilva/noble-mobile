import { auth } from '@Noble/firebase/auth';
import { getUserData } from '@Noble/firebase/firestore';
import { User } from '@Noble/models/User';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, useEffect, useState } from 'react';

interface AuthContextValues {
  firebaseUser: FirebaseAuthTypes.User | null;
  user: User | null;
  prepared: boolean;
}

export const AuthContext = createContext<AuthContextValues>({} as AuthContextValues);

export default function AuthContextProvider({ children }: JSXChildrenProps) {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [prepared, setPrepared] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userSnap => {
      setFirebaseUser(userSnap);
      if (userSnap) {
        const userData = await getUserData(userSnap.uid);
        if (!userData) return;
        setUser(
          new User(
            userSnap.email!,
            userSnap.displayName!,
            userData.birthYear,
            userData.gender,
            userSnap.photoURL,
          ),
        );
      } else setUser(null);
      setTimeout(() => setPrepared(true), 1000);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, prepared }}>{children}</AuthContext.Provider>
  );
}
