import { User } from '@Noble/models/User';
import firestore from '@react-native-firebase/firestore';

const USER_COLLECTION_NAME = 'users';

interface UserData {
  birthYear: number;
  gender: Gender;
}

export const getUserData = async (uid: string) => {
  const snap = await firestore().collection(USER_COLLECTION_NAME).doc(uid).get();
  if (snap.exists) return snap.data() as UserData;
  return null;
};

export const saveUserData = async (uid: string, { birthYear, gender }: User) => {
  firestore().collection(USER_COLLECTION_NAME).doc(uid).set({ birthYear, gender });
};
