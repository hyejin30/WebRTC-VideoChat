import {useState} from 'react';
import {Alert} from 'react-native';
import {
  validateName,
  validateEmail,
  validatePassword,
  MAPPING_MESSAGE,
} from '~/utils/validate';
import {postSignUpInfo} from '~/hooks/hooks';

const useSignUp = (changePage: Function) => {
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordVerify: '',
  });

  const [warningValid, setWarningValid] = useState({
    isFirstNameWarning: false,
    isLastNameWarning: false,
    isEmailWarning: false,
    isPwWarning: false,
    isPwVerifyWarning: false,
  });

  const [warningText, setWarningText] = useState({
    firstNameWarningText: '',
    lastNameWarningText: '',
    emailWarningText: '',
    pwWarningText: '',
    pwVerifyWarningText: '',
  });

  const {password, passwordVerify} = signUpInfo;

  const {
    isFirstNameWarning,
    isLastNameWarning,
    isEmailWarning,
    isPwWarning,
    isPwVerifyWarning,
  } = warningValid;

  const {
    noValue,
    nameFormat,
    emailDuplicate,
    emailFormat,
    pwFormat,
    pwMatching,
  } = MAPPING_MESSAGE;

  const handleButtonValid = () => {
    const {firstName, lastName, email} = signUpInfo;

    const valid: boolean =
      Boolean(
        firstName &&
          lastName &&
          email &&
          password &&
          passwordVerify &&
          password === passwordVerify,
      ) &&
      !isFirstNameWarning &&
      !isLastNameWarning &&
      !isEmailWarning &&
      !isPwWarning &&
      !isPwVerifyWarning;

    return valid;
  };

  const updateSignUpInfo = (info: string, value: string) => {
    setSignUpInfo(prev => ({...prev, [info]: value}));
  };

  const checkSignUpInfo = (info: string, value: string) => {
    if (info === 'firstName') {
      const result = validateName(value);
      setWarningValid(prev => ({...prev, isFirstNameWarning: !result}));
      if (!result) {
        setWarningText(prev => ({...prev, firstNameWarningText: nameFormat}));
      }
    } else if (info === 'lastName') {
      const result = validateName(value);
      setWarningValid(prev => ({...prev, isLastNameWarning: !result}));
      if (!result) {
        setWarningText(prev => ({...prev, lastNameWarningText: nameFormat}));
      }
    } else if (info === 'email') {
      const result = validateEmail(value);
      setWarningValid(prev => ({...prev, isEmailWarning: !result}));
      if (!result) {
        setWarningText(prev => ({...prev, emailWarningText: emailFormat}));
      }
    } else if (info === 'password') {
      const result = validatePassword(value);
      setWarningValid(prev => ({...prev, isPwWarning: !result}));
      if (!result) {
        setWarningText(prev => ({...prev, pwWarningText: pwFormat}));
      }
    } else if (info === 'passwordVerify') {
      const result = validatePassword(value);
      setWarningValid(prev => ({...prev, isPwVerifyWarning: !result}));
      if (password !== passwordVerify) {
        setWarningText(prev => ({...prev, pwVerifyWarningText: pwMatching}));
      } else if (!result) {
        setWarningText(prev => ({...prev, pwVerifyWarningText: pwFormat}));
      }
    }
  };

  const signUp = async () => {
    try {
      const result = await postSignUpInfo(signUpInfo);
      const {
        email,
        first_name: firstName,
        last_name: lastName,
        message,
      } = result;

      if (email[0] === '이 필드는 필수 항목입니다.') {
        setWarningValid(prev => ({...prev, isEmailWarning: true}));
        setWarningText(prev => ({...prev, emailWarningText: noValue}));
      } else if (email[0] === 'user의 email은/는 이미 존재합니다.') {
        setWarningValid(prev => ({...prev, isEmailWarning: true}));
        setWarningText(prev => ({...prev, emailWarningText: emailDuplicate}));
      } else if (email[0] === '유효한 이메일 주소를 입력하십시오.') {
        setWarningValid(prev => ({...prev, isEmailWarning: true}));
        setWarningText(prev => ({...prev, emailWarningText: emailFormat}));
      } else if (password[0] === '이 필드는 필수 항목입니다.') {
        setWarningValid(prev => ({...prev, isPwWarning: true}));
        setWarningText(prev => ({...prev, pwWarningText: noValue}));
      } else if (message[0] === '숫자와 영문자 조합 8자를 입력해주세요') {
        setWarningValid(prev => ({...prev, isPwWarning: true}));
        setWarningText(prev => ({...prev, pwWarningText: pwFormat}));
      } else if (firstName[0] === '이 필드는 필수 항목입니다.') {
        setWarningValid(prev => ({...prev, isFirstNameWarning: true}));
        setWarningText(prev => ({...prev, firstNameWarningText: noValue}));
      } else if (lastName[0] === '이 필드는 필수 항목입니다.') {
        setWarningValid(prev => ({...prev, isLastNameWarning: true}));
        setWarningText(prev => ({...prev, lastNameWarningText: noValue}));
      } else if (result.hasOwnProperty('id')) {
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
    signUpInfo,
    warningValid,
    warningText,
    handleButtonValid,
    updateSignUpInfo,
    checkSignUpInfo,
    signUp,
  };
};

export default useSignUp;
