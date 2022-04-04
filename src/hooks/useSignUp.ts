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

  const [warnings, setWarnings] = useState({
    firstNameWarning: '',
    lastNameWarning: '',
    emailWarning: '',
    pwWarning: '',
    pwVerifyWarning: '',
  });

  const {firstName, lastName, email, password, passwordVerify} = signUpInfo;

  const {
    firstNameWarning,
    lastNameWarning,
    emailWarning,
    pwWarning,
    pwVerifyWarning,
  } = warnings;

  const {
    noValue,
    nameFormat,
    emailDuplicate,
    emailFormat,
    pwFormat,
    pwMatching,
  } = MAPPING_MESSAGE;

  const handleButtonValid = () => {
    const valid: boolean = !!(
      firstName &&
      lastName &&
      email &&
      password &&
      passwordVerify &&
      password === passwordVerify &&
      !firstNameWarning &&
      !lastNameWarning &&
      !emailWarning &&
      !pwWarning &&
      !pwVerifyWarning
    );
    return valid;
  };

  const updateSignUpInfo = (info: string, value: string) => {
    setSignUpInfo(prev => ({...prev, [info]: value}));
  };

  const checkSignUpInfo = (info: string, value: string) => {
    if (info === 'firstName') {
      const result = validateName(value) ? '' : nameFormat;
      setWarnings(prev => ({...prev, firstNameWarning: result}));
    } else if (info === 'lastName') {
      const result = validateName(value) ? '' : nameFormat;
      setWarnings(prev => ({...prev, lastNameWarning: result}));
    } else if (info === 'email') {
      const result = validateEmail(value) ? '' : emailFormat;
      setWarnings(prev => ({...prev, emailWarning: result}));
    } else if (info === 'password') {
      const result = validatePassword(value) ? '' : pwFormat;
      setWarnings(prev => ({...prev, pwWarning: result}));
    } else if (info === 'passwordVerify') {
      const result = validatePassword(value) ? '' : pwFormat;
      setWarnings(prev => ({...prev, pwVerifyWarning: result}));
      if (password !== passwordVerify) {
        setWarnings(prev => ({...prev, pwVerifyWarning: pwMatching}));
      }
    }
  };

  const signUp = async () => {
    try {
      const result = await postSignUpInfo(signUpInfo);

      const {
        email: emailKey,
        password: passwordKey,
        first_name: firstNameKey,
        last_name: lastNameKey,
        message,
      } = result;

      if (email[0] === '이 필드는 필수 항목입니다.') {
        setWarnings(prev => ({...prev, emailWarning: noValue}));
      } else if (emailKey[0] === 'user의 email은/는 이미 존재합니다.') {
        setWarnings(prev => ({...prev, emailWarning: emailDuplicate}));
      } else if (emailKey[0] === '유효한 이메일 주소를 입력하십시오.') {
        setWarnings(prev => ({...prev, emailWarning: emailFormat}));
      } else if (passwordKey[0] === '이 필드는 필수 항목입니다.') {
        setWarnings(prev => ({...prev, pwWarning: noValue}));
      } else if (message[0] === '숫자와 영문자 조합 8자를 입력해주세요') {
        setWarnings(prev => ({...prev, pwWarning: pwFormat}));
      } else if (firstNameKey[0] === '이 필드는 필수 항목입니다.') {
        setWarnings(prev => ({...prev, firstNameWarning: noValue}));
      } else if (lastNameKey[0] === '이 필드는 필수 항목입니다.') {
        setWarnings(prev => ({...prev, lastNameWarning: noValue}));
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
    warnings,
    handleButtonValid,
    updateSignUpInfo,
    checkSignUpInfo,
    signUp,
  };
};

export default useSignUp;
