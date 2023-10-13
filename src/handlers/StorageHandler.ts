import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageHandler {
  public async saveValue(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async getValue(key: string) {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
