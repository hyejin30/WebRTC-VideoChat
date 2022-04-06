import Config from 'react-native-config';

const baseUri: string = Config.API_APP_KEY;

export const fetchApi = {
  signIn: `${baseUri}/users/signin`,
  signUp: `${baseUri}/users/signup`,
};
