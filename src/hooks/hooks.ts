import {fetchApi} from '../config';
import {UserInfoProps} from 'types/types';
import {Alert} from 'react-native';

export const postSignInValue = async (signInValue: UserInfoProps) => {
  let body;
  const {email, password} = signInValue;

  try {
    const response = await fetch(fetchApi.signIn, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    body = await response.json();
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
  return body;
};
