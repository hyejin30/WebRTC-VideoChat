import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
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
export type SignUpScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUp'
>;
export type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;
export type MainScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Main'
>;
export type VideoChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
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
