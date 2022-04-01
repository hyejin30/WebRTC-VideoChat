import {Alert} from 'react-native';
import {UserInfoProps} from 'types/types';
import {fetchApi} from '../config';

export const postSignUpInfo = async (signUpInfo: UserInfoProps) => {
  let body;

  const {firstName, lastName, email, password} = signUpInfo;

  try {
    const response = await fetch(fetchApi.signUp, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
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
