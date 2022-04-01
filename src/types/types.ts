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

export type UserInfoProps = {
  [key: string]: string;
};

export type IsPwNotShownProps = {
  [key: string]: boolean;
};

export type GoBackProps = {
  page: string;
  onPress: Function;
};

export type LogoProps = {
  width: number;
  height: number;
};
