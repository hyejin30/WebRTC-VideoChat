import {ParamListBase} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Entry: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
  VideoChat: undefined;
};

export type EntryScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Entry'
>;
export type SignUpScreenProps = NativeStackScreenProps<ParamListBase, 'SignUp'>;
export type SignInScreenProps = NativeStackScreenProps<ParamListBase, 'SignIn'>;
export type MainScreenProps = NativeStackScreenProps<ParamListBase, 'Main'>;
export type VideoChatScreenProps = NativeStackScreenProps<
  ParamListBase,
  'VideoChat'
>;

export type SignUpInfoProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordVerify: string;
};

export type SignInInfoProps = {
  email: string;
  password: string;
};

export type LogoProps = {
  width: number;
  height: number;
};
