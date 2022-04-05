import {useState} from 'react';
import {Alert} from 'react-native';
import {postSignInValue} from '~/hooks/hooks';
import {MAPPING_MESSAGE} from '~/utils/validate';

const useSignUp = (changePage: Function) => {
  const [signInValue, setSignInValue] = useState({
    email: '',
    password: '',
  });

  const [warnings, setWarnings] = useState({
    emailWarning: '',
    pwWarning: '',
  });

  const {email, password} = signInValue;
  const {emailWarning, pwWarning} = warnings;
  const {noValue} = MAPPING_MESSAGE;

  const handleButtonValid = () => {
    const valid: boolean = !!(email && password && emailWarning && pwWarning);
    return valid;
  };

  const updateSignInValue = (name: string, value: string) => {
    setSignInValue(prev => ({...prev, [name]: value}));
  };

  const checkSignInValue = (name: string, value: string) => {
    if (name === 'email') {
      const result = value.length === 0 ? noValue : '';
      setWarnings(prev => ({...prev, emailWarning: result}));
    } else if (name === 'password') {
      const result = value.length === 0 ? noValue : '';
      setWarnings(prev => ({...prev, pwWarning: result}));
    }
  };

  const signIn = async () => {
    try {
      const result = await postSignInValue(signInValue);
      const {token} = result;
      if (token) {
        Alert.alert('로그인 성공');
        changePage('Main');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    }
  };

  return {
    signInValue,
    warnings,
    handleButtonValid,
    updateSignInValue,
    checkSignInValue,
    signIn,
  };
};

export default useSignUp;
