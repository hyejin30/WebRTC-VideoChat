import {useState} from 'react';
import {Alert} from 'react-native';
import {postSignInValue} from '~/hooks/hooks';
import {setToken} from '~/utils/storage';
import {MAPPING_MESSAGE} from '~/utils/validate';

const useSignIn = (changePage: Function) => {
  const [signInValue, setSignInValue] = useState({
    email: '',
    password: '',
  });

  const [warnings, setWarnings] = useState({
    emailWarning: '',
    pwWarning: '',
  });

  const {email, password} = signInValue;
  const {emailCheck, pwCheck} = MAPPING_MESSAGE;

  const handleButtonValid = () => {
    const valid: boolean = !!(email && password);
    return valid;
  };

  const updateSignInValue = (name: string, value: string) => {
    setSignInValue(prev => ({...prev, [name]: value}));
  };

  const showWarnings = () => {
    setWarnings(prev => ({
      ...prev,
      emailWarning: emailCheck,
      pwWarning: pwCheck,
    }));
    setTimeout(() => {
      setWarnings(prev => ({
        ...prev,
        emailWarning: '',
        pwWarning: '',
      }));
    }, 4000);
  };

  const signIn = async () => {
    try {
      const result = await postSignInValue(signInValue);
      const {token, message, email: emailKey} = result;
      if (token) {
        setToken(token);
        changePage('Main');
      } else if (emailKey || message) {
        showWarnings();
      }
    } catch (error) {
      if (error instanceof Error) {
        showWarnings();
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
    showWarnings,
    signIn,
  };
};

export default useSignIn;
