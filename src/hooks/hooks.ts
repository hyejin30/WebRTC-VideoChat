import {Alert} from 'react-native';
import {SignUpInfoProps} from '~/types/dataTypes';
import {fetchApi} from '~/config';

export const postSignUpInfo = async (signUpInfo: SignUpInfoProps) => {
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
    return body;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};
