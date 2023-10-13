import storage from '@react-native-firebase/storage';

export const getImagePathToProfile = (uid: string) => `profile/${uid}`;

export const uploadImageBlob = async (blob: Blob, path: string) => {
  const reference = storage().ref(path);
  await reference.put(blob);
  return await reference.getDownloadURL();
};
