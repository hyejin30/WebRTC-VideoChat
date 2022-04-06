import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'token';

export const setToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, value);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};

export const getToken = async () => {
  try {
    await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};
