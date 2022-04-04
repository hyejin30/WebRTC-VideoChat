import Config from 'react-native-config';

const baseUri: String = Config.API_APP_KEY;

export const fetchApi = {
  signIn: `${baseUri}/users/signin`,
  signUp: `${baseUri}/users/signup`,
};
