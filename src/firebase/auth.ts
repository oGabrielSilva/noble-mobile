import { User } from '@Noble/models/User';
import { imgUriToBlob } from '@Noble/utils/imgUriToBlob';
import firebaseAuth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { uploadImageBlob } from './storage';
import { saveUserData } from './firestore';
import { GOOGLE_WEB_CLIENT_ID as webClientId } from '@Noble/resources/env/env.json';

export const auth = firebaseAuth();
GoogleSignin.configure({ webClientId });

export const getUser = () =>
  new Promise<FirebaseAuthTypes.User | null>(res => auth.onAuthStateChanged(u => res(u)));

export const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play - TODO
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = firebaseAuth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const { user } = await auth.signInWithCredential(googleCredential);
    return user;
  } catch (error) {
    console.log('ERROR***** ', error);
  }
};

export const signUpWithEmailPassword = async (user: User) => {
  try {
    if (!user.getPrivatePassword) return;
    const response = await auth.createUserWithEmailAndPassword(user.email, user.getPrivatePassword);
    if (user.photoURL) {
      const blob = await imgUriToBlob(user.photoURL);
      const download = await uploadImageBlob(blob, `profile/${response.user.uid}`);
      user.photoURL = download;
    }
    response.user.updateProfile({ displayName: user.name, photoURL: user.photoURL });
    await saveUserData(response.user.uid, user);
  } catch (error) {
    console.log(error);
    getUser().then(u => (u !== null ? u.delete() : null));
  }
};

export const signOut = async () => {
  auth.signOut();
  GoogleSignin.signOut();
};
