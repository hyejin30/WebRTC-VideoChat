import {Alert} from 'react-native';
import {SignUpInfoProps, SignInInfoProps} from '~/types/dataTypes';
import {getToken, setToken} from '~/utils/storage';
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
    setToken(body.token);
    return body;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    } else {
      Alert.alert(String(error));
    }
  }
};

export const getUserName = async () => {
  try {
    const token = await getToken();
    const response = await fetch(fetchApi.userName, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
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
