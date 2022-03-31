import {Alert} from 'react-native';
<<<<<<< HEAD
import {SignUpInfoProps, SignInInfoProps} from '~/types/dataTypes';
import {fetchApi} from '~/config';

export const postSignUpInfo = async (signUpInfo: SignUpInfoProps) => {
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
    const body = await response.json();
    return body;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};
=======
import {UserInfoProps} from 'types/types';
import {fetchApi} from '~/config';
>>>>>>> 4e1c327 (WIP)

export const postSignInValue = async (signInValue: SignInInfoProps) => {
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
    const body = await response.json();
    return body;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};
