import {HTTPS_SERVER} from '@env';

const baseUri: string = HTTPS_SERVER;

export const fetchApi = {
  signIn: `${baseUri}/users/signin`,
  signUp: `${baseUri}/users/signup`,
  userName: `${baseUri}/call`,
};
